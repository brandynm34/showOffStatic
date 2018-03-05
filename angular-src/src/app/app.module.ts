import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingComponents, RoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, 
    RoutingComponents,
  ],
  imports: [
    BrowserModule, RoutingModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
