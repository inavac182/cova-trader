import { observable, action, computed } from 'mobx';
import { StoreDefaults } from '../utils/storeDefaults';
import { Store } from '../utils/store';
import { BooksResponse, Book } from 'src/types';

export class BooksStore extends Store {
  @observable public books: [Book];
  @observable public loading: boolean;
  @observable public error: boolean;

  @action
  public fetchBooks(selectedBook: string, callback?: (book: string) => void) {
    fetch('https://api.bitso.com/v3/available_books/')
      .then(res => res.json())
      .then((books: BooksResponse) => {
        if (books.success) {
          const filteredBooks = books.payload.filter((bookObj: Book) => {
            return bookObj.book.includes('mxn');
          });

          this.hydrate({
            books: filteredBooks,
            loading: false,
          });

          if (callback) {
            const filterBook = this.books.filter((book: Book) => {
              return book.book === selectedBook;
            });

            selectedBook = filterBook.length > 0 ? filterBook[0].book : this.books[0].book;
            callback(selectedBook);
          }
        }
      });
  }

  public hydrate(data: StoreDefaults) {
    Object.assign(this, data);
  }
}

BooksStore.DEFAULTS = {
  books: [],
  loading: true,
  error: false,
};
