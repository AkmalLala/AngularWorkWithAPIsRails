import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Book } from './book.model';
import { BooksService } from './books.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  booksList: Book[] = [];
  book: Book;

  constructor(private BooksService: BooksService) { }
    ngOnInit() {
    this.getBooksData();
  }

  getBooksData() {
    this.BooksService.getBooksList()
    .subscribe(books => this.booksList = books);
  }
  getBookInfo(id: number) {
    this.BooksService.getBook(id)
    .subscribe(book => this.book = book);
  }

  showImage(img: string): string {
    return "http://railslibrary.herokuapp.com/"+img;
  }

}
