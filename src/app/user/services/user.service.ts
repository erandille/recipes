import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../user';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/users/${userId}`, this.httpOptions);
  }

  getUsers(page: number, limit: number): Observable<object> {
    return this.httpClient.get(`${environment.apiUrl}/users?page=${page}&limit=${limit}`, this.httpOptions);
  }

  getUserRecipes(userId: number, page: number, limit: number): Observable<object> {
    return this.httpClient.get(`${environment.apiUrl}/users/${userId}/recipes?page=${page}&limit=${limit}`, this.httpOptions);
  }
}
