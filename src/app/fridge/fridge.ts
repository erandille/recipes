import { Ingredient } from "../ingredient/ingredient";

export class Fridge {
  constructor(fridge: object) {
    this.ingredients = new Array<Ingredient>();
    for (let i = 0; i < fridge["ingredients"].length; i++)
      this.ingredients[i] = new Ingredient(fridge["ingredients"][i]["ingredient"]);
  }
  ingredients: Ingredient[];
}
