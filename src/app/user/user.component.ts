import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "./user";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  user: User;
  userId: number;
  userRecipes;
  spinner: boolean;
  dataSource;
  loggedUser;
  displayedColumns: string[] = ["title", "vege", "show"];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.spinner = true;
      this.loggedUser = JSON.parse(localStorage.getItem("user"));
      this.userId = params["userId"] || this.loggedUser["id"];
      this.getUser(this.userId);
    });
  }

  checkUser() {
    const logged = JSON.parse(localStorage.getItem("user"))["id"];
    if (logged == this.userId) {
      return true;
    } else {
      return false;
    }
  }

  validateUser(): boolean {
    if (this.userId == this.loggedUser["id"]) {
      return true;
    } else {
      return false;
    }
  }

  getUser(userId: number) {
    this.userService.getUser(userId).subscribe(response => {
      this.user = new User(response);
      this.spinner = false;
    });
  }

  editProfile() {
    this.router.navigate(["/edituser"]);
  }

  goToFridge() {
    this.router.navigate(["/fridge"]);
  }

  navigateRecipe(recipeId: string) {
    this.router.navigate(["/recipe"], { queryParams: { id: recipeId } });
  }

  navigateForm() {
    this.router.navigate(["/new"], { queryParams: { typeForm: 1 } });
  }
}
