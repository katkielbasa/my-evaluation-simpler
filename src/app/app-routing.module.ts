import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'servers', component: CustomerTableComponent  },
  // { path: 'add', component: SubmitCustomerComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
