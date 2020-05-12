import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-goodbye",
  templateUrl: "./goodbye.component.html",
  styleUrls: ["./goodbye.component.css"]
})
export class GoodbyeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  login() {
    this.router.navigate(["/login"]);
  }
}
