import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Admin2RoutingModule } from './admin2-routing.module';
import { Admin2Component } from './admin2.component';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Admin2Component
  ],
  imports: [
    ShareModule,
    Admin2RoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class Admin2Module { }
