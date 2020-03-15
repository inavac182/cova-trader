import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { HomePageStore } from 'src/stores';
import { Books } from './books';

export interface HomePageProps {
  homePageStore?: HomePageStore;
}

export const HomePage = inject('homePageStore')(
  observer((props: HomePageProps) => {
    const { homePageStore } = props;
    const { title } = homePageStore;
    const [titleState, setTitle] = useState(title);

    const handleOnChange = e => {
      setTitle(e.target.value);
    };

    const handleSubmit = e => {
      homePageStore.hydrate({
        title: titleState,
      });

      e.preventDefault();
    };

    return (
      <div className="page">
        <p>vvvvvvv ======== TEST HELLO WORLD frame ========= vvvvv</p>
        <h1>{title}</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={titleState} onChange={handleOnChange} required />
          <button type="submit"> Save! </button>
        </form>
        <p>vvvvvvv ======== App frame ========= vvvvv</p>
        <Books />
      </div>
    );
  })
);
