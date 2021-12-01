import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngMaterialModule } from './ang-material/ang-material.module';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { P404Component } from './pages/p404/p404.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    P404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngMaterialModule,
    RouterModule,
    ComponentsModule,
  ],
  exports:  [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
