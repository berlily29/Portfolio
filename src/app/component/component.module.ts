import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { TopnavComponent } from './topnav/topnav.component';
import { RouterModule } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../shared/reveal.directive';
import { ParallaxDirective } from '../shared/parallax.directive';

@NgModule({
  declarations: [
    FooterComponent,
    TopnavComponent,
    SliderComponent,
    ChatComponent,
    RevealDirective,
    ParallaxDirective,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    FooterComponent,
    TopnavComponent,
    SliderComponent,
    ChatComponent,
    RevealDirective,
    ParallaxDirective,
  ],
})
export class ComponentModule {}
