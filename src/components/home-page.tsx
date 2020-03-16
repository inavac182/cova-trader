import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';

import { HomePageStore, BooksStore } from 'src/stores';
import { Books } from './books';
import { Orders, Title } from './orders';
import { MatchProps } from 'src/types';

interface HomePageProps {
  homePageStore?: HomePageStore;
  routing?: RouterStore;
  booksStore?: BooksStore;
  match: MatchProps;
}

interface LoadedPageProps {
  title: string;
}

const LoadedPage = (props: LoadedPageProps) => {
  return (
    <section className="dashboard">
      <section className="orders">
        <Title title={props.title} />
        <Orders />
      </section>
      <section className="graph">
        <Books />
      </section>
      <div className="clearer"></div>
    </section>
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

    return <>{homePageStore.loading ? <LoadingPage /> : <LoadedPage title={title} />}</>;
  })
);
