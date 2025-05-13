import { Component,Input, ViewChild, ElementRef,HostListener } from '@angular/core';

export interface Item {
  title: string;
  description: string;
  image:string;
  alt:string;
  stack: string[];
  link: string;
}

@Component({
  selector: 'app-slider',
  standalone: false,
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
 @Input() title: string = '';
  @Input() items: Item[] = [];

  @ViewChild('slider', { static: false }) slider!: ElementRef;

  showLeftArrow = false;
  showRightArrow = true;

  ngAfterViewInit() {
    this.updateArrowVisibility();
  }

  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -700, behavior: 'smooth' });
    setTimeout(() => this.updateArrowVisibility(), 500); // give scroll animation time to finish
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 700, behavior: 'smooth' });
    setTimeout(() => this.updateArrowVisibility(), 500);
  }

  updateArrowVisibility() {
    const el = this.slider.nativeElement;
    this.showLeftArrow = el.scrollLeft > 0;
    this.showRightArrow = el.scrollLeft + el.clientWidth < el.scrollWidth;
  }

  @HostListener('window:resize')
  onResize() {
    this.updateArrowVisibility();
  }
}
