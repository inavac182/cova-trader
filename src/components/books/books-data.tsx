import React from 'react';
import { Book } from 'src/types/books-types';
import { TickerStore } from 'src/stores/ticker.store';
import { inject } from 'mobx-react';

export interface BooksProps {
  tradingBook: Book;
  tickerStore?: TickerStore;
}

export const BooksData = inject('tickerStore')((props: BooksProps) => {
  const { tradingBook, tickerStore } = props;
  const bookName = tradingBook.book;

  const handleOnClick = () => {
    tickerStore.fetchTicker(bookName);
  };

  return (
    <div className="books">
      <p>
        Book: <button onClick={handleOnClick}>{tradingBook.book}</button>
      </p>
    </div>
  );
});
