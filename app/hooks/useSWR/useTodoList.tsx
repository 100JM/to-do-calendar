import useSWR from 'swr';
import useDateStore from '@/app/store/date';
import { useEffect } from 'react';

const fetcher = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404 || response.statusText === 'Not found') {
            return [];
        } else {
            throw new Error(`API Error: ${response.status}`);
        }
    }

    return response.json();
};

const useTodoList = (userId: string | undefined) => {
    const { setTodoList } = useDateStore();

    const { data, error, isLoading } = useSWR(
        userId ? `${process.env.NEXT_PUBLIC_MOCKAPI}?user=${userId}` : null, 
        fetcher,
        {
            onErrorRetry(error, key, config, revalidate, revalidateOpts) {
                if (error.status === 404) return
            },
        }
    );

    useEffect(() => {
        if (data && typeof(data) === 'object') {
            setTodoList(data);
        }
    }, [data, setTodoList]);

    return {
        todoData: data,
        error: error,
        isLoading: isLoading,
    };
};

export default useTodoList;