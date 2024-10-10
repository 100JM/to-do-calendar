import useSWR from 'swr';
import useDateStore from '@/app/store/date';
import { useEffect } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useTodoList = (userId: string | undefined) => {
    const { setTodoList } = useDateStore();

    const { data, error, isLoading } = useSWR(userId ? `${process.env.NEXT_PUBLIC_MOCKAPI}?user=${userId}` : null, fetcher);

    
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