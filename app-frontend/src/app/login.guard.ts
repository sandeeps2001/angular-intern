import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  isLoggedIn!: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.currentUser().pipe(
      map((response) => {
        if (response) {
          return true; // User is authenticated, allow navigation
        } else {
          this.router.navigate(['/login']);
          return false; // User is not authenticated, prevent navigation
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false); // Error occurred, prevent navigation
      })
    );
  }
}
