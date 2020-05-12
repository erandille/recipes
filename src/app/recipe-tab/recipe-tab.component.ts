import { Component, OnInit, Input } from "@angular/core";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { RecipeService } from "../recipe/services/recipe.service";
import { Recipe } from "../recipe/recipe";
import { Router } from "@angular/router";
import { UserService } from "../user/services/user.service";

@Component({
  selector: "app-recipe-tab",
  templateUrl: "./recipe-tab.component.html",
  styleUrls: ["./recipe-tab.component.css"]
})
export class RecipeTabComponent implements OnInit {
  lastPage: boolean;
  input: string;
  spinner: boolean;
  actualPage: number;
  actualLimit: number;
  actualSort: string;
  recipes;
  dataSource;
  typeTab: number;
  displayedColumns: string[] = ["title", "vege", "author", "show"];
  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.spinner = true;
    this.lastPage = false;
    this.actualPage = 0;
    this.actualLimit = 10;
    this.actualSort = "Title";
    if (this.userId == 0) this.getRecipes();
    else if (this.userId == -1) this.searchRecipes();
    else this.getUserRecipes(this.userId);
  }

  @Input()
  userId: number;

  prevPage() {
    if (this.actualPage > 0) this.actualPage -= 1;
    this.refreshRecipes();
  }

  nextPage() {
    if (this.lastPage == false) this.actualPage += 1;
    this.refreshRecipes();
  }

  refresh() {
    this.actualPage = 0;
    this.lastPage = false;
    this.refreshRecipes();
  }

  refreshRecipes() {
    if (this.userId == 0) this.getRecipes();
    else if (this.userId == -1) this.searchRecipes();
    else this.getUserRecipes(this.userId);
  }

  search() {
    this.actualPage = 0;
    this.actualLimit = 10;
    this.lastPage = false;
    this.userId = -1;
    this.searchRecipes();
  }

  checkLastPage(recipes: Array<object>) {
    if (recipes.length < this.actualLimit) this.lastPage = true;
    else this.lastPage = false;
  }

  allRecipes() {
    window.location.reload();
  }

  getRecipes() {
    this.spinner = true;
    this.recipeService
      .getRecipes(this.actualPage, this.actualLimit, this.actualSort)
      .subscribe(response => {
        this.checkLastPage(response["recipes"]);
        this.recipes = new Array<Recipe>();
        this.recipes = response["recipes"];
        this.dataSource = new MatTableDataSource(this.recipes);
        this.spinner = false;
      });
  }

  getUserRecipes(userId: number) {
    this.spinner = true;
    this.userService
      .getUserRecipes(userId, this.actualPage, this.actualLimit)
      .subscribe(response => {
        this.recipes = new Array<Recipe>();
        this.recipes = response["recipes"];
        this.checkLastPage(this.recipes);
        if (this.recipes.length > 0) {
          this.dataSource = new MatTableDataSource(this.recipes);
        }
        this.spinner = false;
      });
  }

  searchRecipes() {
    if (this.input == null) {
      this.snackBar.open("You need to enter something!", "OK", {
        duration: 3000
      });
    } else {
      this.spinner = true;
      this.recipeService
        .searchRecipes(this.actualPage, this.actualLimit, this.input)
        .subscribe(response => {
          this.checkLastPage(response["recipes"]);
          this.recipes = new Array<Recipe>();
          this.recipes = response["recipes"];
          if (this.recipes.length > 0) {
            this.dataSource = new MatTableDataSource(this.recipes);
          }
          this.spinner = false;
          this.typeTab = 2;
        });
    }
  }

  navigateRecipe(recipeId: string) {
    this.router.navigate(["/recipe"], { queryParams: { id: recipeId } });
  }

  navigateProfile(userId: string) {
    if (JSON.parse(localStorage.getItem("user"))["id"] === userId) {
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
