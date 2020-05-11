// external
import React from 'react';
import { render } from '@testing-library/react';

// internal
import Loading from '../src/components/Loading';

describe('Loading Component', () => {
  it('should render standard loading', () => {
    const { container } = render(
      <Loading message="waiting...">Jest Unit Test</Loading>
    );

    expect(container.innerHTML).toMatchSnapshot();
  });
});
