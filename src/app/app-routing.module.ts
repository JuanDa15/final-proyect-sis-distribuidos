import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children:[
      {
        path: '',
        component: DashboardComponent
      }
    ]
  },
  {
    path: 'dishes',
    loadChildren: ()=>import('./dishes/dishes.module').then(module => module.DishesModule)
  },
  {
    path: 'employees',
    loadChildren: ()=>import('./employees/employees.module').then(module => module.EmployeesModule)
  },
  {
    path: 'menus',
    loadChildren: ()=>import('./menu/menu.module').then(module => module.MenuModule)
  },
  {
    path: 'reservations',
    loadChildren: ()=>import('./reservations/reservations.module').then(module => module.ReservationsModule)
  },
  {
    path: 'suppliers',
    loadChildren: ()=>import('./suppliers/suppliers.module').then(module => module.SuppliersModule)
  },
  {
    path: 'customers',
    loadChildren: ()=>import('./customers/customers.module').then(module => module.CustomersModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
