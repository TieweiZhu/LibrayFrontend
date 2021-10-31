import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmanagementComponent } from './pmanagement.component';

const routes: Routes = [
  {path:'pmanagement', component: PmanagementComponent, data:{title:'PersonalManagement'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmanagementRoutingModule { }
