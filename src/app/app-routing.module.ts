import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import UserComponent from './user/user.component';
import UserListComponent from './user-list/user-list.component';
import BarChartComponent from './bar-chart/bar-chart.component'

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full'}, 
  { path: 'users', component: UserComponent},
  { path: 'details/:id', component: UserListComponent}, 
  { path: 'graph', component: BarChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
