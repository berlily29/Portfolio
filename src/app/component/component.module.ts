import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { TopnavComponent } from './topnav/topnav.component';
import { RouterModule } from '@angular/router';
import { SliderComponent } from './slider/slider.component';



@NgModule({
  declarations: [
    FooterComponent,
    TopnavComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [FooterComponent,TopnavComponent,SliderComponent]

})
export class ComponentModule { }
