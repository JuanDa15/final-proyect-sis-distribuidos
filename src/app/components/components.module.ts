import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngMaterialModule } from '../ang-material/ang-material.module';
import { CardComponent } from '../components/card/card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DefaultImgPipe } from './default-img.pipe';
import { CalendarComponent } from './calendar/calendar.component';
import { IgxCalendarModule } from 'igniteui-angular';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';



@NgModule({
  declarations: [
    NavbarComponent,
    CardComponent,
    PageHeaderComponent,
    DashboardComponent,
    DefaultImgPipe,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    AngMaterialModule,
    RouterModule,
    IgxCalendarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  exports: [
    NavbarComponent,
    CardComponent,
    PageHeaderComponent,
    CalendarComponent
  ],
  providers:[
    DefaultImgPipe
  ]
})
export class ComponentsModule { }
