import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Item {
  title: string;
  description: string;
  image: string;
  alt: string;
  stack: string[];
  link: string;
  /** e.g. "Lead Developer" */
  role?: string;
  /** e.g. "2026" */
  year?: string;
}

@Component({
  selector: 'app-slider',
  standalone: false,
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent implements AfterViewInit, OnDestroy {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() items: Item[] = [];

  @ViewChild('slider', { static: false }) slider!: ElementRef<HTMLElement>;

  showLeftArrow = false;
  showRightArrow = true;

  private readonly isBrowser: boolean;
  private onScroll = () => this.requestArrowUpdate();
  private ticking = false;
  private frame = 0;

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser || !this.slider) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.slider.nativeElement.addEventListener('scroll', this.onScroll, { passive: true });
    });

    // Wait for images/layout before measuring.
    setTimeout(() => this.updateArrowVisibility(), 0);
  }

  ngOnDestroy(): void {
    if (!this.isBrowser || !this.slider) {
      return;
    }
    this.slider.nativeElement.removeEventListener('scroll', this.onScroll);
    cancelAnimationFrame(this.frame);
  }

  scrollLeft(): void {
    this.scrollByPage(-1);
  }

  scrollRight(): void {
    this.scrollByPage(1);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateArrowVisibility();
  }

  /** Scroll by roughly one "screenful" of cards. */
  private scrollByPage(direction: 1 | -1): void {
    const el = this.slider?.nativeElement;
    if (!el) {
      return;
    }
    const distance = Math.max(el.clientWidth * 0.85, 320);
    el.scrollBy({ left: direction * distance, behavior: 'smooth' });
  }

  private requestArrowUpdate(): void {
    if (this.ticking) {
      return;
    }
    this.ticking = true;
    this.frame = requestAnimationFrame(() => {
      this.zone.run(() => this.updateArrowVisibility());
      this.ticking = false;
    });
  }

  private updateArrowVisibility(): void {
    const el = this.slider?.nativeElement;
    if (!el) {
      return;
    }
    // 2px tolerance covers sub-pixel rounding at the ends of the track.
    this.showLeftArrow = el.scrollLeft > 2;
    this.showRightArrow = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
  }
}
