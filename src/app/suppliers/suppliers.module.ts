import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { NewSupplierComponent } from './pages/new-supplier/new-supplier.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    NewSupplierComponent,
    SupplierComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    ComponentsModule
  ]
})
export class SuppliersModule { }
