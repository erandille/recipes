import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isLogged: boolean;
  admin: boolean;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();
    this.validateAdmin();
  }

  validateAdmin() {
    if (JSON.parse(localStorage.getItem("user"))["id"] == 1) this.admin = true;
    else this.admin = false;
  }

  navigateRecipes() {
    let url = window.location.href;
    if(url.substr(url.length - 16) == 'recipes?userId=0')
      window.location.reload();
    else
      this.router.navigate(["/recipes"], { queryParams: { userId: 0 } });
  }

  navigateForm() {
    this.router.navigate(["/new"], {
      queryParams: { typeForm: 1 }
    });
  }

  navigateUsers() {
    this.router.navigate(["/users"]);
  }

  navigateIngredients() {
    this.router.navigate(["/ingredients"]);
  }
}
