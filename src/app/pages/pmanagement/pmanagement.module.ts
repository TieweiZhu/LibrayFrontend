import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmanagementRoutingModule } from './pmanagement-routing.module';
import { PmanagementComponent } from './pmanagement.component';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PmanagementComponent
  ],
  imports: [
    ShareModule,
    PmanagementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PmanagementModule { }
