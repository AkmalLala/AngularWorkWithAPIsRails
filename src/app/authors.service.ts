import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Book } from './book.model';

@Injectable()
export class AuthorsService {
    baseUrl: string = 'http://localhost:3000/';

    constructor(private http: Http) { }

    getBooksList(): Observable<Book[]> {
        const url = `${this.baseUrl}api/books`;
        return this.http.get(url)
        .map(Response => Response.json().books as Book[]);
    }
    getBook(id: number): Observable<Book> {
        const url = `${this.baseUrl}api/books/${id}`;
        return this.http.get(url)
        .map(Response => Response.json() as Book);
    }
}