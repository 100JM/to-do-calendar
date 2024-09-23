'use client';

import { useEffect, useRef, useState } from 'react';

import useModalStore from '../store/modal';
import DialogContentsDiv from './dialog/DialogContentsDiv';
import AddArea from './dialog/AddArea';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import Drawer from '@mui/material/Drawer';

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

const koLocale: string = dayjs.locale('ko');

const TodoDialog: React.FC = () => {
    const { showTodoDialog, setShowTodoDialog, showAddArea, setShowAddArea } = useModalStore();

    return (
        <Dialog
            open={showTodoDialog}
            onClose={() => setShowTodoDialog(false)}
            maxWidth="md"
            fullWidth={true}
        >
            {!showAddArea &&
                <>
                    <DialogTitle className="flex justify-between items-center">
                        <span className="text-sm font-semibold" style={{ color: "#1a252f" }}>{dayjs('2024-09-23').format('YYYY년 MM월 DD일 dddd')}</span>
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
                                <div className="flex items-center justify-center min-h-80">
                                    <span className="text-slate-500">등록된 일정이 없습니다.</span>
                                </div>
                            </DialogContentsDiv>
                        </div>
                    </DialogContent>
                </>
            }
            {showAddArea &&
                <AddArea />
            }
        </Dialog>
    );
};

export default TodoDialog;