import { Component, OnInit } from "@angular/core";
import { IngredientService } from "../ingredient/services/ingredient.service";
import { Ingredient } from "../ingredient/ingredient";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-ingredients-page",
  templateUrl: "./ingredients-page.component.html",
  styleUrls: ["./ingredients-page.component.css"]
})
export class IngredientsPageComponent implements OnInit {
  inputIdIngredient: string;
  inputNameIngredient: string;
  ingredient: Ingredient;
  takenIngredient: Ingredient;
  ingredientsList: Ingredient[];
  createEdit: boolean;
  editButton: boolean;
  deleteButton: boolean;
  list: boolean;
  constructor(
    private ingredientService: IngredientService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createEdit = true;
    this.editButton = false;
    this.deleteButton = false;
    this.list = true;
    this.ingredient = new Ingredient();
  }

  create() {
    this.ingredient = new Ingredient();
    this.createEdit = true;
    this.deleteButton = false;
  }

  edit() {
    this.ingredient = this.takenIngredient;
    this.createEdit = false;
    this.deleteButton = true;
  }

  submit() {
    if (
      this.ingredient.name == null ||
      this.ingredient.name == "" ||
      !(
        String(this.ingredient.vege) == "true" ||
        String(this.ingredient.vege) == "false"
      )
    ) {
      this.snackBar.open("You need to fill both fields properly!", "OK", {
        duration: 3000
      });
    } else {
      if (this.createEdit == true) this.createIngredient();
      if (this.createEdit == false) this.editIngredient();
    }
  }

  getIngredient() {
    if (this.inputIdIngredient == "" || this.inputIdIngredient == null) {
      this.snackBar.open("You need to enter something!", "OK", {
        duration: 3000
      });
    } else {
      this.ingredientService.getIngredient(this.inputIdIngredient).subscribe(
        response => {
          this.ingredient = new Ingredient(response);
          this.takenIngredient = this.ingredient;
          this.editButton = true;
          this.createEdit = false;
          this.deleteButton = true;
        },
        error => {
          this.snackBar.open("No ingredient for this id!", "OK", {
            duration: 3000
          });
        }
      );
    }
  }

  editListIngredient(ingredient: Ingredient) {
    this.ingredient = ingredient;
    this.takenIngredient = ingredient;
    this.createEdit = false;
    this.deleteButton = true;
    this.list = false;
  }

  createIngredient() {
    this.ingredientService
      .createIngredient(this.ingredient)
      .subscribe(response => {
        this.snackBar.open("Ingredient created successfully!", "OK", {
          duration: 3000
        });
      });
  }

  editIngredient() {
    this.ingredientService
      .putIngredient(this.ingredient)
      .subscribe(response => {
        this.snackBar.open("Ingredient edited successfully!", "OK", {
          duration: 3000
        });
      });
  }

  deleteIngredient() {
    this.ingredientService
      .deleteIngredient(this.ingredient.id)
      .subscribe(response => {
        this.snackBar.open("Ingredient deleted successfully!", "OK", {
          duration: 3000
        });
      });
  }

  searchIngredients() {
    if (this.inputNameIngredient == "" || this.inputNameIngredient == null) {
      this.snackBar.open("You need to enter something!", "OK", {
        duration: 3000
      });
    } else {
      this.ingredientService
        .searchIngredients(this.inputNameIngredient)
        .subscribe(response => {
          if (response["results"].length == 0) {
            this.snackBar.open("No ingredients for your input!", "OK", {
              duration: 3000
            });
          } else {
            this.ingredientsList = response["results"];
            this.list = true;
          }
        });
    }
  }
}
