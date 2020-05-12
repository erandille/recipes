import { Ingredient } from "./../ingredient/ingredient";
import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe/recipe";
import { RecipeService } from "../recipe/services/recipe.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-recipe-form",
  templateUrl: "./recipe-form.component.html",
  styleUrls: ["./recipe-form.component.css"]
})
export class RecipeFormComponent implements OnInit {
  recipe: Recipe;
  typeForm: number;
  spinner: boolean;
  recipeImage: string;
  imgURL: any = null;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params["typeForm"] == 0) {
        this.getRecipe(params["recipeId"]);
        this.spinner = true;
      } else {
        this.recipe = new Recipe();
        this.recipe.ingredients = new Array<Ingredient>();
        this.spinner = false;
      }
      this.typeForm = params["typeForm"];
    });
  }

  selectedIngredient(ingredient: Ingredient) {
    if (this.validateIngredient(ingredient.id) == true)
      this.recipe.ingredients.push(ingredient);
  }

  validateIngredient(ingredientId: string): boolean {
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      if (this.recipe.ingredients[i].id == ingredientId) {
        this.snackBar.open("Ingredient already exists!", "OK", {
          duration: 2000
        });
        return false;
      }
    }
    return true;
  }

  deleteIngredient(ingredient: Ingredient) {
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      if (this.recipe.ingredients[i].id == ingredient["id"])
        this.recipe.ingredients.splice(i, 1);
    }
  }

  checkVege(): boolean {
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      if (this.recipe.ingredients[i].vege == false) return false;
    }
    return true;
  }

  getRecipe(recipeId: string) {
    this.recipeService.getRecipe(recipeId).subscribe(response => {
      this.recipe = new Recipe(response);
      this.imgURL = this.recipe.imgPath;
      this.spinner = false;
    });
  }

  createRecipe(): void {
    if (
      this.recipe.title == "" ||
      this.recipe.description == "" ||
      this.recipe.title == null ||
      this.recipe.description == null
    ) {
      this.snackBar.open(
        "You need to fill title and description fields!",
        "OK",
        {
          duration: 3000
        }
      );
    } else {
      this.spinner = true;
      if (this.imgURL == null) {
        this.recipe.imgPath = null;
        this.recipe.vege = this.checkVege();
        this.recipeService.createRecipe(this.recipe).subscribe(response => {
          this.snackBar.open("Recipe created successfully!", "OK", {
            duration: 3000
          });
          this.router.navigate(["/"]);
        });
      } else {
        const formData = new FormData();
        formData.append(
          "image",
          this.imgURL.substring(this.imgURL.indexOf(",") + 1)
        );
        this.recipeService.putImage(formData).subscribe((response: any) => {
          this.recipe.imgPath = String(response.link);
          this.recipe.vege = this.checkVege();
          this.recipeService.createRecipe(this.recipe).subscribe(response => {
            this.snackBar.open("Recipe created successfully!", "OK", {
              duration: 3000
            });
            this.router.navigate(["/"]);
          });
        });
      }
    }
  }

  putRecipe(recipeId: string) {
    if (
      this.recipe.title == "" ||
      this.recipe.description == "" ||
      this.recipe.title == null ||
      this.recipe.description == null
    ) {
      this.snackBar.open(
        "You need to fill title and description fields!",
        "OK",
        {
          duration: 3000
        }
      );
    } else {
      this.spinner = true;
      if (this.imgURL == null) {
        this.recipe.imgPath = null;
        this.recipe.vege = this.checkVege();
        this.recipeService
          .putRecipe(recipeId, this.recipe)
          .subscribe(response => {
            this.snackBar.open("Recipe updated successfully!", "OK", {
              duration: 3000
            });
            this.router.navigate(["/recipe"], {
              queryParams: { id: recipeId }
            });
          });
      } else {
        const formData = new FormData();
        formData.append(
          "image",
          this.imgURL.substring(this.imgURL.indexOf(",") + 1)
        );
        this.recipeService.putImage(formData).subscribe((response: any) => {
          this.recipe.imgPath = String(response.link);
          this.recipe.vege = this.checkVege();
          this.recipeService
            .putRecipe(recipeId, this.recipe)
            .subscribe(response => {
              this.snackBar.open("Recipe updated successfully!", "OK", {
                duration: 3000
              });
              this.router.navigate(["/recipe"], {
                queryParams: { id: recipeId }
              });
            });
        });
      }
    }
  }

  previewImage(files) {
    if (files.length === 0) {
      this.imgURL = null;
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.imgURL = null;
      return;
    }
    const reader = new FileReader();
    this.recipeImage = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.imgURL = reader.result;
    };
  }
}
