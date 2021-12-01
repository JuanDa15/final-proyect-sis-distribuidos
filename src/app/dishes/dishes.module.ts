import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishesRoutingModule } from './dishes-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AngMaterialModule } from '../ang-material/ang-material.module';
import { DishComponent } from './pages/dish/dish.component';
import { ListComponent } from './pages/list/list.component';
import { EditComponent } from './pages/edit/edit.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgSrcPipe } from './pipes/img-src.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    DishComponent,
    ListComponent,
    EditComponent,
    ImgSrcPipe,
  ],
  imports: [
    CommonModule,
    DishesRoutingModule,
    AngMaterialModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DishesModule { }
