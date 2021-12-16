import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { NewCustomerComponent } from './pages/new-customer/new-customer.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'list',
        component: ListComponent
      },
      {
        path:'new-customer',
        component: NewCustomerComponent
      },
      {
        path:'customer/:id',
        component: EditComponent
      },
      {
        path:'**',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
