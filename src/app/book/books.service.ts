import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Book } from './book';

@Injectable()
export class BooksService {
    headers: Headers;
    options: RequestOptions;
    bookList: Book[] = [];
    baseUrl: string = 'http://localhost:3000/api/books';

    constructor(private http: Http) {
        this.headers = new Headers({'Content-Type':'application/json'});
        this.options =  new RequestOptions({headers: this.headers});
    }

    private extractData(res: Response) {
        let body = res.json();
              return body.data || {};
      }
    
    private handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
    
    getBooksList(): Observable<Book[]> {
        const url = `${this.baseUrl}`;
        return this.http.get(url)
        .map(Response => Response.json() as Book[]);
    }

    getBook(id: number): Observable<Book> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
        .map(Response => Response.json() as Book);
    }

    addBook(book: Book): Observable<Book> {
        return this.http.post(`${this.baseUrl}`, book)
                        .map(this.extractData)
                        .catch(this.handleErrorObservable);
    }

    editBook(book: Book,id): Observable<Book> {
        console.log(book);
        return this.http.put(`${this.baseUrl}/${id}`, book)
                        .map(this.extractData)
                        .catch(this.handleErrorObservable);
    }
    
    deleteBook(id: number): Observable<Book> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url)
                        .map(this.extractData)
                        .catch(this.handleErrorObservable);
    }
    
}