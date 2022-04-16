import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:4000/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getItems(): Observable<any> {
    return this.http.get(API_URL + '/items', { responseType: 'text' });
  }
  postItems(): Observable<any> {
    return this.http.get(API_URL + '/items',  { responseType: 'text' });
  }
  deleteItem(): Observable<any> {
    return this.http.get(API_URL + '/items/:id', { responseType: 'text' });
  }
  getAllUsers(): Observable<any> {
    return this.http.get(API_URL + '/user', { responseType: 'text' });
  }
  getUser(): Observable<any> {
    return this.http.get(API_URL + '/user/:id', { responseType: 'text' });
  }
}
