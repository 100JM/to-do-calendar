'use client';

import useModalStore from '../store/modal';
import useDateStore from '../store/date';
import DialogContentsDiv from './dialog/DialogContentsDiv';
import AddArea from './dialog/AddArea';
import TodoList from './dialog/TodoList';
import ComfirmDialog from './dialog/ComfrimDialog';

import dayjs from 'dayjs';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import 'dayjs/locale/ko';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCircleXmark, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const TodoDialog: React.FC = () => {
    const { showTodoDialog, setShowTodoDialog, showAddArea, setShowAddArea, setIsTodoButton, showComfirm} = useModalStore();
    const { selectedDate, selectedDateEventList, setSelectedDateEventInfoDefault } = useDateStore();

    const handleCloseModal = () => {
        setShowTodoDialog(false);
        setIsTodoButton(false);
        setShowAddArea(false);
        setSelectedDateEventInfoDefault();
    };

    return (
        <>
            {showTodoDialog &&
                <Dialog
                    open={showTodoDialog}
                    onClose={handleCloseModal}
                    maxWidth="md"
                    fullWidth={true}
                >
                    {!showAddArea &&
                        <>
                            <DialogTitle className="flex justify-between items-center">
                                <span className="text-sm font-semibold" style={{ color: "#1a252f" }}>{dayjs(selectedDate.start).format('YYYY년 MM월 DD일 dddd')}</span>
                                <div>
                                    <button type="button" className="p-1" style={{ color: "#2c3e50" }} onClick={() => setShowTodoDialog(false)}>
                                        <FontAwesomeIcon icon={faCircleXmark as IconProp} />
                                    </button>
                                    <button type="button" className="p-1" style={{ color: "#2c3e50" }} onClick={() => setShowAddArea(true)}>
                                        <FontAwesomeIcon icon={faCirclePlus as IconProp} />
                                    </button>
                                </div>
                            </DialogTitle>
                            <DialogContent>
                                <div className="text-gray-700 mb-4">
                                    <DialogContentsDiv>
                                        {selectedDateEventList.length === 0 &&
                                            <div className="flex items-center justify-center min-h-80">
                                                <span className="text-slate-500">등록된 일정이 없습니다.</span>
                                            </div>
                                        }
                                        {selectedDateEventList.length > 0 && <TodoList />}
                                    </DialogContentsDiv>
                                </div>
                            </DialogContent>
                        </>
                    }
                    {showAddArea &&
                        <AddArea />
                    }
                </Dialog>
            }
            {showComfirm && <ComfirmDialog />}
        </>
    );
};

export default TodoDialog;