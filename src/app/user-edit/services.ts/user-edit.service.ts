import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../../src/environments/environment';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserEditService {
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    })
  };

  putDiet(diet: object): Observable<object> {
    return this.httpClient.put(
      `https://team-recipes.herokuapp.com/account/diet`,
      JSON.stringify(diet),
      this.httpOptions
    );
  }
  putEmail(email: object): Observable<object> {
    return this.httpClient.put(
      `https://team-recipes.herokuapp.com/account/email`,
      JSON.stringify(email),
      this.httpOptions
    );
  }
  putPassword(newPassword: object): Observable<object> {
    return this.httpClient.put(
      `https://team-recipes.herokuapp.com/account/password`,
      JSON.stringify(newPassword),
      this.httpOptions
    );
  }

  putAvatar(formData): Observable<object> {
    const options = {
      headers: new HttpHeaders({
        Authorization: "Client-ID 8e29654c3649aea"
      }),
      mimeType: "multipart/form-data",
      contentType: false
    };
    return this.httpClient
      .post("https://api.imgur.com/3/image", formData, options)
      .pipe(
        map((res: any) => {
          const avatarPath = res.data.link; //Imgur response
          this.httpClient
            .put(
              `${environment.apiUrl}/account/avatar`,
              { avatarPath: avatarPath },
              this.httpOptions
            )
            .subscribe(res => {
              return res;
            });
          return res;
        })
      );
  }
}
