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
import { BookListComponent } from './book/book-list/book-list.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { TruncatePipe } from './TruncatePipe.pipe';
import { AuthorNewComponent } from './author/author-new/author-new.component';
import { AuthorEditComponent } from './author/author-edit/author-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    BookNewComponent,
    HomepageComponent,
    BookEditComponent,
    BookListComponent,
    AuthorListComponent,
    TruncatePipe,
    AuthorNewComponent,
    AuthorEditComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    BooksService,
    AuthorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
