import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { NewReservationComponent } from './pages/new-reservation/new-reservation.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { UseCodeComponent } from './pages/use-code/use-code.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {
        path:'list',
        component:ListComponent
      },
      {
        path:'new-reservation',
        component:NewReservationComponent
      },
      {
        path:'reservation/:id',
        component:ReservationComponent
      },
      {
        path:'claim-reservation',
        component:UseCodeComponent
      },
      {
        path:'**',
        redirectTo:'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
