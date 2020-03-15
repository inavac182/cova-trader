import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Provider } from 'mobx-react';

import { HomePageStore, BooksStore } from './stores';
import { HomePage } from './components';
import './less/main.less';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  routing: routingStore,
  homePageStore: new HomePageStore(),
  booksStore: new BooksStore(),
};

const history = syncHistoryWithStore(browserHistory, routingStore);

export default function MainRouter() {
  return (
    <Provider {...stores}>
      <Router history={history}>
        <HomePage />
      </Router>
    </Provider>
  );
}

ReactDOM.render(<MainRouter />, document.getElementById('main'));
