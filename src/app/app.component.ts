import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

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
      let timer = Observable.timer(0, 5000);
      timer.subscribe(() => this.getBooksData());
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
    return this.BooksService.baseUrl+img;
  }

}
