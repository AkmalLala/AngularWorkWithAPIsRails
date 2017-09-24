import { Component, Input, OnInit, OnChanges, Injectable, ViewChild, ElementRef } from '@angular/core';
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
  defaultCover: string = 'http://www.janklowandnesbit.co.uk/sites/default/files/imagecache/large/imagefield_default_images/default_book_cover.jpg';
  baseUrl: string = 'http://railslibrary.herokuapp.com';
  FakeUrl: string;

  @ViewChild('img') BookCover: ElementRef;
  constructor(private http: Http, private formBuilder: FormBuilder, private BooksService: BooksService, private AuthorsService: AuthorsService) {}

  ngOnChanges() {
    this.FakeUrl = this.oneBook.cover_url['medium'] ? this.baseUrl+this.oneBook.cover_url['medium'] : this.defaultCover;
    
    this.editBookForm = this.formBuilder.group({
        id: [this.oneBook ? this.oneBook.id : null, Validators.required],
        title: [this.oneBook ? this.oneBook.title : null, Validators.required],
        img: null,
        synopsis: [this.oneBook ? this.oneBook.synopsis : null, Validators.required],
        author_id: [this.oneBook ? this.oneBook.author_id : null, Validators.required]
    });
  }

  ngOnInit() {
    let timer = Observable.timer(0, 20000);
    timer.subscribe(() => this.getAuthorsData());
  }
  
  getAuthorsData() {
    this.AuthorsService.getAuthorsList()
                      .subscribe(authors => this.authorsList = authors);
  }

  onFileChange(event) {
    let fileInput = this.BookCover.nativeElement;

    if(fileInput.files.length > 0) {
      let reader = new FileReader();
      
      reader.onloadend = (fileInput) => {
        this.FakeUrl = reader.result;
      }

      reader.readAsDataURL(fileInput.files[0]);

      let file = fileInput.files[0];
      this.editBookForm.get('img').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('book[title]', this.editBookForm.get('title').value);
    if(this.editBookForm.get('img').value){
      input.append('book[img]', this.editBookForm.get('img').value);
    }
    input.append('book[synopsis]', this.editBookForm.get('synopsis').value);
    input.append('book[author_id]', this.editBookForm.get('author_id').value);
    input.append('id', this.editBookForm.get('id').value);
    return input;
  }

  onSubmit = function () {
    const value = this.prepareSave();
    const id = this.editBookForm.get('id').value;
    this.BooksService.editBook(value,id).subscribe(res => console.log(res.json()));
    this.editBookForm.reset();
  }
}
