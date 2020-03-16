import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { RouteComponentProps } from 'react-router';

import { HomePageStore, BooksStore } from 'src/stores';
import { Books } from './books';
import { Orders } from './orders';

export interface HomePageProps {
  homePageStore?: HomePageStore;
  routing?: RouterStore;
  booksStore?: BooksStore;
  match: MatchProps;
}

interface MatchParams {
  name: string;
}

interface ParamsObj {
  book?: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
  params: ParamsObj;
}

const LoadedPage = () => {
  return (
    <div>
      <Books />
      <Orders />
    </div>
  );
};

const LoadingPage = () => {
  return <p>Loading....</p>;
};

export const HomePage = inject(
  'homePageStore',
  'routing',
  'booksStore'
)(
  observer((props: HomePageProps) => {
    const { homePageStore, booksStore, match } = props;
    const { title } = homePageStore;
    const { params } = match;
    let bookSelected = '';

    if (params && params.book) {
      bookSelected = params.book;
    }

    useEffect(() => {
      booksStore.fetchBooks(bookSelected, (book: string) => {
        homePageStore.hydrate({
          bookSelected: book,
          loading: false,
        });
      });
    }, []);

    useEffect(() => {
      homePageStore.hydrate({
        bookSelected,
      });
    }, [bookSelected]);

    return (
      <div className="page">
        <h1>{title}</h1>
        {homePageStore.loading ? <LoadingPage /> : <LoadedPage />}
      </div>
    );
  })
);
