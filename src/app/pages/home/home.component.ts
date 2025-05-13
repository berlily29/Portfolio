import { Component, PLATFORM_ID,Inject,HostListener,ElementRef, ViewChild  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; 

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  windowWidth: number = 0;

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
  
  webDev = [
    {
      src: 'html.png',
      alt: "HTML5 Logo",
    },
     {
      src: 'css.png',
      alt: "CSS Logo",
    },
     {
      src: 'js.png',
      alt: "Javascript Logo",
    },
    {
      src: 'angular.png',
      alt: "Angular2 Logo",
    },
    {
      src: 'angular.png',
      alt: "Angular2 Logo",
    },
    {
      src: 'nodejs.png',
      alt: "NodeJS Logo",
    },
    {
      src: 'express.png',
      alt: "Express Logo",
    },
    {
      src: 'php.png',
      alt: "PHP Logo",
    },
      {
      src: 'laravel.png',
      alt: "Laravel Logo",
    },
  ]

  sources = [
    {
    src: 'jira.png',
    alt: "Jira",
    },
    {
    src: 'python.png',
    alt: "Python Programming Language",
    },
    {
    src: 'postman.png',
    alt: "postman API Testing Tool",
    },
    {
    src: 'handlebars.png',
    alt: "Handlebars Templating Tool", 
    },
    {
    src: 'git.png',
    alt: "Version Control",
    },
    {
    src: 'appscript.png',
    alt: "Google Appscript",
    },
    {
    src: 'java.png',
    alt: "Java Programming Language",
    },
       {
    src: 'wordpress.png',
    alt: "Wordpress",
    },
]



}
