import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { RegisterService } from "./services/register.service";
import { HttpErrorResponse } from "@angular/common/http";
import { first } from "rxjs/operators";
import { MustMatch } from "../helpers/MustMatch";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        username: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required]],
        confirmPassword: ["", [Validators.required]]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  get username() {
    return this.registerForm.get("username");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }
  get name() {
    return this.registerForm.get("name");
  }
  get surname() {
    return this.registerForm.get("surname");
  }

  get email() {
    return this.registerForm.get("email");
  }

  onSubmit() {
    const formValue = this.registerForm.value;
    this.registerService
      .register(
        formValue.username,
        formValue.email,
        formValue.password,
        formValue.confirmPassword
      )
      .pipe(first())
      .subscribe(
        data => {
          this.snackBar.open("Account successfully created!", "OK", {
            duration: 3000
          });
          this.router.navigate(["/login"]);
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.message, "OK", {
            duration: 3000
          });
        }
      );
  }
}
