import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthorsService } from '../authors.service';
import { BooksService } from '../../book/books.service';

import { Author } from '../author';
import { Book } from '../../book/book';
@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  authorsList: Author[] = [];
  author: Author;
  booksList: Book[] = [];
  book: Book;
  baseUrl: string = 'http://railslibrary.herokuapp.com';

  constructor(private BooksService: BooksService, private AuthorsService: AuthorsService) { }

  ngOnInit() {
    let timer = Observable.timer(0, 5000);
    timer.subscribe(() => this.getAuthorsData());
  }

  getAuthorsData() {
    this.AuthorsService.getAuthorsList()
    .subscribe(authors => this.authorsList = authors);
  }

  getAuthorInfo(id: number): void {
    this.AuthorsService.getAuthor(id).subscribe(author => this.author = author);
  }

  deleteThisAuthor(id: number): void {
    this.AuthorsService.deleteAuthor(id).subscribe(book => this.book = book);
    this.getAuthorsData();
  }
  
  getBooksData() {
    this.BooksService.getBooksList()
    .subscribe(books => this.booksList = books);
  }
  
  showImage(img: string): string {
    return this.baseUrl+img;
  }

}
