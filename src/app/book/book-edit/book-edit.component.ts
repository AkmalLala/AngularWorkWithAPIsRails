import { Component, Input, OnInit, Injectable, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Book } from '../book';
import { BooksService } from '../books.service';
import { Author } from '../../author/author';
import { AuthorsService } from '../../author/authors.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  @Input() oneBook: Book;
  editBookForm: FormGroup;
  authorsList: Author[] = [];
  author: Author;
  bookList: Book[] = [];
  bookUrl: string = 'http://localhost:3000/api/books';
  
  constructor(private http: Http, private formBuilder: FormBuilder, private BooksService: BooksService, private AuthorsService: AuthorsService) {}

  ngOnInit() {
    let timer = Observable.timer(0, 20000);
    timer.subscribe(() => this.getAuthorsData());

    this.editBookForm = this.formBuilder.group({
      book : this.formBuilder.group({
        id: [this.oneBook ? this.oneBook.id : null, Validators.required],
        title: [this.oneBook ? this.oneBook.title : null, Validators.required],
        img: [],
        synopsis: [this.oneBook ? this.oneBook.synopsis : null, Validators.required],
        author_id: [this.oneBook ? this.oneBook.author_id : null, Validators.required]
      })
    });
  }
  
  getAuthorsData() {
    this.AuthorsService.getAuthorsList()
    .subscribe(authors => this.authorsList = authors);
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.editBookForm.get('book.img').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('book[title]', this.editBookForm.get('book.title').value);
    if(this.editBookForm.get('book.img').value){
      input.append('book[img]', this.editBookForm.get('book.img').value);
    }
    input.append('book[synopsis]', this.editBookForm.get('book.synopsis').value);
    input.append('book[author_id]', this.editBookForm.get('book.author_id').value);
    input.append('id', this.editBookForm.get('book.id').value);
    return input;
  }

  onSubmit = function () {
    const value = this.prepareSave();
    const id = this.editBookForm.get('book.id').value;
    this.BooksService.editBook(value,id).subscribe(res => console.log(res.json()));
    this.editBookForm.reset();
  }
}
