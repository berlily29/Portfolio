import { Component, ViewChild, ElementRef, HostListener, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-works',
  standalone: false,
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss'
})
export class WorksComponent {
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

projectSlide1 = [
    {
      title: 'Web Calculator', 
      description: 'A Calculator in a website.', 
      image: "projects/calculator.png", 
      alt: 'Calculator', 
      stack: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://berlily29.github.io/calculator/',
  },
   {
      title: 'Codeeworks', 
      description: 'A Calculator in a website.', 
      image: "projects/codeeworks.png", 
      alt: 'Codeeworks Picture Sample', 
      stack: ['HTML', 'CSS', 'JavaScript', 'Appscript google'],
      link: 'https://codeeworks.bitbucket.io/',
  },
   {
      title: 'kayantabe', 
      description: 'A preselection and information web app.', 
      image: "projects/kayantabe.png", 
      alt: 'Kayantabe Picture Sample', 
      stack: ['Laravel', 'PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
      link: 'https://kayantabe.com/',
  },
   {
      title: 'Running Ninja', 
      description: 'Inspired by DINO (because I am bored).', 
      image: "projects/runningsprite.png", 
      alt: 'Running Ninja Picture Sample', 
      stack: ['HTML', 'CSS', 'JavaScript',],
      link: 'https://berlily29.github.io/runningsprite/',
  },
   {
      title: 'xpress', 
      description: 'A web-based E-wallet School project.', 
      image: "projects/xpress_project.png", 
      alt: 'xpress Picture Sample', 
      stack: ['Handlebars', 'CSS', 'JavaScript', 'MongoDB', 'Node.js'],
      link: '',
  },
  
];

projectSlide2 = [
  {
      title: 'Coming Soon', 
      description: '', 
      image: "projects/comingsoon.jpg", 
      alt: 'Coming Soon Picture', 
      stack: [],
      link: '',
  },
    {
      title: 'Coming Soon', 
      description: '', 
      image: "projects/comingsoon.jpg", 
      alt: 'Coming Soon Picture', 
      stack: [],
      link: '',
  },
    {
      title: 'Coming Soon', 
      description: '', 
      image: "projects/comingsoon.jpg", 
      alt: 'Coming Soon Picture', 
      stack: [],
      link: '',
  },
    {
      title: 'Coming Soon', 
      description: '', 
      image: "projects/comingsoon.jpg", 
      alt: 'Coming Soon Picture', 
      stack: [],
      link: '',
  },
    {
      title: 'Coming Soon', 
      description: '', 
      image: "projects/comingsoon.jpg", 
      alt: 'Coming Soon Picture', 
      stack: [],
      link: '',
  },
]
}
