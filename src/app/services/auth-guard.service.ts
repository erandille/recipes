import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    // Check to see if a user has a valid token
    if (this.authService.isAuthenticated()) {
      // If they do, return true and allow the user to load app
      return true;
    }
    this.router.navigate(["/welcome"]);
    return false;
  }
}
