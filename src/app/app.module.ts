import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { NavbarComponent } from "./navbar/navbar.component";

import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatCardModule,
  MatButtonModule,
  MatRadioModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatListModule,
  MatTableModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatSortModule,
  MatSpinner,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatDialog
} from "@angular/material";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { OverlayModule } from "@angular/cdk/overlay";
import { HomeComponent } from "./home/home.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipeTabComponent } from "./recipe-tab/recipe-tab.component";
import { RecipeFormComponent } from "./recipe-form/recipe-form.component";
import { AuthService } from "./services/auth.service";
import { IngredientComponent } from "./ingredient/ingredient.component";
import { UserComponent } from "./user/user.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { FridgeComponent } from "./fridge/fridge.component";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { GoodbyeComponent } from "./goodbye/goodbye.component";
import { IngredientsPageComponent } from "./ingredients-page/ingredients-page.component";

const MaterialModules = [
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatCardModule,
  MatButtonModule,
  MatRadioModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatListModule,
  MatTableModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    RecipeComponent,
    RecipeTabComponent,
    RecipeFormComponent,
    IngredientComponent,
    UserComponent,
    UsersListComponent,
    RecipesListComponent,
    UserEditComponent,
    FridgeComponent,
    ConfirmationDialogComponent,
    WelcomeComponent,
    GoodbyeComponent,
    IngredientsPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MaterialModules,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    OverlayModule,
    RouterModule.forRoot([
      { path: "welcome", component: WelcomeComponent },
      { path: "goodbye", component: GoodbyeComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", canActivate: [AuthGuardService], component: HomeComponent },
      {
        path: "recipe",
        canActivate: [AuthGuardService],
        component: RecipeComponent
      },
      {
        path: "recipes",
        canActivate: [AuthGuardService],
        component: RecipesListComponent
      },
      {
        path: "edit",
        canActivate: [AuthGuardService],
        component: RecipeFormComponent
      },
      {
        path: "new",
        canActivate: [AuthGuardService],
        component: RecipeFormComponent
      },
      {
        path: "users",
        canActivate: [AuthGuardService],
        component: UsersListComponent
      },
      {
        path: "user",
        canActivate: [AuthGuardService],
        component: UserComponent
      },
      {
        path: "edituser",
        canActivate: [AuthGuardService],
        component: UserEditComponent
      },
      {
        path: "fridge",
        canActivate: [AuthGuardService],
        component: FridgeComponent
      },
      {
        path: "ingredients",
        canActivate: [AuthGuardService],
        component: IngredientsPageComponent
      }
    ])
  ],

  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule {}
