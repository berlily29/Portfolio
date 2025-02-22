import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error503Component } from './error503/error503.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '503',
    component: Error503Component
  },
  {
    path: '', 
    redirectTo: '404', 
    pathMatch:'full'
  },
  {
    path: '**', 
    redirectTo: '404',
    pathMatch:'full'
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { 


}
