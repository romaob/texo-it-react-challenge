import { useCallback, useEffect, useState } from 'react';
import { FetchListOfProducersWithMaxMinWinIntervalResponse, fetchListOfProducersWithMaxMinWinInterval } from '../utils/api';

export type UseProducersMinMaxIntervalResponse = {
    loading: boolean,
    error: null | Error,
    response: null | FetchListOfProducersWithMaxMinWinIntervalResponse,
    refetch: () => void,
};

export function useProducersMinMaxInterval(): UseProducersMinMaxIntervalResponse {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | Error>(null);
    const [response, setResponse] = useState<
        null | FetchListOfProducersWithMaxMinWinIntervalResponse
    >(null);

    const fetchData = useCallback(
      async () => {
        try {
            setLoading(true);
            const res = await fetchListOfProducersWithMaxMinWinInterval();
            setResponse(res);
        } catch (error: any) {
            setError(error);            
        } finally {
            setLoading(false);
        }
      },
      [],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData])

  return {loading, error, response, refetch: fetchData};
}