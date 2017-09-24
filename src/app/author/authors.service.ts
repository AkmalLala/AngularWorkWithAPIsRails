import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Author } from './author';

@Injectable()
export class AuthorsService {
    baseUrl: string = 'http://railslibrary.herokuapp.com/api/authors';

    constructor(private http: Http) { }

    getAuthorsList(): Observable<Author[]> {
        const url = `${this.baseUrl}`;
        return this.http.get(url)
                        .map(Response => Response.json() as Author[]);
    }

    getAuthor(id: number): Observable<Author> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
                        .map(Response => Response.json() as Author);
    }

    addAuthor(author: Author): Observable<Author> {
        return this.http.post(`${this.baseUrl}`, author)
                        .map(this.extractData)
                        .catch(this.handleErrorObservable);
    }

    editAuthor(author: Author,id): Observable<Author> {
        console.log(author);
        return this.http.put(`${this.baseUrl}/${id}`, author)
                        .map(this.extractData)
                        .catch(this.handleErrorObservable);
    }

    deleteAuthor(id: number): Observable<Author> {
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