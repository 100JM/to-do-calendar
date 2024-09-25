import { create } from "zustand";
import toast from "react-hot-toast";

interface ToastStore {
    showToast: (msg: string, option:any) => void;
}

const useToastStore = create<ToastStore>((set) => ({
    showToast: (msg: string, option:any) => {
        toast(msg, option);
    }
}));

export default useToastStore;