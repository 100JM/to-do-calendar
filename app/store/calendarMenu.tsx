import { create } from 'zustand';

interface CalendarMenu {
    bottomMenu: string;
    setBottomMenu: (menu: string) => void;
}

const useCalendarMenu = create<CalendarMenu>((set) => ({
    bottomMenu: 'calendar',
    setBottomMenu: (menu: string) => set({ bottomMenu: menu }),
}));

export default useCalendarMenu;