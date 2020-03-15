import { observable, action, computed } from 'mobx';
import { StoreDefaults } from '../utils/storeDefaults';
import { Store } from '../utils/store';
import { TickerResponse, Ticker, Book } from 'src/types';

export class TickerStore extends Store {
  @observable public tickers: [Ticker];
  @observable public book: Book;
  @observable public loading: boolean;
  @observable public error: boolean;

  @action
  public fetchTicker(book: string) {
    fetch(`https://api.bitso.com/v3/ticker/?book=${book}`)
      .then(res => res.json())
      .then((books: TickerResponse) => {
        if (books.success) {
          this.hydrate({
            books: books.payload,
            loading: false,
          });
        }
      })
      .catch(res => {
        console.log('Err: ', res);
      });
  }

  public hydrate(data: StoreDefaults) {
    Object.assign(this, data);
  }
}

TickerStore.DEFAULTS = {
  books: {},
  loading: true,
  error: false,
};
