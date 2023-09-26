import { useCallback, useEffect, useState } from 'react';
import {
  FetchListOfYearsWithMultipleWinnersResponse,
  fetchListOfYearsWithMultipleWinners,
} from '../utils/api';

export type UseYearsMultiWinnersReturn = {
  loading: boolean;
  error: null | Error;
  response: null | FetchListOfYearsWithMultipleWinnersResponse;
  refetch: () => void;
};

export function useYearsMultiWinners(): UseYearsMultiWinnersReturn {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [response, setResponse] =
    useState<null | FetchListOfYearsWithMultipleWinnersResponse>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchListOfYearsWithMultipleWinners();
      setResponse(res);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, error, response, refetch: fetchData };
}
