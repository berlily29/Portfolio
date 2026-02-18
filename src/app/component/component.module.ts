import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { TopnavComponent } from './topnav/topnav.component';
import { RouterModule } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FooterComponent,
    TopnavComponent,
    SliderComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [FooterComponent,TopnavComponent,SliderComponent,ChatComponent]

})
export class ComponentModule { }
