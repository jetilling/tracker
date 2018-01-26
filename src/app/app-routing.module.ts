import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

//--------Components---------//
import { HomeComponent }                        from './landing/home/home.component';
import { RegisterComponent }                    from './authentication/register/register.component';
import { LoginComponent }                       from './authentication/login/login.component';
import { DashboardComponent }                   from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}