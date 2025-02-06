import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book?: Book;  // Receives book details from the parent component

  @Output() bookDeleted = new EventEmitter<number>(); // Emits event when a book is deleted
  @Output() backToHome = new EventEmitter<void>(); // Emits event to navigate back to the book list

  loading: boolean = true; // Controls loading state while fetching data

  constructor(private bookService: BookService) {} // Injects BookService to manage book data

  ngOnInit(): void {
    // Simulates a loading effect for 1 second before displaying the book details
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onDeleteBook(): void {
    // Checks if the book is newly added before allowing deletion
    if (this.book?.isNew) {
      this.bookService.deleteBook(this.book.id); // Calls the service to delete the book
      this.bookDeleted.emit(this.book.id); // Notifies the parent component about the deleted book
    }
  }

  navigateToHome(): void {
    this.backToHome.emit(); // Emits an event to navigate back to the book list view
  }
} 
