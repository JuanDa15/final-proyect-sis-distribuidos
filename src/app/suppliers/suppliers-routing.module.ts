import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { NewSupplierComponent } from './pages/new-supplier/new-supplier.component';
import { SupplierComponent } from './pages/supplier/supplier.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {
        path:'list',
        component: ListComponent
      },
      {
        path:'new-supplier',
        component:NewSupplierComponent
      },
      {
        path:'supplier/:id',
        component:SupplierComponent
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
export class SuppliersRoutingModule { }
