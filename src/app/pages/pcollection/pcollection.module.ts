import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcollectionRoutingModule } from './pcollection-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { PcollectionComponent } from './pcollection.component';


@NgModule({
  declarations: [
    PcollectionComponent
  ],
  imports: [
    ShareModule,
    PcollectionRoutingModule
  ]
})
export class PcollectionModule { }
