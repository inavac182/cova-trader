import * as React from 'react';
import { HomePage } from '../../../src/components/';
import { HomePageStore } from '../../../src/stores/home-page.store';
import { TestProvider } from '../../../src/utils/testProvider';

describe ('HomePage', () => {
    const stores = {
      homePageStore: new HomePageStore()
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
      const homePageStore = new HomePageStore({ title: expectedTitle});

      const homePageWrapper = TestProvider({ homePageStore }).mount(<HomePage />);
      const title = homePageWrapper.find('h1');

      expect(title.text()).toBe(expectedTitle);
    });
});

