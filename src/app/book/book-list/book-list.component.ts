import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Book } from '../book';
import { BooksService } from '../books.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  booksList: Book[] = [];
  book: Book;
  newbook = new Book;
  baseUrl: string = 'http://railslibrary.herokuapp.com';

  constructor(private BooksService: BooksService) {}

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
