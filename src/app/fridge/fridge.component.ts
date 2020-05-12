import { Component, OnInit, ViewChild } from "@angular/core";
import { Ingredient } from "../ingredient/ingredient";
import { FridgeService } from "./services/fridge.service";
import {
  MatSnackBar,
  MatTableDataSource,
  MatSort,
  MatPaginator
} from "@angular/material";
import { Fridge } from "./fridge";
import { Recipe } from "../recipe/recipe";
import { Router } from "@angular/router";

@Component({
  selector: "app-fridge",
  templateUrl: "./fridge.component.html",
  styleUrls: ["./fridge.component.css"]
})
export class FridgeComponent implements OnInit {
  spinner: boolean;
  fridge: Fridge;
  fridgeRecipes: Recipe[];
  recipes: boolean;
  dataSource;
  displayedColumns: string[] = ["title", "vege", "author", "show"];
  constructor(
    private fridgeService: FridgeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.spinner = true;
    this.recipes = false;
    this.getFridge();
    this.dataSource = new MatTableDataSource(this.fridgeRecipes);
  }

  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter("");
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /////////////////////////////////////////////////////////////////////////////////Pagination/filter/sort part

  showRecipes() {
    if (this.fridge.ingredients.length == 0)
      this.snackBar.open("Your fridge is empty!", "OK", {
        duration: 2000
      });
    else this.getRecipesByFridge();
  }

  selectedIngredient(ingredient: Ingredient) {
    if (this.validateIngredient(ingredient.id) === true) {
      this.addIngredient(ingredient.id);
    }
  }

  validateIngredient(ingredientId: string): boolean {
    for (let i = 0; i < this.fridge.ingredients.length; i++) {
      if (this.fridge.ingredients[i].id == ingredientId) {
        this.snackBar.open("Ingredient already exists in your fridge!", "OK", {
          duration: 2000
        });
        return false;
      }
    }
    return true;
  }

  getRecipesByFridge() {
    this.spinner = true;
    this.fridgeService.getRecipesByFridge(this.fridge).subscribe(response => {
      this.fridgeRecipes = new Array<Recipe>();
      for (const recipe of response["recipes"]) {
        this.fridgeRecipes.push(recipe);
      }
      this.dataSource = new MatTableDataSource(this.fridgeRecipes);
      this.recipes = true;
      this.spinner = false;
    });
  }

  getFridge() {
    this.fridgeService.getFridge().subscribe(response => {
      this.fridge = new Fridge(response);
      this.recipes = false;
      this.spinner = false;
    });
  }

  deleteIngredient(ingredientId: string) {
    this.spinner = true;
    this.fridgeService.deleteIngredient(ingredientId).subscribe(response => {
      this.getFridge();
    });
  }

  addIngredient(ingredientId: string) {
    this.spinner = true;
    this.fridgeService.addIngredient(ingredientId).subscribe(
      response => {
        this.getFridge();
        this.recipes = false;
      },
      error => {
        this.snackBar.open("Ingredient already exists in your fridge!", "OK", {
          duration: 2000
        });
        this.spinner = false;
      }
    );
  }

  clearFridge() {
    this.spinner = true;
    this.fridgeService.clearFridge().subscribe(response => {
      this.snackBar.open("Fridge successfully cleared!", "OK", {
        duration: 2000
      });
      this.getFridge();
      this.recipes = false;
    });
  }

  navigateRecipe(recipeId: string) {
    this.router.navigate(["/recipe"], { queryParams: { id: recipeId } });
  }

  navigateProfile(userId: string) {
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
