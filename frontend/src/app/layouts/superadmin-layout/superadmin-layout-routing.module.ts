import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperadminComponent } from 'src/app/component/superadmin/superadmin.component';
import { SuperadminLayoutComponent } from './superadmin-layout.component';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminLayoutComponent,
    children: [
      {
        path: 'superadmin',
        component: SuperadminComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperadminLayoutRoutingModule {}
