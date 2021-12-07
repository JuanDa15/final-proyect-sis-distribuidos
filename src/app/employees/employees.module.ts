import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';
import { ComponentsModule } from '../components/components.module';
import { AngMaterialModule } from '../ang-material/ang-material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    EmployeeComponent,
    NewEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ComponentsModule,
    AngMaterialModule,
    ReactiveFormsModule
  ]
})
export class EmployeesModule { }
