import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent{

  constructor(private router: Router, private authService: AuthService) {}

  hasRoute() {
    const routes = ["/","/login","/register","/404"]
    return !routes.includes(this.router.url);
  }

  onLogout(){
    this.authService.logout().subscribe(response => {
      this.router.navigate(["/login"])
      console.log('Logged Out')
    })
  }
  
}
