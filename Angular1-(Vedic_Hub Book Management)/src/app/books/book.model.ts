// src/app/models/book.model.ts
export interface Book {
    id: number;
    title: string;
    author: string;
    publishedDate: string;
    description: string;
    imageUrl: string;
    isNew?: boolean;
  }
  