import fetchMock from 'jest-fetch-mock';
import { ListOfMovies } from '../../values/mockData';
import { URL, fetchListOfMovies } from '../api';

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('API manager tests - Movies List', () => {
  it('should fetch the list of movies with default data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(ListOfMovies));
    const response = await fetchListOfMovies({});
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?page=0&size=99');
    expect(response).toEqual(ListOfMovies);
  });
  it('should fetch the list of movies filtering by year', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await fetchListOfMovies({ year: 1980 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?page=0&size=99&year=1980');
  });
  it('should fetch the list of movies filtering by with winner', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await fetchListOfMovies({ winner: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(URL + '?page=0&size=99&winner=true');
  });

  it('should fetch the list of movies filtering by without winner', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await fetchListOfMovies({ winner: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      URL + '?page=0&size=99&winner=false'
    );
  });

  it('should fetch the list of movies filtering by year and with winner', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await fetchListOfMovies({ year: 1980, winner: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      URL + '?page=0&size=99&winner=true&year=1980'
    );
  });
});

describe('API manager tests - Winner movies by year', () => {
  it('should fetch the list of winner movies by year', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await fetchListOfMovies({ year: 1980, winner: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      URL + '?page=0&size=99&winner=true&year=1980'
    );
  });
});
