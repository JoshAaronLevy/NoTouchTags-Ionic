import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Tags } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  customersObservable: Observable<Tags[]>;

  constructor(
    private http: HttpClient
  ) { }

  public getAllTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>('https://notouchtags-api.herokuapp.com/tags')
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  public getQuery(ownerEmail: string): Observable<Tags[]> {
    return this.http.get<Tags[]>('https://notouchtags-api.herokuapp.com/tags/' + ownerEmail);
  }
}
