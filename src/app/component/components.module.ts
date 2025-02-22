import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../component/footer/footer.component';
import { TopnavComponent } from '../component/topnav/topnav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FooterComponent,TopnavComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [FooterComponent,TopnavComponent]
})
export class ComponentsModule { }
