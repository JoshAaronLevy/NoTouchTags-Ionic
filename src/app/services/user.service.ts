import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  // public getQuery(username: string, password: string): Observable<User> {
  //   return this.http.get<User>('https://notouchtags-api.herokuapp.com/login/', username, password);
  // }
}
