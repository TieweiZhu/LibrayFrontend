import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PcollectionComponent } from './pcollection.component';

const routes: Routes = [
  {path:'pcollection', component: PcollectionComponent, data:{title:'PersonalCollection'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcollectionRoutingModule { }
