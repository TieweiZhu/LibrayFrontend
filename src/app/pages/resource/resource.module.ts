import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourceRoutingModule } from './resource-routing.module';
import { ResourceComponent } from './resource.component';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ResourceComponent
  ],
  imports: [
    ShareModule,
    ResourceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ResourceModule { }
