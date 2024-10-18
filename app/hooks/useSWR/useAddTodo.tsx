import { mutate } from 'swr';

interface TodoInterface {
    title: string;
    allDay: boolean;
    start: string;
    end: string;
    color: string;
    colorName: string;
    description: string;
    important: boolean;
    display: string;
    koreaLat: number;
    koreaLng: number;
    overseasLat: number;
    overseasLng: number;
    locationName: string;
    overseaLocationName: string;
    isKorea: boolean;
    user: string;
}

interface UpdatedTodoInterface {
    id: string;
    title: string;
    allDay: boolean;
    start: string;
    end: string;
    color: string;
    colorName: string;
    description: string;
    important: boolean;
    display: string;
    koreaLat: number;
    koreaLng: number;
    overseasLat: number;
    overseasLng: number;
    locationName: string;
    overseaLocationName: string;
    isKorea: boolean;
    user: string;
}

export const UseAddTodo = async (info: TodoInterface, userId: string | undefined) => {
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

export const UseUpdateTodo = async (info: UpdatedTodoInterface, userId: string | undefined, id: string) => {
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