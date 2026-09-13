import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'GiiFlix';

  /** Controls the "back to top" button. */
  showBackToTop = false;

  @ViewChild('progressBar') progressBar?: ElementRef<HTMLElement>;

  private readonly isBrowser: boolean;
  private ticking = false;
  private frame = 0;
  private routerSub?: Subscription;
  private onScroll = () => this.requestUpdate();

  constructor(
    private zone: NgZone,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
      this.update();
    });

    // Always land at the top of a freshly navigated page.
    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    if (!this.isBrowser) {
      return;
    }
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    cancelAnimationFrame(this.frame);
  }

  scrollToTop(): void {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;

    // Written straight to the DOM — no change detection needed for this.
    if (this.progressBar) {
      this.progressBar.nativeElement.style.transform = `scaleX(${progress})`;
    }

    const shouldShow = window.scrollY > 600;
    if (shouldShow !== this.showBackToTop) {
      // Only re-enter Angular when the button actually needs to toggle.
      this.zone.run(() => (this.showBackToTop = shouldShow));
    }
  }
}
