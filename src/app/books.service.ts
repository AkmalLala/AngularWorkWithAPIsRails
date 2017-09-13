import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Book } from './book.model';

@Injectable()
export class BooksService {
    baseUrl: string = 'http://localhost:3000';

    constructor(private http: Http) { }

    getBooksList(): Observable<Book[]> {
        const url = `${this.baseUrl}/books.json`;
        return this.http.get(url)
        .map(Response => Response.json() as Book[]);
    }
    getBook(id: number): Observable<Book> {
        const url = `${this.baseUrl}/books/${id}.json`;
        return this.http.get(url)
        .map(Response => Response.json() as Book);
    }
}