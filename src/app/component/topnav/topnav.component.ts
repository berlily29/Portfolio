import {
  Component,
  PLATFORM_ID,
  Inject,
  HostListener,
  OnInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-topnav',
  standalone: false,
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.scss',
})
export class TopnavComponent implements OnInit, OnDestroy {
  /** Default to a desktop width on the server so SSR markup matches the
   *  common case and we avoid a mobile-layout flash before hydration. */
  windowWidth = 1280;

  isMenuOpen = false;
  isAtTop = true;

  readonly links = [
    { label: 'Home', path: '/home', icon: 'home' },
    { label: 'Projects', path: '/projects', icon: 'movie' },
    { label: 'Contact', path: '/contacts', icon: 'mail' },
  ];

  private readonly isBrowser: boolean;
  private routerSub?: Subscription;

  constructor(
    private router: Router,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.windowWidth = window.innerWidth;
    }
  }

  ngOnInit(): void {
    // Close the mobile drawer whenever we navigate.
    this.routerSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.closeMenu());
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.setBodyLock(false);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    if (!this.isBrowser) {
      return;
    }
    this.windowWidth = (event.target as Window).innerWidth;
    if (!this.isMobile && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      this.isAtTop = window.scrollY < 24;
    }
  }

  get isMobile(): boolean {
    return this.windowWidth < 768;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.setBodyLock(this.isMenuOpen);
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.setBodyLock(false);
  }

  /** Stop the page scrolling behind the open drawer. */
  private setBodyLock(locked: boolean): void {
    if (!this.isBrowser) {
      return;
    }
    document.body.classList.toggle('is-locked', locked);
  }
}
