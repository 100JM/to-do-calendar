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
    showComfirm: boolean;
    setShowComfirm: (isShow: boolean) => void;
    comfirmText: {
        title: string;
        body: string;
    };
    setComfirmText: (text: any) => void;
    showLoadingBar: boolean;
    setShowLoadingBar: (isShow: boolean) => void;
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
    showComfirm: false,
    setShowComfirm: (isShow: boolean) => set({ showComfirm: isShow }),
    comfirmText: {
        title: '',
        body: ''
    },
    setComfirmText: (text: any) => set({ comfirmText: text }),
    showLoadingBar: false,
    setShowLoadingBar: (isShow: boolean) => set({ showLoadingBar: isShow }),
}));

export default useModalStore;