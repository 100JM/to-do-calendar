import { create } from 'zustand';

interface CalendarMenu {
    bottomMenu: string;
    setBottomMenu: (menu: string) => void;
    isFadeIn: boolean;
    setIsFadeIn: (isFade: boolean) => void;
}

const useCalendarMenu = create<CalendarMenu>((set) => ({
    bottomMenu: 'calendar',
    setBottomMenu: (menu: string) => set({ bottomMenu: menu }),
    isFadeIn: true,
    setIsFadeIn: (isFade: boolean) => set({ isFadeIn: isFade }),
}));

export default useCalendarMenu;