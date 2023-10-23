import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from 'src/app/component/signup/signup.component';

const routes: Routes = [
  {
    path:'',
    component:SignupComponent,
    children:[
      {
        path:'',
        redirectTo:'/signup',
        pathMatch:'full'
      },
      {
  path:'signup',
  loadChildren:()=>import('../../component/signup/signup.component').then(m => m.SignupComponent) 
  }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupLayoutRoutingModule { }
