import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  token!: string;
  errorMessage!: string;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { 
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const token: string = params['token']
      if (token) {
        try {
          jwt_decode(token);
          this.token = token
        } catch (error: any) {
          this.router.navigate(['/404'])
        }
      }
      else {
        this.router.navigate(['/404'])
      }
    })

  }



  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }

    const password = form.value.password
    const confirmPassword = form.value.confpassword

    this.authService.signUp(password, confirmPassword, this.token)
     .subscribe({next: ()=>{
        this.errorMessage = ''
        this.router.navigate(['/login'])
     },error: ()=>{
       this.errorMessage = 'Your account exists or check your credentials'
     }})  
    // subscribe({res: response => {
      //   this.errorMessage = ''
      //   this.router.navigate(['/login'])
      // }, error => {
      //   
      // }})

  }


}
