import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersDashComponent } from './components/users-dash/users-dash.component';
import { PostsComponent } from './components/posts/posts.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: AuthenticationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard,AuthGuard]
  },
  {
    path: 'channels',
    children: [
      { path: '', component: UsersDashComponent},
      { path: ':channelId/posts', component: PostsComponent}
    ],
    canActivate: [LoginGuard]
  },
  {
    path: '404',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
