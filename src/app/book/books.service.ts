import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Book } from './book';

@Injectable()
export class BooksService {
    baseUrl: string = 'http://railslibrary.herokuapp.com/api/books';

    constructor(private http: Http) {
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
    
    private extractData(res: Response) {
        let body = res.json();
                return body.data || {};
        }
    
    private handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
    
}