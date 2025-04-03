import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error | AxiosError) => void;
  initialData?: T;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | AxiosError | null;
  execute: (config?: AxiosRequestConfig) => Promise<T | null>;
  reset: () => void;
}

function useApi<T = any>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(options.initialData || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | AxiosError | null>(null);
  
  const reset = useCallback(() => {
    setData(options.initialData || null);
    setLoading(false);
    setError(null);
  }, [options.initialData]);
  
  const execute = useCallback(
    async (config?: AxiosRequestConfig): Promise<T | null> => {
      try {
        setLoading(true);
        setError(null);
        
        const response: AxiosResponse<T> = await axios({
          url,
          method,
          ...config
        });
        
        setData(response.data);
        
        if (options.onSuccess) {
          options.onSuccess(response.data);
        }
        
        return response.data;
      } catch (err) {
        const error = err as Error | AxiosError;
        setError(error);
        
        if (options.onError) {
          options.onError(error);
        }
        
        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, method, options]
  );
  
  return { data, loading, error, execute, reset };
}

export default useApi;