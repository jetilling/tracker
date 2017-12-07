//--------Angular Imports---------//
import { NgModule }                             from '@angular/core';
import { BrowserModule }                        from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }     from '@angular/forms';
import { HttpModule, JsonpModule }              from '@angular/http';

//--------Components---------//
import { MainComponent }                        from './main/main.component';
import { HomeComponent }                        from './landing/home/home.component';
import { LoginComponent }                       from './authentication/login/login.component';
import { RegisterComponent }                    from './authentication/register/register.component';
import { DashboardComponent }                   from './dashboard/dashboard.component';

//--------Services---------//
import { AuthService }                          from './services/auth.service';
import { CommonFunctions }                      from './services/commonFunctions.service';
import { UsersService }                         from './services/users.service';

//--------Routing---------//
import { AppRoutingModule }                     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
  ],
  providers: [
    AuthService,
    CommonFunctions,
    UsersService
  ],
  bootstrap: [ MainComponent ]
})

export class AppModule {}