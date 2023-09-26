import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import Dashboard from '../Dashboard';
import userEvent from '@testing-library/user-event';
import { URL } from '../../utils/api';

//Mocking the hooks
jest.mock('../../hooks/useYearsMultiWinners', () => ({
  useYearsMultiWinners: jest.fn(),
}));

jest.mock('../../hooks/useStudiosWithWins', () => ({
  useStudioWithWins: jest.fn(),
}));

jest.mock('../../hooks/useProducersMinMaxInterval', () => ({
  useProducersMinMaxInterval: jest.fn(),
}));

jest.mock('../../hooks/useMoviesByYear', () => ({
  useMoviesByYear: jest.fn(),
}));

describe('Dashboard page tests', () => {
  it('should render the dashboard with the proper components', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    expect(screen.getAllByTestId('dashboard-row').length).toBe(2);
    expect(screen.getByTestId('table-years-multi-winners')).toBeInTheDocument();
    expect(
      screen.getByTestId('table-studios-with-winners')
    ).toBeInTheDocument();
    expect(screen.getByTestId('table-producers-max')).toBeInTheDocument();
    expect(screen.getByTestId('table-producers-min')).toBeInTheDocument();
    expect(screen.getByTestId('table-movies-by-year')).toBeInTheDocument();
  });

  it('should call the right hooks', () => {
    render(<Dashboard />);
    expect(
      require('../../hooks/useYearsMultiWinners').useYearsMultiWinners
    ).toHaveBeenCalled();
    expect(
      require('../../hooks/useStudiosWithWins').useStudioWithWins
    ).toHaveBeenCalled();
    expect(
      require('../../hooks/useProducersMinMaxInterval')
        .useProducersMinMaxInterval
    ).toHaveBeenCalled();
    expect(
      require('../../hooks/useMoviesByYear').useMoviesByYear
    ).toHaveBeenCalled();
  });

  it('should refetch the hook after providing a year and clicking the search button', async () => {
    const state_spy = jest.spyOn(
      require('../../hooks/useMoviesByYear'),
      'useMoviesByYear'
    );

    const setYearHandler = jest.fn();

    state_spy.mockReturnValue({
      setYear: setYearHandler,
    });

    render(<Dashboard />);
    const input = screen.getByRole('spinbutton');
    userEvent.type(input, '1980');
    fireEvent.click(screen.getByTestId('button-search-year'));
    expect(setYearHandler).toHaveBeenCalledWith(1980);
  });
});
