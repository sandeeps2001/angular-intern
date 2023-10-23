import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MyChartComponent } from './frontend/frontend.component';
import { NzSegmentedModule} from 'ng-zorro-antd/segmented';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import{Routes,RouterModule} from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
const approutes :Routes = [{
  path : 'app', loadChildren:()=> import('./layout/layout.module').then((m)=>m.LayoutModule)}]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,FormsModule, NzSegmentedModule, HttpClientModule, BrowserAnimationsModule,NzButtonModule,NzIconModule,RouterModule.forChild(approutes)],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
