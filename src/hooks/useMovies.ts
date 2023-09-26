import { useState, useEffect, useCallback } from 'react';
import { FetchListOfMoviesResponse, fetchListOfMovies } from '../utils/api';

interface UseMoviesResponse {
  loading: boolean;
  error: null | Error;
  response: null | FetchListOfMoviesResponse;
  yearFilter: undefined | number;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  setWinner: (winner: boolean | undefined) => void;
  setYear: (year: number | undefined) => void;
  refetch: () => void;
}

export function useMovies(): UseMoviesResponse {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [response, setResponse] = useState<null | FetchListOfMoviesResponse>(
    null
  );
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
  const [winner, setWinner] = useState<boolean | undefined>(undefined);
  const [year, setYear] = useState<undefined | number>(undefined);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchListOfMovies({
        page,
        size,
        winner,
        year,
      });
      setResponse(res);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [page, size, winner, year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    loading,
    error,
    response,
    yearFilter: year,
    refetch: fetchData,
    setPage,
    setSize,
    setWinner,
    setYear,
  };
}
