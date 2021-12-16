import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { EditComponent } from './pages/edit/edit.component';
import { NewCustomerComponent } from './pages/new-customer/new-customer.component';
import { AngMaterialModule } from '../ang-material/ang-material.module';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    EditComponent,
    NewCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    AngMaterialModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule { }
