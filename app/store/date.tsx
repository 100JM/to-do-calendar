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
}));

export default useDateStore;