import { create } from "zustand";
import toast, { ToastOptions } from "react-hot-toast";

interface CustomToastOptions extends ToastOptions {
    type?: 'success' | 'error' | 'loading' | 'default';
}

interface ToastStore {
    showToast: (msg: string, option: CustomToastOptions) => void;
}

const useToastStore = create<ToastStore>(() => ({
    showToast: (msg: string, option: CustomToastOptions) => {
        toast(msg, option);
    }
}));

export default useToastStore;