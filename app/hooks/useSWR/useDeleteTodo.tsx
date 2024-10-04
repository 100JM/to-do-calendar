import { mutate } from 'swr';

const useDeleteTodo = async (id: string, userId: string | undefined) => {
    const url = process.env.NEXT_PUBLIC_MOCKAPI;

    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }

        mutate(`${url}?user=${userId}`);

    } catch (error) {
        console.error('Error delete todo:', error);
        throw error;
    }    
};

export default useDeleteTodo;