import { Ingredient } from "../ingredient/ingredient";
import { User } from "../user/user";

export class Recipe {
  constructor(recipe?: object) {
    if(recipe) {
      this.id = recipe["id"];
      this.description = recipe["description"];
      this.title = recipe["title"];
      this.vege = recipe["vege"];
      this.ingredients = new Array<Ingredient>();
      for (let i = 0; i < recipe["ingredients"].length; i++)
        this.ingredients[i] = new Ingredient(recipe["ingredients"][i]["ingredient"]);
      this.user = new User(recipe["user"]);
      this.imgPath = recipe["imgPath"];
    }
  }
  id: string;
  title: string;
  vege: boolean;
  description: string;
  ingredients: Ingredient[];
  user: User;
  imgPath: string;
}
