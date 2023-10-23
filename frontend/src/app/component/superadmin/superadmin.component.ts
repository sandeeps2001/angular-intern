import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent {
  email='';
  password='';
  isVisible = false;
  constructor(private http :HttpClient, private authservice:AuthService, private router:Router ){}


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

 
  submitform(){
    console.log('inside submit form')
      // this.authservice.signUp(this.email,this.password).subscribe(responseData=>{
      //   console.log(responseData);
      // })
      this.router.navigateByUrl('/dashboard');
}
}
