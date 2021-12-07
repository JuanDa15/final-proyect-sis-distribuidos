import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { NewReservationComponent } from './pages/new-reservation/new-reservation.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ComponentsModule } from '../components/components.module';
import { AngMaterialModule } from '../ang-material/ang-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { UseCodeComponent } from './pages/use-code/use-code.component';


@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    NewReservationComponent,
    ReservationComponent,
    UseCodeComponent
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    ComponentsModule,
    AngMaterialModule,
    ReactiveFormsModule,
    ClipboardModule
  ]
})
export class ReservationsModule { }
