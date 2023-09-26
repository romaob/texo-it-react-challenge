import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../Pagination';

const PAGINATION_DATA = {
  currentPage: 0,
  pageSize: 10,
  totalItems: 100,
};

const onPageChange = jest.fn();

describe('Pagination tests', () => {
  it('should render the pagination component', () => {
    render(<Pagination {...PAGINATION_DATA} />);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
  it('should render the component in the loading state', () => {
    render(<Pagination {...PAGINATION_DATA} loading />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton')).toHaveAttribute(
      'data-loading',
      'true'
    );
  });

  it('should render the component with the correct pages and buttons', () => {
    render(<Pagination {...PAGINATION_DATA} />);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    //Check the first page, previous page, next page and last page buttons
    expect(
      screen.getByTestId('pagination-first-page-button')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('pagination-previous-page-button')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('pagination-next-page-button')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('pagination-last-page-button')
    ).toBeInTheDocument();

    //Check the page buttons
    for (
      let i = 0;
      i < Math.ceil(PAGINATION_DATA.totalItems / PAGINATION_DATA.pageSize);
      i++
    ) {
      expect(
        screen.getByTestId(`pagination-page-button-${i}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`pagination-page-button-${i}`)
      ).toHaveTextContent((i + 1).toString());
    }
  });

  it('should disable the previews and first page buttons, when in the first page', () => {
    render(<Pagination {...PAGINATION_DATA} />);
    expect(screen.getByTestId('pagination-first-page-button')).toHaveAttribute(
      'data-disabled',
      'true'
    );
    expect(
      screen.getByTestId('pagination-previous-page-button')
    ).toHaveAttribute('data-disabled', 'true');
  });

  it('should disable the next and last page buttons, when in the last page', () => {
    render(
      <Pagination
        {...PAGINATION_DATA}
        currentPage={
          Math.ceil(PAGINATION_DATA.totalItems / PAGINATION_DATA.pageSize) - 1
        }
      />
    );
    expect(screen.getByTestId('pagination-last-page-button')).toHaveAttribute(
      'data-disabled',
      'true'
    );
    expect(screen.getByTestId('pagination-next-page-button')).toHaveAttribute(
      'data-disabled',
      'true'
    );
  });

  it('should enable all buttons when not in the limits', () => {
    render(<Pagination {...PAGINATION_DATA} currentPage={2} />);
    expect(screen.getByTestId('pagination-last-page-button')).toHaveAttribute(
      'data-disabled',
      'false'
    );
    expect(screen.getByTestId('pagination-first-page-button')).toHaveAttribute(
      'data-disabled',
      'false'
    );
    expect(screen.getByTestId('pagination-next-page-button')).toHaveAttribute(
      'data-disabled',
      'false'
    );
    expect(
      screen.getByTestId('pagination-previous-page-button')
    ).toHaveAttribute('data-disabled', 'false');
  });

  it('should not display the pagination when there is only one page', () => {
    render(<Pagination {...PAGINATION_DATA} totalItems={1} />);
    expect(screen.queryByTestId('pagination-content')).not.toBeInTheDocument();
  });

  it('should render the right values and amount of pages when having a limit and the page is 1', () => {
    render(<Pagination {...PAGINATION_DATA} limit={5} />);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-content')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-content-pages')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-0')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-1')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-2')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-3')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-4')).toBeInTheDocument();
    expect(
      screen.queryByTestId('pagination-page-button-5')
    ).not.toBeInTheDocument();
  });

  it('should render the right values and amount of pages when having a limit and the page is in the middle', () => {
    render(<Pagination {...PAGINATION_DATA} limit={5} currentPage={2} />);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-content')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-content-pages')).toBeInTheDocument();
    expect(
      screen.queryByTestId('pagination-page-button-0')
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-1')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-2')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-3')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-4')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-5')).toBeInTheDocument();
    expect(
      screen.queryByTestId('pagination-page-button-6')
    ).not.toBeInTheDocument();
  });

  it('should render the right values and amount of pages when having a limit and the page is near the last', () => {
    render(<Pagination {...PAGINATION_DATA} limit={5} currentPage={8} />);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-content')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-content-pages')).toBeInTheDocument();
    expect(
      screen.queryByTestId('pagination-page-button-4')
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-5')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-6')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-7')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-8')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-9')).toBeInTheDocument();
  });

  it('should render the component correclty when the limit is greater than the amount of pages', () => {
    render(
      <Pagination pageSize={10} totalItems={30} limit={5} currentPage={0} />
    );
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-content')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-content-pages')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-0')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-1')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-button-2')).toBeInTheDocument();
    expect(
      screen.queryByTestId('pagination-page-button-3')
    ).not.toBeInTheDocument();
  });

  it('should onPageChange with the right value when clicking in one of the buttons', () => {
    render(
      <Pagination
        {...PAGINATION_DATA}
        onPageChange={onPageChange}
        currentPage={1}
      />
    );
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    const firstPageButton = screen.getByTestId('pagination-first-page-button');
    const previousPageButton = screen.getByTestId(
      'pagination-previous-page-button'
    );
    const nextPageButton = screen.getByTestId('pagination-next-page-button');
    const lastPageButton = screen.getByTestId('pagination-last-page-button');
    const pageButton = screen.getByTestId('pagination-page-button-3');

    userEvent.click(firstPageButton);
    expect(onPageChange).toHaveBeenCalledWith(0);
    userEvent.click(previousPageButton);
    expect(onPageChange).toHaveBeenCalledWith(0);
    userEvent.click(nextPageButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
    userEvent.click(pageButton);
    expect(onPageChange).toHaveBeenCalledWith(3);
    userEvent.click(lastPageButton);
    expect(onPageChange).toHaveBeenCalledWith(9);
  });
});
