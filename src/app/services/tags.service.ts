import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Tags } from '../models/tag.model';
import { ParseKey } from 'src/keys/parse.interface';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  customersObservable: Observable<Tags[]>;

  constructor(
    private http: HttpClient
  ) {
    Parse.initialize(ParseKey.appId, ParseKey.javascript);
    Parse.serverURL = ParseKey.serverURL;
  }

  public getAllTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>('https://notouchtags-api.herokuapp.com/tags')
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  public getTags(): Observable<any> {
    const Tags = Parse.Object.extend('Tags');
    const query = new Parse.Query(Tags);
    return query.find().pipe(
      map(res => {
        return res;
      })
    );
  }

  public getQuery(ownerEmail: string): Observable<Tags[]> {
    return this.http.get<Tags[]>('https://notouchtags-api.herokuapp.com/tags/' + ownerEmail);
  }
}
