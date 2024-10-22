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

const UseTodoList = (userId: string | undefined) => {
    const { setTodoList } = useDateStore();
    const maxRetryCount = 3;

    const { data, error, isLoading } = useSWR(
        userId ? `${process.env.NEXT_PUBLIC_MOCKAPI}?user=${userId}` : null, 
        fetcher,
        {
            onErrorRetry(error, _key, _config, revalidate, { retryCount }) {
                if (!error || retryCount >= maxRetryCount) {
                    return;
                }

                setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 1000);
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

export default UseTodoList;