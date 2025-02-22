import { Component, OnInit } from '@angular/core';
import emailjs from 'emailjs-com';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent{

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  sendEmail(event: Event) {
    event.preventDefault();
    if (this.contactForm.valid) {
      const { name, email, message } = this.contactForm.value;

      emailjs.send('service_hml2uxb', 'template_la5buwo', {
        from_name: name,
        from_email: email,
        message: message
      }, 'HIF0M0PX1uce8Tgm3')
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Mail Sent!",
          showConfirmButton: false,
          timer: 1000,
          backdrop: false
        });
        this.contactForm.reset();
      }, (error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "You need to fill up all the forms.",
          showConfirmButton: false,
          timer: 1000,
          backdrop: false

        });
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You need to fill up all the forms.",
        showConfirmButton: false,
        timer: 1500,
        backdrop: false

      });
    }
  }

}
