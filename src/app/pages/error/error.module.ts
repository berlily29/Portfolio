import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { Error404Component } from './error404/error404.component';
import { Error503Component } from './error503/error503.component';


@NgModule({
  declarations: [
    Error404Component,
    Error503Component,
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
