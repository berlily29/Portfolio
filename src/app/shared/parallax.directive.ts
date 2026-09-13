import {
  Directive,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Lightweight scroll parallax.
 *
 * Usage:  <img appParallax [parallaxSpeed]="0.25">
 *
 * Positive speed moves the element slower than the page (classic depth
 * effect). Work happens outside Angular and is throttled to one write per
 * animation frame.
 */
@Directive({
  selector: '[appParallax]',
  standalone: false,
})
export class ParallaxDirective implements OnInit, OnDestroy {
  /** Fraction of the scroll distance to offset by. */
  @Input() parallaxSpeed = 0.2;

  /** Optional scale applied alongside the translation. */
  @Input() parallaxScale = 1;

  /** Fade the element out as it leaves the viewport. */
  @Input() parallaxFade = false;

  private ticking = false;
  private frame = 0;
  private readonly isBrowser: boolean;
  private onScroll = () => this.requestUpdate();

  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
      this.update();
    });
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    cancelAnimationFrame(this.frame);
  }

  private requestUpdate(): void {
    if (this.ticking) {
      return;
    }
    this.ticking = true;
    this.frame = requestAnimationFrame(() => {
      this.update();
      this.ticking = false;
    });
  }

  private update(): void {
    const node = this.el.nativeElement;
    const rect = node.getBoundingClientRect();
    const viewportH = window.innerHeight;

    // Skip work for elements far outside the viewport.
    if (rect.bottom < -viewportH || rect.top > viewportH * 2) {
      return;
    }

    // How far the element's centre is from the viewport centre.
    const offsetFromCentre = rect.top + rect.height / 2 - viewportH / 2;
    const shift = -offsetFromCentre * this.parallaxSpeed;

    node.style.transform =
      this.parallaxScale === 1
        ? `translate3d(0, ${shift.toFixed(2)}px, 0)`
        : `translate3d(0, ${shift.toFixed(2)}px, 0) scale(${this.parallaxScale})`;

    if (this.parallaxFade) {
      const progress = Math.min(Math.abs(offsetFromCentre) / viewportH, 1);
      node.style.opacity = String(Math.max(1 - progress * 1.15, 0));
    }
  }
}
