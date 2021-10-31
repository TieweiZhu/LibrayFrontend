import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin2Component } from './admin2.component';

const routes: Routes = [
  {path:'admin2', component: Admin2Component, data:{title:'Admin2'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Admin2RoutingModule { }
