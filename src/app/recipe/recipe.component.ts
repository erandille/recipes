import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login/services/login.service";
import { Recipe } from "./recipe";
import { RecipeService } from "./services/recipe.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar, MatDialog } from "@angular/material";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.css"],
  providers: [LoginService]
})
export class RecipeComponent implements OnInit {
  recipeCard: Recipe;
  recipes;
  spinner: boolean;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.getRecipe(params["id"]);
      this.spinner = true;
    });
  }

  checkUser() {
    const logged = JSON.parse(localStorage.getItem("user"))["id"];
    if (logged == this.recipeCard.user["id"] || logged == 1) return true;
    else return false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: "Do you confirm the deletion of this recipe?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRecipe(this.recipeCard.id);
      }
    });
  }

  getRecipe(recipeId: string) {
    this.recipeService.getRecipe(recipeId).subscribe(response => {
      this.recipeCard = new Recipe(response);
      this.spinner = false;
    });
  }

  deleteRecipe(recipeId: string) {
    this.spinner = true;
    this.recipeService.deleteRecipe(recipeId).subscribe(response => {
      this.snackBar.open("Recipe deleted successfully!", "OK", {
        duration: 3000
      });
      this.router.navigate(["/"]);
    });
  }

  editRecipe() {
    this.router.navigate(["/edit"], {
      queryParams: { recipeId: this.recipeCard.id, typeForm: 0 }
    });
  }

  navigateProfile() {
    if (
      JSON.parse(localStorage.getItem("user"))["id"] ==
      this.recipeCard.user["id"]
    ) {
      this.router.navigate(["/"]);
    } else {
      this.router.navigate(["/user"], {
        queryParams: {
          userId: this.recipeCard.user["id"]
        }
      });
    }
  }
}
