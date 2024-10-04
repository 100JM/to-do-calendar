import { mutate } from 'swr';

const useAddTodo = async (info: any, userId: string | undefined) => {
    const url = `${process.env.NEXT_PUBLIC_MOCKAPI}?user=${userId}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        });

        if (!response.ok) {
            throw new Error('Failed to add todo');
        }

        mutate(url);

    } catch (error) {
        console.error('Error adding todo:', error);
        throw error;
    }
};

export default useAddTodo;