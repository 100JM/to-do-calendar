import { create } from "zustand";

interface DateStore {
    selectedDateEventInfo: {
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
    setClickedDate: (date: string) => void;
    setTodayDate: () => void;
    todoList: Array<any>;
    selectedDateEventList: Array<any>;
    setSelectedDateEventList: (list: Array<any>) => void;

}

const defaultStartDate: string = new Date().toISOString();

const useDateStore = create<DateStore>((set) => ({
    selectedDateEventInfo: {
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
    setClickedDate: (date: string) =>
        set((state) => ({
            selectedDate: {
                ...state.selectedDate,
                start: date,
                end: date
            },
        })),
    setTodayDate: () =>
        set((state) => ({
            selectedDate: {
                ...state.selectedDate,
                start: defaultStartDate,
                end: defaultStartDate,
            },
        })),
    todoList: [
        {
            id: '1',
            title: 'Aevent',
            start: '2024-08-17T09:00',
            end: '2024-08-21T18:00',
            color: '#3788d8',
            colorName: '워터블루',
            allDay: false,
            important: true,
            display: "block",
            koreaLat: 37.5665,
            koreaLng: 126.9780,
            overseasLat: 37.5665,
            overseasLng: 126.9780,
            locationName: '',
            overseaLocationName: '',
            isKorea: true,
            user: '3643699604',
        },
        {
            id: '2fds',
            title: 'Cevent',
            start: '2024-07-15T09:00',
            end: '2024-07-19T10:00',
            color: '#3788d8',
            colorName: '워터블루',
            allDay: false,
            important: false,
            description: '테스트입니다.',
            display: "block",
            koreaLat: 37.5665,
            koreaLng: 126.9780,
            overseasLat: 37.5665,
            overseasLng: 126.9780,
            locationName: '',
            overseaLocationName: '',
            isKorea: true,
            user: '3643699604',
        },
        {
            id: '3a',
            title: '긴 이름의 일정이 등록되었을때 css 조정 작업이 필요합니다.',
            start: '2024-07-10',
            end: '2024-07-17',
            color: '#FA8072',
            colorName: '살몬',
            allDay: true,
            important: true,
            description: '조정 작업 완료',
            display: "block",
            koreaLat: 37.5665,
            koreaLng: 126.9780,
            overseasLat: 37.5665,
            overseasLng: 126.9780,
            locationName: '',
            overseaLocationName: '',
            isKorea: true,
            user: 123,
        },
        {
            id: '4',
            title: '여행',
            start: '2024-06-14',
            end: '2024-06-20',
            color: '#FA8072',
            colorName: '살몬',
            allDay: true,
            important: true,
            display: "block",
            koreaLat: 37.5665,
            koreaLng: 126.9780,
            overseasLat: 12.2529152,
            overseasLng: 109.1899018,
            locationName: '',
            overseaLocationName: '냐짱, 베트남 칸호아 냐짱',
            isKorea: false,
            user: '3643699604',
        }
    ],
    selectedDateEventList: [],
    setSelectedDateEventList: (list: Array<any>) => set({ selectedDateEventList: list }),
}));

export default useDateStore;