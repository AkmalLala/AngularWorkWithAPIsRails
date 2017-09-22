import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Book } from './book/book';
import { BooksService } from './book/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  booksList: Book[] = [];
  showRow : boolean = true;
  book: Book;
  newbook = new Book;
  submitted: boolean = false; // check if form is submitted
  baseUrl: string = 'http://localhost:3000';

  constructor(private BooksService: BooksService, fb: FormBuilder) {}

  ngOnInit() {
    let timer = Observable.timer(0, 5000);
    timer.subscribe(() => this.getBooksData());
  }

  getBooksData() {
    this.BooksService.getBooksList()
    .subscribe(books => this.booksList = books);
  }

  getBookInfo(id: number): void {
    this.BooksService.getBook(id).subscribe(book => this.book = book);
  }

  deleteThisBook(id: number): void {
    this.BooksService.deleteBook(id).subscribe(book => this.book = book);
    this.getBooksData();
  }

  showImage(img: string): string {
    return this.baseUrl+img;
  }

}
