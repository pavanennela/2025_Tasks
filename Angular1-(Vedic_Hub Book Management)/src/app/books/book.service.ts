import { Injectable } from '@angular/core';
import { MockBooks } from '../../assets/mock-books'; // Importing mock book data from assets
import { Book } from './book.model'; // Importing Book model for type safety

@Injectable({
  providedIn: 'root', // Makes this service available application-wide
})
export class BookService {
  private books: Book[] = [...MockBooks]; // Stores predefined book data from mock-books file
  private newBooks: Book[] = []; // Stores books added by users dynamically

  constructor() {
    this.loadNewBooksFromStorage(); // Loads previously added books from LocalStorage when the service is initialized
  }

  // Returns the list of books from the mock data
  getBooks(): Book[] {
    return this.books;
  }

  // Returns the list of newly added books
  getNewBooks(): Book[] {
    return this.newBooks;
  }

  // Finds and returns a book by its ID, searching in both predefined and new books
  getBookById(id: number): Book | undefined {
    return [...this.books, ...this.newBooks].find((book) => book.id === id);
  }

  // Adds a new book to the list of newBooks and saves it to LocalStorage
  addBook(newBook: Book): void {
    newBook.isNew = true; // Marks the book as newly added
    this.newBooks.push(newBook); // Adds the new book to the list
    this.saveNewBooksToStorage(); // Saves the updated book list to LocalStorage
  }

  // Deletes a book from newBooks and updates LocalStorage
  deleteBook(id: number): void {
    this.newBooks = this.newBooks.filter((book) => book.id !== id); // Removes the book by filtering out its ID
    this.saveNewBooksToStorage(); // Updates LocalStorage to reflect the change
  }

  // Saves the newBooks array to LocalStorage
  private saveNewBooksToStorage(): void {
    localStorage.setItem('newBooks', JSON.stringify(this.newBooks));
  }

  // Loads new books from LocalStorage when the app starts
  private loadNewBooksFromStorage(): void {
    const storedBooks = localStorage.getItem('newBooks'); // Retrieves stored books
    if (storedBooks) {
      this.newBooks = JSON.parse(storedBooks); // Parses and assigns the stored books to newBooks array
    }
  }
}
