import {
  Directive,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  RendererStyleFlags2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'flip';

/**
 * Scroll-reveal directive.
 *
 * Usage:  <div appReveal>…</div>
 *         <div appReveal="left" [revealDelay]="150">…</div>
 *
 * The element is only hidden once we know we are in the browser, so the
 * server-rendered markup (and the no-JS fallback) stays fully visible.
 */
@Directive({
  selector: '[appReveal]',
  standalone: false,
})
export class RevealDirective implements OnInit, OnDestroy {
  /** Direction / style of the entrance. */
  @Input('appReveal') variant: RevealVariant | '' = 'up';

  /** Stagger delay in milliseconds. */
  @Input() revealDelay = 0;

  /** Replay the animation every time the element re-enters the viewport. */
  @Input() revealOnce = true;

  /** How much of the element must be visible before it animates in (0–1). */
  @Input() revealThreshold = 0.15;

  private observer?: IntersectionObserver;
  private readonly isBrowser: boolean;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private zone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    const node = this.el.nativeElement;
    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Respect the user's motion preference — show everything immediately.
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(node, 'rv-shown');
      return;
    }

    const direction = this.variant || 'up';
    this.renderer.addClass(node, 'rv');
    this.renderer.addClass(node, 'rv-hidden');
    this.renderer.addClass(node, `rv-${direction}`);

    if (this.revealDelay) {
      this.renderer.setStyle(
        node,
        '--rv-delay',
        `${this.revealDelay}ms`,
        RendererStyleFlags2.DashCase,
      );
    }

    // Keep the observer callback out of Angular's change detection.
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.show();
              if (this.revealOnce) {
                this.disconnect();
              }
            } else if (!this.revealOnce) {
              this.hide();
            }
          }
        },
        {
          threshold: this.revealThreshold,
          rootMargin: '0px 0px -8% 0px',
        },
      );

      this.observer.observe(node);
    });
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  private show(): void {
    const node = this.el.nativeElement;
    this.renderer.removeClass(node, 'rv-hidden');
    this.renderer.addClass(node, 'rv-shown');
  }

  private hide(): void {
    const node = this.el.nativeElement;
    this.renderer.removeClass(node, 'rv-shown');
    this.renderer.addClass(node, 'rv-hidden');
  }

  private disconnect(): void {
    this.observer?.disconnect();
    this.observer = undefined;
  }
}
