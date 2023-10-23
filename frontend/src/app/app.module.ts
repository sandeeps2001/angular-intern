import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuperadminLayoutComponent } from './layouts/superadmin-layout/superadmin-layout.component';
import { SignupLayoutComponent } from './layouts/signup-layout/signup-layout.component';
import { SignupComponent } from './component/signup/signup.component';
import { SuperadminComponent } from './component/superadmin/superadmin.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SuperadminLayoutComponent,
    SignupLayoutComponent,
    SignupComponent,
    SuperadminComponent,
    DashboardComponent,
  ],
  imports: [
   BrowserModule,
   AppRoutingModule,
   FormsModule,
   HttpClientModule,
   BrowserAnimationsModule,
   NzModalModule,
   NzButtonModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
