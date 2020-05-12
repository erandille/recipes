import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../../src/environments/environment";
import { LoginResponse } from "../models/LoginResponse";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    const user = { username, password };
    return this.httpClient
      .post<LoginResponse>(
        `${environment.apiUrl}/login`,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(
        map(res => {
          this.save(username, res.token, res.userID);
          return res;
        })
      );
  }

  save(username: string, token: string, id: number) {
    const user = { username, id };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }
}
