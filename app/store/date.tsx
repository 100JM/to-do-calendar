import { create } from "zustand";

interface DateStore {
    clickedDate: string;
    setClickedDate: (date: string) => void;
    setSelectedDateEventInfo: (id: string) => void;
    setSelectedDateEventInfoDefault: () => void;
    selectedDate: {
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
        user: any;
    };
    setTodayDate: () => void;
    todoList: Array<any>;
    setTodoList: (list: Array<any>) => void;
    selectedDateEventList: Array<any>;
    setSelectedDateEventList: (list: Array<any>) => void;
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
                user: 0,
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
            user: 0,
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
        user: 0,
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
    setTodoList: (list: Array<any>) => set({todoList: list}),
    selectedDateEventList: [],
    setSelectedDateEventList: (list: Array<any>) => set({ selectedDateEventList: list }),
    deleteId: '',
    setDeletedId: (id: string) => set({ deleteId: id }),
}));

export default useDateStore;