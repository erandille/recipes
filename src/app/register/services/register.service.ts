import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "../../../../src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class RegisterService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  constructor(private httpClient: HttpClient) {}

  register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const user = { username, email, password, confirmPassword };
    return this.httpClient.post(
      `${environment.apiUrl}/register`,
      JSON.stringify(user),
      this.httpOptions
    );
  }
}
