import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';

import { HomePageStore, BooksStore } from 'src/stores';
import { Books } from './books';
import { Orders } from './orders';
import { MatchProps } from 'src/types';

export interface HomePageProps {
  homePageStore?: HomePageStore;
  routing?: RouterStore;
  booksStore?: BooksStore;
  match: MatchProps;
}

const LoadedPage = () => {
  return (
    <>
      <Books />
      <Orders />
    </>
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
