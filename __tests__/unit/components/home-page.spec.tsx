import * as React from 'react';
import { HomePage } from '../../../src/components/';
import { HomePageStore } from '../../../src/stores/home-page.store';
import { BooksStore } from '../../../src/stores/books.store';
import { TestProvider } from '../../../src/utils/testProvider';

describe ('HomePage', () => {
    const stores = {
      homePageStore: new HomePageStore(),
      booksStore: new BooksStore({
        fetchBooks: jest.fn()
      })
    };

    it('renders correctly', () => {
      const homepage = TestProvider(stores).render(<HomePage />);
      expect(homepage).toMatchSnapshot();
    });

    it('should hydrate store with new title when submit form', () => {
      const homePageWrapper = TestProvider(stores).mount(<HomePage />);

      stores.homePageStore.hydrate = jest.fn();
      homePageWrapper.find('form').simulate('submit');

      expect(stores.homePageStore.hydrate).toHaveBeenCalled();
    });

    it('should render home page with correct title', () => {
      const expectedTitle = 'My Title';
      const stores = {
        homePageStore: new HomePageStore({
          title: expectedTitle
        }),
        booksStore: new BooksStore({
          fetchBooks: jest.fn()
        })
      };

      const homePageWrapper = TestProvider(stores).mount(<HomePage />);
      const title = homePageWrapper.find('h1');

      expect(title.text()).toBe(expectedTitle);
    });
});

