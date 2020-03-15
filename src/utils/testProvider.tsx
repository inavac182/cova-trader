// tslint:disable:no-implicit-dependencies
import { mount, render, shallow } from 'enzyme';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { MemoryRouter } from 'react-router';

export const TestProvider = mockStores => {
  const observableStores = mockStores;
  const wrapper = jsx => (
    <Provider {...observableStores}>
      <MemoryRouter>{jsx}</MemoryRouter>
    </Provider>
  );

  return {
    render: c => render(wrapper(c)),
    mount: c => mount(wrapper(c)),
    shallow: c => shallow(wrapper(c)),
  };
};
