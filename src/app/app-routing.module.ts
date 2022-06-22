import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MovielistComponent} from "./movielist/movielist.component";
import {MoviedetailComponent} from "./moviedetail/moviedetail.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ContactComponent} from "./contact/contact.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {AdminDashComponent} from "./admin-dash/admin-dash.component";
import {DashMoviesComponent} from "./dash-movies/dash-movies.component";
import {DashHallsComponent} from "./dash-halls/dash-halls.component";
import {DashScreeningsComponent} from "./dash-screenings/dash-screenings.component";
import {DashUsersComponent} from "./dash-users/dash-users.component";
import {DashReservationsComponent} from "./dash-reservations/dash-reservations.component";
import {DashVouchersComponent} from "./dash-vouchers/dash-vouchers.component";
import {DashRatingsComponent} from "./dash-ratings/dash-ratings.component";
import {DashPricesComponent} from "./dash-prices/dash-prices.component";

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'movies', component: MovielistComponent},
  {path:'movies/:id', component: MoviedetailComponent},
  {path:'schedule', component: ScheduleComponent},
  {path:'reservation/:id', component: ReservationComponent},
  {path:'about', component: ContactComponent},
  {path:'contact', component: ContactComponent},
  {path:'dashboard', component: AdminDashComponent},
  {path:'dash-movies', component: DashMoviesComponent},
  {path:'dash-halls', component: DashHallsComponent},
  {path:'dash-screenings', component: DashScreeningsComponent},
  {path:'dash-users', component: DashUsersComponent},
  {path:'dash-reservations', component: DashReservationsComponent},
  {path:'dash-vouchers', component: DashVouchersComponent},
  {path:'dash-ratings', component: DashRatingsComponent},
  {path:'dash-prices', component: DashPricesComponent},

  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
