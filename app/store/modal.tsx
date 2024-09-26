import { create } from 'zustand';

interface ModalStore {
    showTodoDialog: boolean;
    setShowTodoDialog: (isShow: boolean) => void;
    showAddArea: boolean;
    setShowAddArea: (isShow: boolean) => void;
    isTodoButton: boolean;
    setIsTodoButton: (isClick: boolean) => void;
    showUserDialog: boolean;
    setShowUserDialog: (isShow: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
    showTodoDialog: false,
    setShowTodoDialog: (isShow: boolean) => set({ showTodoDialog: isShow }),
    showAddArea: false,
    setShowAddArea: (isShow: boolean) => set({ showAddArea: isShow }),
    isTodoButton: false,
    setIsTodoButton: (isClick: boolean) => set({ isTodoButton: isClick }),
    showUserDialog: false,
    setShowUserDialog: (isShow: boolean) => set({ showUserDialog: isShow }),
}));

export default useModalStore;