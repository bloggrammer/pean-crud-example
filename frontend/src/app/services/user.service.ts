import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:4000/api';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getItems(): Observable<any> {
    return this.http.get(API_URL + '/items', httpOptions);
  }
  postItems(data: { title: any; description: any; tag: any; dueDate: any; }): Observable<any> {
    return this.http.post(API_URL + '/items',  { 
      title: data.title,
      description: data.description,
      tag: data.tag,
      dueDate: data.dueDate,
    }, httpOptions);
  }
 
  deleteItem(id: number): Observable<any> {
    return this.http.delete(API_URL + '/items/'+id,httpOptions);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(API_URL + '/user', { responseType: 'text' });
  }
  getUser(): Observable<any> {
    return this.http.get(API_URL + '/user/:id', { responseType: 'text' });
  }
}
