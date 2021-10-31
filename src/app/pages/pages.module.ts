import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { Admin2Module } from './admin2/admin2.module';
import { HomeModule } from './home/home.module';
import { PcollectionModule } from './pcollection/pcollection.module';
import { PersonalModule } from './personal/personal.module';
import { PmanagementModule } from './pmanagement/pmanagement.module';
import { ResourceModule } from './resource/resource.module';



@NgModule({
  declarations: [],
  imports: [
    HomeModule,
    ResourceModule,
    PersonalModule,
    PcollectionModule,
    PmanagementModule,
    AdminModule,
    Admin2Module,
    FormsModule
  ],
  exports: [
    HomeModule,
    ResourceModule,
    PersonalModule,
    PcollectionModule,
    PmanagementModule,
    AdminModule,
    Admin2Module
  ]
})
export class PagesModule { }
