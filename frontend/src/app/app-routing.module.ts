import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/superadmin-layout/superadmin-layout.module').then(
            (m) => m.SuperadminLayoutModule
          ),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./layouts/signup-layout/signup-layout.module').then(
            (m) => m.SignupLayoutModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
        import('./layouts/superadmin-layout/superadmin-layout.module').then(
          (m) => m.SuperadminLayoutModule
        ),
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
