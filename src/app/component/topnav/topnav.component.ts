import { Component, HostListener,Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; 

@Component({
  selector: 'app-topnav',
  standalone: false,
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.scss'
})
export class TopnavComponent {

  windowWidth: number = 0;
  isDropdownOpen: boolean = false;
  isMenuOpen: boolean = false; // Flag to toggle the mobile menu visibility


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = (event.target as Window).innerWidth;  
    }
  }

  get isMobile() {
    return this.windowWidth < 768;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
