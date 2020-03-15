import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { HomePageStore } from 'src/stores';
import { Books } from './books';
import { Orders } from './orders';

export interface HomePageProps {
  homePageStore?: HomePageStore;
}

export const HomePage = inject('homePageStore')(
  observer((props: HomePageProps) => {
    const { homePageStore } = props;
    const { title } = homePageStore;

    return (
      <div className="page">
        <h1>{title}</h1>
        <Books />
        <Orders />
      </div>
    );
  })
);
