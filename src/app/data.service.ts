import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  getSelectedUsers(id) {
    return this.http.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
  }
}
