import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NewMenuComponent } from './pages/new-menu/new-menu.component';
import { ComponentsModule } from '../components/components.module';
import { AngMaterialModule } from '../ang-material/ang-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    MenuComponent,
    NewMenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ComponentsModule,
    AngMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    CardModule
  ]
})
export class MenuModule { }
