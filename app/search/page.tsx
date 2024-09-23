'use client';

import { useRef } from "react";
import { useRouter } from 'next/navigation';

import useModalStore from "../store/modal";

import { AnimatePresence, motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function SearchPage() {
    const router = useRouter();
    const searchedmyTodoList: Array<any> = [];
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const { setIsTodoButton } = useModalStore();

    const handleBackBtn = () => {
        router.push('/');
        setIsTodoButton(false);
    };

    const subVariants = {
        hidden: { x: '100%', opacity: 0 },
        visible: { x: '0%', opacity: 1 },
        exit: { x: '100%', opacity: 0 },
    };

    const transitionSettings = {
        type: "tween",
        damping: 15,
        stiffness: 60,
        duration: 0.5
    };

    return (
        <AnimatePresence>
            <motion.div
                key="searchForm"
                variants={subVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={transitionSettings}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <div className="h-full w-full p-4 text-sm">
                    <div className="w-full h-10 flex items-center pb-2 relative">
                        <ArrowBackIcon onClick={handleBackBtn} sx={{ cursor: "pointer", marginRight: "auto" }} />
                        <span className="absolute left-1/2 transform -translate-x-1/2 text-lg">검색</span>
                    </div>
                    <div className="w-full h-10 border rounded-md p-1 border-gray-400 flex items-center justify-center mb-3">
                        <SearchIcon />
                        <input type="text" className="h-full w-full p-2 outline-none" placeholder="키워드" ref={searchInputRef} />
                    </div>
                    <div className="w-full overflow-y-auto" style={{ height: "calc(100% - 5.55rem)" }}>
                        {
                            searchedmyTodoList.length === 0 && !searchInputRef.current?.value &&
                            <div className="w-full h-full flex justify-center items-center text-gray-400">
                                <span>키워드를 입력하세요.</span>
                            </div>
                        }
                        {
                            searchedmyTodoList.length === 0 && searchInputRef.current?.value &&
                            <div className="w-full h-full flex justify-center items-center text-gray-400">
                                <span>검색 결과가 없습니다.</span>
                            </div>
                        }
                        {
                            searchedmyTodoList.length > 0 && searchInputRef.current?.value &&
                            searchedmyTodoList.map((t) => {
                                return (
                                    <div key={t.id} className="w-full h-18 py-2 flex justify-start items-center border-b cursor-pointer hover:bg-gray-100">
                                        <div className="w-full h-full">
                                            <div className="text-white rounded p-1 mb-1" style={{ backgroundColor: `${t.color}` }}>
                                                {t.start.split('T')[0]}
                                            </div>
                                            <div className="overflow-hidden text-ellipsis whitespace-nowrap">{t.title}</div>
                                            <div className="overflow-hidden text-ellipsis whitespace-nowrap">{t.description ? t.description : '-'}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};