import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Book } from './book';

@Injectable()
export class BooksService {
    headers: Headers;
    options: RequestOptions;
    bookList: Book[] = [];
    baseUrl: string = 'http://localhost:3000/api/';

    constructor(private http: Http) {
        this.headers = new Headers({'Content-Type':'application/json'});
        this.options =  new RequestOptions({headers: this.headers});
    }

    getBooksList(): Observable<Book[]> {
        const url = `${this.baseUrl}books`;
        return this.http.get(url)
        .map(Response => Response.json() as Book[]);
    }
    getBook(id: number): Observable<Book> {
        const url = `${this.baseUrl}books/${id}`;
        return this.http.get(url)
        .map(Response => Response.json() as Book);
    }

}