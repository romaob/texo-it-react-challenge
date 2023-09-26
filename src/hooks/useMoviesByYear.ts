import { useCallback, useEffect, useState } from 'react';
import {
  FetchListOfWinnerMoviesByYear,
  fetchListOfWinnerMoviesByYear,
} from '../utils/api';

export type UseMoviesByYearResponse = {
  loading: boolean;
  error: null | Error;
  response: null | FetchListOfWinnerMoviesByYear;
  refetch: () => void;
  setYear: (year: number) => void;
};

export function useMoviesByYear(): UseMoviesByYearResponse {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [response, setResponse] =
    useState<null | FetchListOfWinnerMoviesByYear>(null);
  const [year, setYear] = useState(0);

  const fetchData = useCallback(async () => {
    if (!year || year === 0) return;
    try {
      setLoading(true);
      const res = await fetchListOfWinnerMoviesByYear({ year });
      setResponse(res);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, error, response, refetch: fetchData, setYear };
}
