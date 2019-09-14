import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { NavbarComponent } from './navbar/navbar.component';
import UserComponent from './user/user.component';
import UserListComponent from './user-list/user-list.component';
import BarChartComponent from './bar-chart/bar-chart.component';
import { SearchUserPipe } from './search-user.pipe'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    UserListComponent,
    BarChartComponent,
    SearchUserPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
