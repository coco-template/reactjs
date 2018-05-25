// external
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// internal
import { Text } from '../src/components';

describe('Text Component', () => {
  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it('should render standard primary text', () => {
    const wrapper = shallow(<Text theme="primary">Jest Unit Test</Text>);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should accept align props', () => {
    const wrapper = shallow(
      <Text theme="primary" align="center">
        Jest Unit Test
      </Text>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should accept transform props', () => {
    const wrapper = shallow(
      <Text theme="primary" transform="uppercase">
        Jest Unit Test
      </Text>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });
});
