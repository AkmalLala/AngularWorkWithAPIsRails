import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BookNewComponent } from './book/book-new/book-new.component';
import { BookEditComponent } from './book/book-edit/book-edit.component';
import { BooksService } from './book/books.service';
import { AuthorsService } from './author/authors.service';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    BookNewComponent,
    HomepageComponent,
    BookEditComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    BooksService,
    AuthorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
