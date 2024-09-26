import { userInfo } from "os";
import { create } from "zustand"

interface UserStore {
    userInfo: any;
    setUserInfo: (info: any) => void;
}

const useUserStore = create<UserStore>((set) => ({
    userInfo: null,
    setUserInfo: (info: any) => set({ userInfo: info }),
}));

export default useUserStore;