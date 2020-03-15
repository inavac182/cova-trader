import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { HomePageStore } from 'src/models';

export interface HomePageProps {
  homePageStore?: HomePageStore;
}

export const HomePage = inject('homePageStore')(
  observer((props: HomePageProps) => {
    const { homePageStore } = props;
    const { title } = homePageStore;
    const [titleState, setTitle] = React.useState(title);

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
        <h1>{title}</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={titleState} onChange={handleOnChange} required />
          <button type="submit"> Save! </button>
        </form>
      </div>
    );
  })
);
