import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NewMenuComponent } from './pages/new-menu/new-menu.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children:[
      {
        path:'list',
        component:ListComponent
      },
      {
        path:'new-menu',
        component:NewMenuComponent
      },
      {
        path:'menu/:id',
        component:MenuComponent
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
export class MenuRoutingModule { }
