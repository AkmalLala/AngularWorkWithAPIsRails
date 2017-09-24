import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorListComponent } from './author/author-list/author-list.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { HomepageComponent } from './homepage/homepage.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',   component: HomepageComponent },
  { path: 'authors',  component: AuthorListComponent },
  { path: 'books',  component: BookListComponent },

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
