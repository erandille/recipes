import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Ingredient } from "../ingredient";

@Injectable({
  providedIn: "root"
})
export class IngredientService {
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    })
  };

  getIngredient(ingredientId: string): Observable<object> {
    return this.httpClient
      .get(
        `https://team-recipes.herokuapp.com/ingredients/${ingredientId}`,
        this.httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  searchIngredients(input: string): Observable<object> {
    return this.httpClient
      .get(
        `https://team-recipes.herokuapp.com/search/ingredients?query=${input}`,
        this.httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  createIngredient(ingredient: Ingredient): Observable<Object> {
    return this.httpClient.post(
      "https://team-recipes.herokuapp.com/ingredients/",
      JSON.stringify(ingredient),
      this.httpOptions
    );
  }

  deleteIngredient(ingredientId: string): Observable<object> {
    return this.httpClient.delete(
      `https://team-recipes.herokuapp.com/ingredients/${ingredientId}`,
      this.httpOptions
    );
  }

  putIngredient(ingredient: Ingredient): Observable<object> {
    return this.httpClient.put(
      `https://team-recipes.herokuapp.com/ingredients/${ingredient.id}`,
      JSON.stringify(ingredient),
      this.httpOptions
    );
  }
}
