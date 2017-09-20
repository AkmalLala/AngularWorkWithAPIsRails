import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
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
  headers: Headers;
  options: RequestOptions;
  authorsList: Author[] = [];
  author: Author;
  bookList: Book[] = [];
  submitted: boolean = false; // check if form is submitted
  bookUrl: string = 'http://localhost:3000/api/books';

  BookCoverFile: File;
  @ViewChild('img') BookCover;
  constructor(private http: Http,private BooksService: BooksService, private AuthorsService: AuthorsService) {
    this.headers = new Headers({'Content-Type':'application/json'});
    this.options =  new RequestOptions({headers: this.headers});

    this.newBookForm = new FormGroup({
      book : new FormGroup({
        title: new FormControl(),
        img: new FormControl(),
        synopsis: new FormControl(),
        author_id: new FormControl()
      })
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
  getAuthorInfo(id: number) {
    this.AuthorsService.getAuthor(id)
    .subscribe(author => this.author = author);
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.newBookForm.get('book.img').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }

  clearFile() {
    this.newBookForm.get('img').setValue(null);
    this.BookCover.nativeElement.value = '';
  }

  private extractData(res: Response) {
    let body = res.json();
          return body.data || {};
  }

  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  addBookWithObservable(book: Book): Observable<Book> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.bookUrl, book, options).map(this.extractData).catch(this.handleErrorObservable);
  }
  
  onSubmit = function (book) {
    console.log(book);
    // let Image = this.BookCover.nativeElement;
    // if(Image.files && Image.files[0]){
    //   this.BookCoverFile = Image.files[0];
    // }
    // const ImageFile: File = this.BookCoverFile;
    // book['book']['img'] = ImageFile, ImageFile.name;
    // console.log(book);
    // console.log(book['book']['img']);
    this.addBookWithObservable(book).subscribe(res => console.log(res.json()));
  }
}
