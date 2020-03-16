import React from 'react';
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

    return (
      <section className="books">
        {booksStore.loading && <p>Loading books....</p>}
        {books && books.map((book: Book, key: number) => <BooksData key={key} tradingBook={book} />)}
        <div className="clearer"></div>
      </section>
    );
  })
);
