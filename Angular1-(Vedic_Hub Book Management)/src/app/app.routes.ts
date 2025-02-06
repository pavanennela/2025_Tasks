import { Routes } from '@angular/router';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookFormComponent } from './books/book-form/book-form.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { ErrorCompComponent } from './error-comp/error-comp.component';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent, data: { activeNav: 'books' } },
  { path: 'add-book', component: BookFormComponent, data: { activeNav: 'add-book' } },
  { path: 'book/:id', component: BookDetailComponent, data: { activeNav: 'book/:id' } },
  { path:'**', component: ErrorCompComponent}
];