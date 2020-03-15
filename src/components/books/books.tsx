import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { BooksStore } from 'src/stores';
import { Book } from 'src/types';
import { BooksData } from './books-data';

export interface BooksProps {
  booksStore?: BooksStore;
}

export const Books = inject('booksStore')(
  observer((props: BooksProps) => {
    const { booksStore } = props;
    const { books } = booksStore;

    useEffect(() => {
      booksStore.fetchBooks();
    }, []);

    return (
      <div className="books">
        {booksStore.loading ? (
          <p>Loading books....</p>
        ) : (
          books.map((book: Book, key: number) => <BooksData key={key} tradingBook={book} />)
        )}
      </div>
    );
  })
);
