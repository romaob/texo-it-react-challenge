export const URL = 'https://tools.texoit.com/backend-java/api/movies';

/**
 * Main fetch data function
 * @param param string to with values added to the URL
 * @returns Promise
 */
export function fetchData({ param = '' }: { param?: string }): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(URL + param)
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export type FetchListOfMoviesResponse = {
  content: Array<{
    id: number;
    year: number;
    title: string;
    studios: string[];
    producers: string[];
    winner: boolean;
  }>;
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
  };
  number: number;
  numberOfElements: number;
  size: number;
};

/**
 * Function to fetch the list of movies from the API
 * @prop page number of the page to fetch
 * @prop size number of items to fetch per page
 * @prop winner boolean to filter the list by winner
 * @prop year number to filter the list by year
 * @returns Promise
 */
export function fetchListOfMovies({
  page = 0,
  size = 99,
  winner = undefined,
  year,
}: {
  page?: number;
  size?: number;
  winner?: boolean | undefined;
  year?: number;
}): Promise<FetchListOfMoviesResponse> {
  let param = `?page=${page}&size=${size}`;
  if (winner !== undefined) {
    param += `&winner=${winner}`;
  }
  if (year) {
    param += `&year=${year}`;
  }
  return fetchData({ param });
}

export type FetchListOfYearsWithMultipleWinnersResponse = {
  years: Array<{
    year: number;
    winnerCount: number;
  }>;
};

/**
 * Function to fetch the list of years with multiple winners
 * @returns Promise
 */
export function fetchListOfYearsWithMultipleWinners(): Promise<FetchListOfYearsWithMultipleWinnersResponse> {
  const param = `?projection=years-with-multiple-winners`;
  return fetchData({ param });
}

export type FetchListOfStudiosWithWinCountResponse = {
  studios: Array<{
    name: string;
    winCount: number;
  }>;
};

/**
 * Function to fetch the list of studios with win count
 * @returns Promise
 */
export function fetchListOfStudiosWithWinCount(): Promise<FetchListOfStudiosWithWinCountResponse> {
  const param = `?projection=studios-with-win-count`;
  return fetchData({ param });
}

export type FetchListOfProducersWithMaxMinWinIntervalResponse = {
  min: Array<{
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
  }>;
  max: Array<{
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
  }>;
};

/**
 * Function to fetch the list of producers with max and min win interval
 * @returns Promise
 */
export function fetchListOfProducersWithMaxMinWinInterval(): Promise<FetchListOfProducersWithMaxMinWinIntervalResponse> {
  const param = `?projection=max-min-win-interval-for-producers`;
  return fetchData({ param });
}

//returns an array of objects of specific type
export type FetchListOfWinnerMoviesByYear = Array<{
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}>;

/**
 * Function to fetch the list of winner movies by year
 * @prop year number to filter the list by year
 * @returns Promise
 */
export function fetchListOfWinnerMoviesByYear({
  year,
}: {
  year: number;
}): Promise<FetchListOfWinnerMoviesByYear> {
  const param = `?winner=true&year=${year}`;
  return fetchData({ param });
}
