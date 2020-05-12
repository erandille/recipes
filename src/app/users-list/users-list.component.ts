import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UserService } from "../user/services/user.service";
import { User } from "../user/user";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"]
})
export class UsersListComponent implements OnInit {
  lastPage: boolean;
  loggedUser;
  dataSource;
  users;
  spinner: boolean;
  actualPage: number;
  actualLimit: number;
  displayedColumns: string[] = ["id", "username", "vege", "show"];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.spinner = true;
    this.actualPage = 0;
    this.actualLimit = 10;
    this.getUsers();
  }

  checkLastPage(recipes: Array<object>) {
    if (recipes.length < this.actualLimit) this.lastPage = true;
    else this.lastPage = false;
  }

  prevPage() {
    if (this.actualPage > 0) this.actualPage -= 1;
    this.getUsers();
  }

  nextPage() {
    this.actualPage += 1;
    this.getUsers();
  }

  refresh(){
    this.actualPage = 0;
    this.getUsers();
  }

  getUsers() {
    this.spinner = true;
    this.userService
      .getUsers(this.actualPage, this.actualLimit)
      .subscribe(res => {
        this.users = new Array<User>();
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        this.checkLastPage(this.users);
        this.spinner = false;
      });
  }

  navigateUser(userId: number) {
    if (JSON.parse(localStorage.getItem("user"))["id"] == userId) {
      this.router.navigate(["/"]);
    } else {
      this.router.navigate(["/user"], {
        queryParams: {
          userId: userId
        }
      });
    }
  }
}
