import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Book } from '../book';
import { BooksService } from '../books.service';
import { Author } from '../../author/author';
import { AuthorsService } from '../../author/authors.service';

@Component({

  selector: 'app-new-book',
  templateUrl: './book-new.component.html',
})

@Injectable()
export class BookNewComponent implements OnInit {
  newBookForm: FormGroup;
  authorsList: Author[] = [];
  author: Author;
  bookList: Book[] = [];
  submitted: boolean = false; // check if form is submitted
  bookUrl: string = 'http://localhost:3000/api/books';

  @ViewChild('img') BookCover;
  constructor(private http: Http, private formBuilder: FormBuilder, private BooksService: BooksService, private AuthorsService: AuthorsService) {}

  ngOnInit() {
    let timer = Observable.timer(0, 20000);
    timer.subscribe(() => this.getAuthorsData());

    this.newBookForm = this.formBuilder.group({
      book : this.formBuilder.group({
        title: [null, Validators.required],
        img: [],
        synopsis: [null, Validators.required],
        author_id: [null, Validators.required]
      })
    });
  }
  
  getAuthorsData() {
    this.AuthorsService.getAuthorsList()
    .subscribe(authors => this.authorsList = authors);
  }
  
  getAuthorInfo(id: number) {
    this.AuthorsService.getAuthor(id)
    .subscribe(author => this.author = author);
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.newBookForm.get('book.img').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('book[title]', this.newBookForm.get('book.title').value);
    if(this.newBookForm.get('book.img').value){
      input.append('book[img]', this.newBookForm.get('book.img').value);
    }
    input.append('book[synopsis]', this.newBookForm.get('book.synopsis').value);
    input.append('book[author_id]', this.newBookForm.get('book.author_id').value);
    return input;
  }

  clearFile() {
    this.newBookForm.get('book[img]').setValue(null);
    this.BookCover.nativeElement.value = '';
  }
  
  onSubmit = function () {
    const value = this.prepareSave();
    this.BooksService.addBook(value).subscribe(res => console.log(res.json()));
    this.newBookForm.reset();
  }
}
