import React from 'react';
import { render, screen } from '@testing-library/react';
import Skeleton from '../Skeleton';

const CHILD = <div data-testid='child'>Child content</div>;

describe('Skeleton', () => {
  it('renders without crashing', () => {
    render(<Skeleton />);
  });

  it('should set data-loading as true when loading', () => {
    render(
      <Skeleton loading={true}>
        {CHILD}
      </Skeleton>
    );
    expect(screen.getByTestId('skeleton')).toHaveAttribute('data-loading', 'true');
  });
});