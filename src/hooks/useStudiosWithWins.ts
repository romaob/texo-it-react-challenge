import { useCallback, useEffect, useState } from 'react';
import { FetchListOfStudiosWithWinCountResponse, fetchListOfStudiosWithWinCount } from '../utils/api';

export type UseStudiosWithWinsResponse = {
    loading: boolean,
    error: null | Error,
    response: null | FetchListOfStudiosWithWinCountResponse,
    refetch: () => void,
};

export function useStudioWithWins(): UseStudiosWithWinsResponse {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | Error>(null);
    const [response, setResponse] = useState<
        null | FetchListOfStudiosWithWinCountResponse
    >(null);

    const fetchData = useCallback(
      async () => {
        try {
            setLoading(true);
            const res = await fetchListOfStudiosWithWinCount();
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