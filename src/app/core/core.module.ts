import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { PagesModule } from '../pages/pages.module';
import { ShareModule } from '../share/share.module';
import {HttpClientModule,HttpClientJsonpModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    PagesModule,
    ShareModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule,
    FormsModule 
  ],
  exports: [
    ShareModule,
    AppRoutingModule
  ],
  providers: [],
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() parentmondle: CoreModule){
   if(parentmondle){
     throw new Error('CoreModule 只能被appModule引入');
   } 
  }
 }
