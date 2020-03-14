import * as React from 'react';
import { shallow } from 'enzyme';

import { HomePage } from '../../../src/components/';

describe ('HomePage', () => {
    it('renders correctly', () => {
        const homepage = shallow(<HomePage />);
      
        expect(homepage).toMatchSnapshot();
      });
});

