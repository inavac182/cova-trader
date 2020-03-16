import React from 'react';
import { RouterStore } from 'mobx-react-router';

import { Book } from 'src/types/books-types';
import { TickerStore } from 'src/stores/ticker.store';
import { inject } from 'mobx-react';
import { OrdersStore } from 'src/stores/orders.store';

export interface BooksProps {
  tradingBook: Book;
  tickerStore?: TickerStore;
  ordersStore?: OrdersStore;
  routing?: RouterStore;
}

export const BooksData = inject(
  'tickerStore',
  'routing'
)((props: BooksProps) => {
  const { tradingBook, routing } = props;
  const { push } = routing;
  const bookName = tradingBook.book;

  const handleOnClick = () => {
    /* Ticker Endpoint failing with CORS - Support ticker raised*/
    //tickerStore.fetchTicker(bookName);
    push(`/${tradingBook.book}/`);
  };

  return (
    <div className="books">
      <p>
        Book: <button onClick={handleOnClick}>{tradingBook.book}</button>
      </p>
    </div>
  );
});
