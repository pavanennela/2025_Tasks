import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from '../book-detail/book-detail.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookDetailComponent], // Import BookDetailComponent for displaying book details
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = []; // Stores the list of all books
  newBooks: Book[] = []; // Stores newly added books
  selectedBook?: Book; // Stores the selected book to display its details

  constructor(private bookService: BookService) {} // Injects BookService to manage book data

  ngOnInit(): void {
    this.loadBooks(); // Fetches book data when the component initializes
  }

  // Loads all books and new books from the service
  loadBooks(): void {
    this.books = this.bookService.getBooks(); // Retrieves all books from the service
    this.newBooks = this.bookService.getNewBooks(); // Retrieves only new books
  }

  // Handles book selection to display its details
  onSelectBook(book: Book): void {
    this.selectedBook = book; // Assigns the selected book, replacing the list view
  }

  // Handles navigation back to the book list
  onBackToHome(): void {
    this.selectedBook = undefined; // Clears the selected book, showing the book list again
  }

  // Handles book deletion and updates the new books list
  onBookDeleted(bookId: number): void {
    this.newBooks = this.newBooks.filter((book) => book.id !== bookId); // Removes the deleted book from the list
    this.selectedBook = undefined; // Clears the selected book after deletion, returning to the list view
  }
}
