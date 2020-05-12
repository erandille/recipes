import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { LoginService } from "./services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  reloadHelper: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }

  async onSubmit() {
    const formValue = this.loginForm.value;
    this.loginService.login(formValue.username, formValue.password).subscribe(
      res => {
        if (res.token) {
          this.router.navigate(["/"]);
        }
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open("Wrong username/password!", "OK", {
          duration: 3000
        });
      }
    );
  }
}
