import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Author } from './author';

@Injectable()
export class AuthorsService {
    baseUrl: string = 'http://localhost:3000/';

    constructor(private http: Http) { }

    getAuthorsList(): Observable<Author[]> {
        const url = `${this.baseUrl}api/authors`;
        return this.http.get(url)
        .map(Response => Response.json() as Author[]);
    }
    getAuthor(id: number): Observable<Author> {
        const url = `${this.baseUrl}api/authors/${id}`;
        return this.http.get(url)
        .map(Response => Response.json() as Author);
    }
}