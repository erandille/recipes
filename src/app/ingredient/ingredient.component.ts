import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Ingredient } from "./ingredient";
import { IngredientService } from "./services/ingredient.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-ingredient",
  templateUrl: "./ingredient.component.html",
  styleUrls: ["./ingredient.component.css"]
})
export class IngredientComponent implements OnInit {
  constructor(
    private ingredientService: IngredientService,
    private snackBar: MatSnackBar
  ) {}

  input: string;
  ingredients = new Array<Ingredient>();

  @Output()
  eventIngredient = new EventEmitter<object>();

  ngOnInit() {}

  addIngredient(ingredient: Ingredient) {
    this.eventIngredient.emit(ingredient);
  }

  searchIngredients(input: string) {
    if (input == "" || input == null) {
      this.snackBar.open("You need to enter something!", "OK", {
        duration: 3000
      });
    } else {
      this.ingredientService.searchIngredients(input).subscribe(res => {
        this.ingredients = res["results"];
      });
    }
  }
}
