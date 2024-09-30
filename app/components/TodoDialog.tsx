'use client';

import { useEffect, useRef, useState } from 'react';

import useModalStore from '../store/modal';
import useDateStore from '../store/date';
import DialogContentsDiv from './dialog/DialogContentsDiv';
import AddArea from './dialog/AddArea';
import TodoList from './dialog/TodoList';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import 'dayjs/locale/ko';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faClockRotateLeft, faThumbTack, faCircleXmark, faCirclePlus, faTrash, faCircleCheck, faPenToSquare, faMapLocationDot, faMagnifyingGlass, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';

const TodoDialog: React.FC = () => {
    const { showTodoDialog, setShowTodoDialog, showAddArea, setShowAddArea, isTodoButton, setIsTodoButton } = useModalStore();
    const { selectedDate, selectedDateEventList } = useDateStore();

    const handleCloseModal = () => {
        setShowTodoDialog(false);
        setIsTodoButton(false);
        setShowAddArea(false);
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
        </>
    );
};

export default TodoDialog;