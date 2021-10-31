import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalComponent } from './personal.component';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PersonalComponent
  ],
  imports: [
    ShareModule,
    PersonalRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonalModule { }
