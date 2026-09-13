import { Component } from '@angular/core';
import emailjs from 'emailjs-com';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

/**
 * EmailJS credentials — all three are public by design (the key is exposed to
 * the browser either way), so they live in source rather than an env file.
 *
 * Find them at dashboard.emailjs.com:
 *   serviceId  — Email Services → your service
 *   templateId — Email Templates → your template
 *   publicKey  — Account → General → Public Key
 *
 * If sending starts failing with a 412, check the service's Gmail connection
 * first: the OAuth grant expires, and it needs "Send email on your behalf".
 */
const EMAILJS = {
  serviceId: 'service_7252hjs',
  templateId: 'template_la5buwo',
  publicKey: 'HIF0M0PX1uce8Tgm3',
} as const;

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  contactForm: FormGroup;
  sending = false;

  readonly channels = [
    {
      icon: 'call',
      label: 'Phone',
      heading: 'Mobile',
      value: '0975-618-7271',
      href: 'tel:+639756187271',
    },
    {
      icon: 'mail',
      label: 'Email',
      heading: 'Best way to reach me',
      value: 'yambaoluise29@gmail.com',
      href: 'mailto:yambaoluise29@gmail.com?subject=Project%20enquiry',
    },
    {
      icon: 'place',
      label: 'Location',
      heading: 'Based in',
      value: 'Arayat, Pampanga, PH',
      href: '',
    },
  ];

  constructor(private fb: FormBuilder) {
    // NOTE: sync validators belong in the second slot as an array — the third
    // slot is for async validators, which would leave the form stuck pending.
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      // Honeypot: hidden from people, irresistible to bots. Any value here
      // means the submission is automated, so we drop it.
      website: [''],
    });
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  /** True once the user has interacted and the control is invalid. */
  invalid(control: 'name' | 'email' | 'message'): boolean {
    const c = this.contactForm.get(control);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  sendEmail(event: Event): void {
    event.preventDefault();

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please check the form',
        text: 'A few fields still need your attention.',
        showConfirmButton: false,
        timer: 1800,
        backdrop: false,
      });
      return;
    }

    const { name, email, message, website } = this.contactForm.value;

    // Bot caught by the honeypot — show the normal success state and send nothing.
    if (website) {
      this.contactForm.reset();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Message sent!',
        showConfirmButton: false,
        timer: 1500,
        backdrop: false,
      });
      return;
    }

    this.sending = true;

    emailjs
      .send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        { from_name: name, from_email: email, message },
        EMAILJS.publicKey,
      )
      .then(
        () => {
          this.sending = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Message sent!',
            text: "Thanks for reaching out — I'll get back to you soon.",
            showConfirmButton: false,
            timer: 2000,
            backdrop: false,
          });
          this.contactForm.reset();
        },
        (error) => {
          this.sending = false;

          // Surface the real reason in the console — EmailJS returns useful
          // text (expired Gmail grant, bad template id, quota) that we would
          // otherwise throw away.
          console.error('[contact] EmailJS send failed:', error?.status, error?.text ?? error);

          // Don't lose the lead: offer to hand the message to their mail client.
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: "That didn't go through",
            text:
              "The mail service isn't responding right now. You can send it straight " +
              'from your email app instead — your message is already filled in.',
            showCancelButton: true,
            confirmButtonText: 'Open email app',
            cancelButtonText: 'Close',
            confirmButtonColor: '#e50914',
            backdrop: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = this.buildMailto(name, email, message);
            }
          });
        },
      );
  }

  /** Fallback path so a failed send still reaches an inbox. */
  private buildMailto(name: string, email: string, message: string): string {
    const subject = `Portfolio enquiry from ${name}`;
    const body = `${message}\n\n—\nFrom: ${name}\nReply to: ${email}`;
    return `mailto:yambaoluise29@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }
}
