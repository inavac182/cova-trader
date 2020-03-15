import React from 'react';
import { Book } from 'src/types/books-response';

export interface BooksProps {
  book: Book;
}

export const BooksData = (props: BooksProps) => {
  const { book } = props;

  return (
    <div className="books">
      <p>{`Book: ${book.book}`}</p>
    </div>
  );
};
