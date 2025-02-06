import { Component } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importing required modules for form handling
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  // Default image to be used if the user doesn't provide one
  defaultImage: string = 'https://www.pngarts.com/files/8/Hardcover-Book-Cover-Transparent-Images.png';

  // Object to hold new book details, initialized with empty values
  newBook: Book = {
    id: 0,
    title: '',
    author: '',
    publishedDate: '',
    description: '',
    imageUrl: ''
  };

  constructor(private bookService: BookService, private router: Router) {} // Injects BookService and Router for book management and navigation

  onSubmit(): void {
    // Checks if the form is valid before submitting
    if (this.isFormValid()) {
      this.newBook.id = Date.now(); // Assigns a unique ID based on timestamp
      if (!this.newBook.imageUrl) {
        this.newBook.imageUrl = this.defaultImage; // Sets a default book image if none is provided
      }
      this.bookService.addBook(this.newBook); // Calls service method to add the new book
      this.resetForm(); // Resets the form after submission
      this.router.navigate(['/books']); // Redirects user to the book list page after submission
    } else {
      alert('Please fill in all required fields.'); // Displays an alert if form validation fails
    }
  }

  // Validates if all required fields are filled
  isFormValid(): boolean {
    return !!(
      this.newBook.title &&
      this.newBook.author &&
      this.newBook.publishedDate &&
      this.newBook.description &&
      this.newBook.imageUrl
    );
  }

  // Handles image file selection and converts it to a base64 string
  onImageSelected(event: any): void {
    const file = event.target.files[0]; // Retrieves the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newBook.imageUrl = reader.result as string; // Sets the selected image as the book's image
      };
      reader.readAsDataURL(file); // Reads the file as a base64 encoded URL
    }
  }

  // Resets the form fields after submission
  resetForm(): void {
    this.newBook = {
      id: 0,
      title: '',
      author: '',
      publishedDate: '',
      description: '',
      imageUrl: ''
    };
  }
}
