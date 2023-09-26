import React from 'react';
import { act, render, screen } from '@testing-library/react';
import PageWrapper from '../PageWrapper';
import { strings } from '../../values/strings';
import { ROUTES } from '../../values/routes';

const TEST_TITLE = 'Test Title';
const CHILD = <div>Child 1</div>;

describe('PageWrapper tests', () => {
  it('should render the component correctly crashing', () => {
    render(<PageWrapper title={TEST_TITLE}>{CHILD}</PageWrapper>);
    expect(screen.getByTestId('page-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('page-wrapper-app-name')).toBeInTheDocument();
    expect(screen.getByTestId('page-wrapper-app-name')).toHaveTextContent(
      strings.appName
    );
    expect(screen.getByTestId('page-wrapper-menu')).toBeInTheDocument();

    //Testing if the menu contains all the routes
    Object.values(ROUTES).forEach((route) => {
      expect(screen.getByText(route.name)).toBeInTheDocument();
    });

    expect(screen.getByTestId('page-wrapper-title')).toBeInTheDocument();
    expect(screen.getByTestId('page-wrapper-title')).toHaveTextContent(
      TEST_TITLE
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
  });

  it('should toggle the data-show attribute on the toggle menu button', () => {
    render(<PageWrapper title={TEST_TITLE}>{CHILD}</PageWrapper>);
    expect(screen.getByTestId('page-wrapper-header-button')).toHaveAttribute(
      'data-show',
      'false'
    );
    act(() => {
      screen.getByTestId('toggle-menu').click();
    });
    expect(screen.getByTestId('page-wrapper-header-button')).toHaveAttribute(
      'data-show',
      'true'
    );
    act(() => {
      screen.getByTestId('toggle-menu').click();
    });
    expect(screen.getByTestId('page-wrapper-header-button')).toHaveAttribute(
      'data-show',
      'false'
    );
  });
});
