import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngMaterialModule } from '../ang-material/ang-material.module';
import { CardComponent } from '../components/card/card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DefaultImgPipe } from './default-img.pipe';


@NgModule({
  declarations: [
    NavbarComponent,
    CardComponent,
    PageHeaderComponent,
    DashboardComponent,
    DefaultImgPipe
  ],
  imports: [
    CommonModule,
    AngMaterialModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    CardComponent,
    PageHeaderComponent
  ],
  providers:[
    DefaultImgPipe
  ]
})
export class ComponentsModule { }
