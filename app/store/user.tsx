import { userInfo } from "os";
import { create } from "zustand"

interface UserStore {
    userInfo: {
        image: string;
        name: string;
    };
    setUserInfo: (image: string, name: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
    userInfo: {
        image: '',
        name: '',
    },
    setUserInfo: (image, name) =>
        set(() => ({
            userInfo: {
                image: image,
                name: name
            }
        })),
}));

export default useUserStore;