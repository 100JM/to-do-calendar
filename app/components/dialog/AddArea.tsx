'use client';

import { useEffect, useRef, useState } from 'react';

import useModalStore from '@/app/store/modal';
import useCalendarMenu from '@/app/store/calendarMenu';
import DialogContentsDiv from './DialogContentsDiv';

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

const AddArea: React.FC = () => {
    const { bottomMenu } = useCalendarMenu();
    const { isTodoButton, setShowAddArea, setShowTodoDialog, setIsTodoButton } = useModalStore();

    const handleCloseModal = () => {
        setShowTodoDialog(false);
        setIsTodoButton(false);
        setShowAddArea(false);
    };

    return (
        <>
            <DialogTitle className="flex justify-between items-center">
                {(isTodoButton || (bottomMenu === 'importantTodo' || bottomMenu === 'all')) ?
                    // <IconButton aria-label="delete" size="large" onClick={handleCloseModal} sx={{ color: openColorBar.selectedColor, padding: "8px" }}>
                    <IconButton aria-label="delete" size="large" onClick={handleCloseModal} sx={{ padding: "8px" }}>
                        <CloseIcon />
                    </IconButton>
                    :
                    // <IconButton aria-label="delete" size="large" onClick={() => setShowAddArea(false)} sx={{ color: openColorBar.selectedColor, padding: "8px" }}>
                    <IconButton aria-label="delete" size="large" onClick={() => setShowAddArea(false)} sx={{ padding: "8px" }}>
                        <ArrowBackIcon />
                    </IconButton>
                }
                <div className='p-1'>
                    <button className="p-2">
                        {/* <FontAwesomeIcon icon={faCircleCheck as IconProp} style={{ color: openColorBar.selectedColor }} onClick={submitTask} /> */}
                        <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                    </button>
                    {/* {selectedDateEvtInfo.id ?
                        <>
                            <button className="p-2">
                                <FontAwesomeIcon icon={faTrash as IconProp} style={{ color: openColorBar.selectedColor }} onClick={() => deleteTask(selectedDateEvtInfo.id)} />
                            </button>
                            <button className="p-2">
                                <FontAwesomeIcon icon={faPenToSquare as IconProp} style={{ color: openColorBar.selectedColor }} onClick={updateTask} />
                            </button>
                        </>
                        :
                        <button className="p-2">
                            <FontAwesomeIcon icon={faCircleCheck as IconProp} style={{ color: openColorBar.selectedColor }} onClick={submitTask} />
                        </button>
                    } */}
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="text-gray-700 mb-4">
                </div>
            </DialogContent>
        </>
    );
};

export default AddArea;