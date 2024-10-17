import { mutate } from 'swr';

export const UseAddTodo = async (info: any, userId: string | undefined) => {
    const url = `${process.env.NEXT_PUBLIC_MOCKAPI}?user=${userId}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        });

        if (response.ok) {
            mutate(url);
        }

        return response.ok;

    } catch (error) {
        console.error('Error adding todo:', error);
        throw error;
    }
};

export const UseUpdateTodo = async (info: any, userId: string | undefined, id: string) => {
    const url = process.env.NEXT_PUBLIC_MOCKAPI;

    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        });

        if (response.ok) {
            mutate(`${url}?user=${userId}`);
        }

        return response.ok;

    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
};