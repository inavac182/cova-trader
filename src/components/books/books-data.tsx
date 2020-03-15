import React from 'react';
import { Book } from 'src/types/books-types';
import { TickerStore } from 'src/stores/ticker.store';
import { inject } from 'mobx-react';
import { OrdersStore } from 'src/stores/orders.store';

export interface BooksProps {
  tradingBook: Book;
  tickerStore?: TickerStore;
  ordersStore?: OrdersStore;
}

export const BooksData = inject(
  'tickerStore',
  'ordersStore'
)((props: BooksProps) => {
  const { tradingBook, tickerStore, ordersStore } = props;
  const bookName = tradingBook.book;

  const handleOnClick = () => {
    /* Ticker Endpoint failing with CORS - Support ticker raised*/
    //tickerStore.fetchTicker(bookName);

    ordersStore.fetchOrders(bookName);
  };

  return (
    <div className="books">
      <p>
        Book: <button onClick={handleOnClick}>{tradingBook.book}</button>
      </p>
    </div>
  );
});
