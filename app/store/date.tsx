import { create } from "zustand";

interface TodoInterface {
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

interface selectedTodoInterface {
    id: string;
    allDay: boolean;
    startStr: string;
    endStr:string;
    title: string;
    backgroundColor: string;
}

interface DateStore {
    clickedDate: string;
    setClickedDate: (date: string) => void;
    setSelectedDateEventInfo: (id: string) => void;
    setSelectedDateEventInfoDefault: () => void;
    selectedDate: TodoInterface;
    setTodayDate: () => void;
    todoList: Array<TodoInterface>;
    setTodoList: (list: Array<TodoInterface>) => void;
    selectedDateEventList: Array<selectedTodoInterface>;
    setSelectedDateEventList: (list: Array<selectedTodoInterface>) => void;
    deleteId: string;
    setDeletedId: (id: string) => void;
}

const defaultStartDate: string = new Date().toISOString();

const useDateStore = create<DateStore>((set) => ({
    clickedDate: '',
    setClickedDate: (date: string) =>
        set(() => ({
            clickedDate: date,
            selectedDate: {
                id: '',
                title: '',
                allDay: true,
                start: date,
                end: date,
                color: '#3788d8',
                colorName: '워터블루',
                description: '',
                important: false,
                display: 'block',
                koreaLat: 37.5665,
                koreaLng: 126.9780,
                overseasLat: 37.5665,
                overseasLng: 126.9780,
                locationName: '',
                overseaLocationName: '',
                isKorea: true,
                user: '',
            },
        })),
    setSelectedDateEventInfo: (id: string) => set((state) => ({
        selectedDate: state.todoList.find((t) => {
            return t.id === id;
        })
    })),
    setSelectedDateEventInfoDefault: () => set((state) => ({
        selectedDate: {
            id: '',
            title: '',
            allDay: true,
            start: state.clickedDate,
            end: state.clickedDate,
            color: '#3788d8',
            colorName: '워터블루',
            description: '',
            important: false,
            display: 'block',
            koreaLat: 37.5665,
            koreaLng: 126.9780,
            overseasLat: 37.5665,
            overseasLng: 126.9780,
            locationName: '',
            overseaLocationName: '',
            isKorea: true,
            user: '',
        }
    })),
    selectedDate: {
        id: '',
        title: '',
        allDay: true,
        start: defaultStartDate,
        end: defaultStartDate,
        color: '#3788d8',
        colorName: '워터블루',
        description: '',
        important: false,
        display: 'block',
        koreaLat: 37.5665,
        koreaLng: 126.9780,
        overseasLat: 37.5665,
        overseasLng: 126.9780,
        locationName: '',
        overseaLocationName: '',
        isKorea: true,
        user: '',
    },
    setTodayDate: () =>
        set((state) => ({
            selectedDate: {
                ...state.selectedDate,
                start: defaultStartDate,
                end: defaultStartDate,
            },
        })),
    todoList: [],
    setTodoList: (list: Array<TodoInterface>) => set({ todoList: list }),
    selectedDateEventList: [],
    setSelectedDateEventList: (list: Array<selectedTodoInterface>) => set({ selectedDateEventList: list }),
    deleteId: '',
    setDeletedId: (id: string) => set({ deleteId: id }),
}));

export default useDateStore;