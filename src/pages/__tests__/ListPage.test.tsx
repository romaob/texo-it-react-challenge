import { fireEvent, render, screen } from '@testing-library/react';
import ListPage from '../ListPage';
import userEvent from '@testing-library/user-event';

//Mocking the hooks
jest.mock('../../hooks/useMovies', () => ({
  useMovies: jest.fn(() => ({
    loading: false,
    error: null,
    response: {},
    yearFilter: undefined,
    setPage: jest.fn(),
    setWinner: jest.fn(),
    setYear: jest.fn(),
  })),
}));

describe('ListPage tests', () => {
  it('should render the page correctly', () => {
    render(<ListPage />);
    expect(screen.getByTestId('listpage')).toBeInTheDocument();
    expect(screen.getByTestId('table-movies')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('should call the hook', () => {
    render(<ListPage />);
    expect(require('../../hooks/useMovies').useMovies).toHaveBeenCalled();
  });

  it('should call the hook setYear, and reseting the page after typing a year and confirming it', async () => {
    const setYearHandler = jest.fn();
    const setPageHandler = jest.fn();
    const state_spy = jest.spyOn(require('../../hooks/useMovies'), 'useMovies');
    state_spy.mockReturnValue({
      setYear: setYearHandler,
      setPage: setPageHandler,
      loading: false,
    });
    render(<ListPage />);
    expect(screen.getByTestId('table-movies')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter-year-show')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('button-filter-year-show'));
    expect(
      screen.getByTestId('button-filter-year-confirm')
    ).toBeInTheDocument();
    expect(screen.getByTestId('input-filter-year')).toBeInTheDocument();
    const input = screen.getByRole('spinbutton');
    userEvent.type(input, '1980');
    fireEvent.click(screen.getByTestId('button-filter-year-confirm'));
    expect(setYearHandler).toHaveBeenCalledWith(1980);
    expect(setPageHandler).toHaveBeenCalledWith(0);
  });

  it('should call the hook without year, and reseting the page filter after confirming without any text on the input', async () => {
    const setYearHandler = jest.fn();
    const setPageHandler = jest.fn();
    const state_spy = jest.spyOn(require('../../hooks/useMovies'), 'useMovies');
    state_spy.mockReturnValue({
      setYear: setYearHandler,
      setPage: setPageHandler,
      loading: false,
    });
    render(<ListPage />);
    expect(screen.getByTestId('table-movies')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter-year-show')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('button-filter-year-show'));
    expect(
      screen.getByTestId('button-filter-year-confirm')
    ).toBeInTheDocument();
    expect(screen.getByTestId('input-filter-year')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('button-filter-year-confirm'));
    expect(setYearHandler).toHaveBeenCalledWith(undefined);
    expect(setPageHandler).toHaveBeenCalledWith(0);
  });

  it('should show a alert message when the year is not valid', async () => {
    const setYearHandler = jest.fn();
    global.alert = jest.fn();
    const state_spy = jest.spyOn(require('../../hooks/useMovies'), 'useMovies');
    state_spy.mockReturnValue({
      setYear: setYearHandler,
      setPage: jest.fn(),
      loading: false,
    });
    render(<ListPage />);
    expect(screen.getByTestId('table-movies')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter-year-show')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('button-filter-year-show'));
    expect(
      screen.getByTestId('button-filter-year-confirm')
    ).toBeInTheDocument();
    expect(screen.getByTestId('input-filter-year')).toBeInTheDocument();
    const input = screen.getByRole('spinbutton');
    userEvent.type(input, 'abc');
    fireEvent.click(screen.getByTestId('button-filter-year-confirm'));
    expect(setYearHandler).toHaveBeenCalledWith(undefined);
  });

  it('should render call the hook setWinner, and reseting the page after clicking the win/lose filter button', async () => {
    const setWinnerHandler = jest.fn();
    const setPageHandler = jest.fn();
    const state_spy = jest.spyOn(require('../../hooks/useMovies'), 'useMovies');
    state_spy.mockReturnValue({
      setWinner: setWinnerHandler,
      setPage: setPageHandler,
      loading: false,
    });
    render(<ListPage />);
    expect(screen.getByTestId('table-movies')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter-winners')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter-loosers')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter-winners')).toHaveAttribute(
      'data-toggled',
      'false'
    );
    expect(screen.getByTestId('button-filter-loosers')).toHaveAttribute(
      'data-toggled',
      'false'
    );
    fireEvent.click(screen.getByTestId('button-filter-winners'));
    expect(screen.getByTestId('button-filter-winners')).toHaveAttribute(
      'data-toggled',
      'true'
    );
    expect(screen.getByTestId('button-filter-loosers')).toHaveAttribute(
      'data-toggled',
      'false'
    );
    expect(setWinnerHandler).toHaveBeenCalledWith(false);
    expect(setPageHandler).toHaveBeenCalledWith(0);
    fireEvent.click(screen.getByTestId('button-filter-winners'));
    expect(screen.getByTestId('button-filter-winners')).toHaveAttribute(
      'data-toggled',
      'false'
    );
    expect(screen.getByTestId('button-filter-loosers')).toHaveAttribute(
      'data-toggled',
      'false'
    );
    expect(setWinnerHandler).toHaveBeenCalledWith(undefined);
    fireEvent.click(screen.getByTestId('button-filter-loosers'));
    expect(setPageHandler).toHaveBeenCalledWith(0);
    expect(screen.getByTestId('button-filter-winners')).toHaveAttribute(
      'data-toggled',
      'false'
    );
    expect(screen.getByTestId('button-filter-loosers')).toHaveAttribute(
      'data-toggled',
      'true'
    );
    expect(setWinnerHandler).toHaveBeenCalledWith(true);
    fireEvent.click(screen.getByTestId('button-filter-winners'));
    expect(setPageHandler).toHaveBeenCalledWith(0);
    expect(screen.getByTestId('button-filter-winners')).toHaveAttribute(
      'data-toggled',
      'true'
    );
    expect(screen.getByTestId('button-filter-loosers')).toHaveAttribute(
      'data-toggled',
      'false'
    );
    expect(setWinnerHandler).toHaveBeenCalledWith(false);
    fireEvent.click(screen.getByTestId('button-filter-loosers'));
    expect(screen.getByTestId('button-filter-winners')).toHaveAttribute(
      'data-toggled',
      'false'
    );
    expect(screen.getByTestId('button-filter-loosers')).toHaveAttribute(
      'data-toggled',
      'true'
    );
    expect(setWinnerHandler).toHaveBeenCalledWith(true);
    expect(setPageHandler).toHaveBeenCalledWith(0);
  });
});
