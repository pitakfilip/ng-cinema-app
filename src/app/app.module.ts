import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MovielistComponent } from './movielist/movielist.component';
import { MoviedetailComponent } from './moviedetail/moviedetail.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RepeatPipe } from './repeat.pipe';
import {LocalStorageModule} from "angular-2-local-storage";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { DashNavComponent } from './dash-nav/dash-nav.component';
import { DashMoviesComponent } from './dash-movies/dash-movies.component';
import { DashPricesComponent } from './dash-prices/dash-prices.component';
import { DashRatingsComponent } from './dash-ratings/dash-ratings.component';
import { DashHallsComponent } from './dash-halls/dash-halls.component';
import { DashScreeningsComponent } from './dash-screenings/dash-screenings.component';
import { DashUsersComponent } from './dash-users/dash-users.component';
import { DashReservationsComponent } from './dash-reservations/dash-reservations.component';
import { DashVouchersComponent } from './dash-vouchers/dash-vouchers.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovielistComponent,
    MoviedetailComponent,
    ScheduleComponent,
    NotFoundComponent,
    RepeatPipe,
    LoginComponent,
    ReservationComponent,
    AdminDashComponent,
    DashNavComponent,
    DashMoviesComponent,
    DashPricesComponent,
    DashRatingsComponent,
    DashHallsComponent,
    DashScreeningsComponent,
    DashUsersComponent,
    DashReservationsComponent,
    DashVouchersComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        LocalStorageModule.forRoot({
            prefix: 'cinema-app',
            storageType: 'localStorage'
        }),
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
