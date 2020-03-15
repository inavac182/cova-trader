import { observable, action, computed } from 'mobx';
import { StoreDefaults } from '../utils/storeDefaults';
import { Store } from '../utils/store';
import { BooksResponse, Book } from 'src/types/books-response';

export class BooksStore extends Store {
  @observable public books: [Book];
  @observable public loading: boolean;
  @observable public error: boolean;

  @action
  public fetchBooks() {
    fetch('https://api.bitso.com/v3/available_books/')
      .then(res => res.json())
      .then((books: BooksResponse) => {
        if (books.success) {
          this.hydrate({
            books: books.payload,
            loading: false,
          });
        }
      });
  }

  public hydrate(data: StoreDefaults) {
    Object.assign(this, data);
  }
}

BooksStore.DEFAULTS = {
  books: {},
  loading: true,
  error: false,
};
