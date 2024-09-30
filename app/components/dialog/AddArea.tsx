'use client';

import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

import useModalStore from '@/app/store/modal';
import useCalendarMenu from '@/app/store/calendarMenu';
import useDateStore from '@/app/store/date';
import useToastStore from '@/app/store/toast';
import DialogContentsDiv from './DialogContentsDiv';
import DialogUiColor from './DialogUiColor';
import UiColorButtons from './UiColorButtons';
import KakaoAddrSearchForm from './KakaoAddrSearchForm';
import KakaoMap from './KakaoMap';
import OverseaAddrSearchForm from './OverseaAddrSearchForm';
import OverseaMap from './OverseaMap';

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

interface OpenColorBarInterface {
    open: boolean;
    selectedColor: string;
    colorName: string;
}

interface DateData {
    id: string;
    title: string;
    allDay: boolean;
    start: string;
    end: string;
    color: string;
    colorName: string;
    description: string;
    important: boolean;
    display: string;
    koreaLat: number;
    koreaLng: number;
    overseasLat: number;
    overseasLng: number;
    locationName: string;
    overseaLocationName: string;
    isKorea: boolean;
    user: any;
}

interface MapCenterInterface {
    koreaLat: number;
    koreaLng: number;
    overseasLat: number;
    overseasLng: number;
}

interface ToDoValueRefs {
    [key: string]: HTMLElement | null;
}

const AddArea: React.FC = () => {
    const { bottomMenu } = useCalendarMenu();
    const { isTodoButton, setShowAddArea, setShowTodoDialog, setIsTodoButton } = useModalStore();
    const { selectedDateEventInfo, selectedDate } = useDateStore();
    const { showToast } = useToastStore();

    const defaultStartDateTime = dayjs().set('hour', 9).set('minute', 0).startOf('minute').format('HH:mm');
    const defaultEndDateTime = dayjs().set('hour', 18).set('minute', 0).startOf('minute').format('HH:mm');

    const [selectedTime, setSelectedTime] = useState<{ startTime: string, endTime: string }>({
        startTime: defaultStartDateTime,
        endTime: defaultEndDateTime
    });

    const [showAddrSearch, setShowAddrSearch] = useState<boolean>(false);
    const [isAllday, setIsAllday] = useState<boolean>(true);
    const [openColorBar, setOpenColorBar] = useState<OpenColorBarInterface>({
        open: false,
        selectedColor: '#3788d8',
        colorName: '워터 블루'
    });
    const [selectedAddr, setSelectedAddr] = useState<any>();
    const [selectedAddrOversea, setSelectedAddrOversea] = useState<any>();
    const [mapCenter, setMapCenter] = useState<MapCenterInterface>({
        koreaLat: 37.5665,
        koreaLng: 126.9780,
        overseasLat: 37.5665,
        overseasLng: 126.9780,
    });
    const [isKorea, setIsKorea] = useState<boolean>(true);
    const [dateValueCheck, setDateValueCheck] = useState<boolean>(true);

    const dateRef = useRef<HTMLDivElement | null>(null);
    const timeRef = useRef<HTMLDivElement | null>(null);
    const toDoValueRef = useRef<ToDoValueRefs>({});

    let dateData: DateData = {
        id: (selectedDateEventInfo.id ? selectedDateEventInfo.id : selectedDate.id),
        title: (selectedDateEventInfo.id ? selectedDateEventInfo.title : selectedDate.title),
        allDay: (selectedDateEventInfo.id ? selectedDateEventInfo.allDay : selectedDate.allDay),
        start: (selectedDateEventInfo.id ? selectedDateEventInfo.start : selectedDate.start),
        end: (selectedDateEventInfo.id ? selectedDateEventInfo.end : selectedDate.end),
        color: (selectedDateEventInfo.id ? selectedDateEventInfo.color : selectedDate.color),
        colorName: (selectedDateEventInfo.id ? selectedDateEventInfo.colorName : selectedDate.colorName),
        description: (selectedDateEventInfo.id ? selectedDateEventInfo.description : selectedDate.description),
        important: (selectedDateEventInfo.id ? selectedDateEventInfo.important : selectedDate.important),
        display: 'block',
        koreaLat: (selectedDateEventInfo.id ? selectedDateEventInfo.koreaLat : selectedDate.koreaLat),
        koreaLng: (selectedDateEventInfo.id ? selectedDateEventInfo.koreaLng : selectedDate.koreaLng),
        overseasLat: (selectedDateEventInfo.id ? selectedDateEventInfo.overseasLat : selectedDate.overseasLat),
        overseasLng: (selectedDateEventInfo.id ? selectedDateEventInfo.overseasLng : selectedDate.overseasLng),
        locationName: (selectedDateEventInfo.id ? selectedDateEventInfo.locationName : ''),
        overseaLocationName: (selectedDateEventInfo.id ? selectedDateEventInfo.overseaLocationName : ''),
        isKorea: (selectedDateEventInfo.id ? selectedDateEventInfo.isKorea : true),
        user: (selectedDateEventInfo.id ? selectedDateEventInfo.user : selectedDate.user),
    };

    const handleCloseModal = () => {
        setShowTodoDialog(false);
        setIsTodoButton(false);
        setShowAddArea(false);
    };

    const handleShowAddrSearch = (isShow: boolean) => {
        setShowAddrSearch(isShow);
    };

    const handleSetOverseaAddr = (address: any) => {
        setMapCenter((prev) => {
            return {
                ...prev,
                overseasLat: Number(address.lat),
                overseasLng: Number(address.lon)
            }
        });

        setSelectedAddrOversea(address.display_name);
        handleShowAddrSearch(false);
    };

    const handleSetKoreaAddr = (address: any) => {
        setMapCenter((prev) => {
            return {
                ...prev,
                koreaLat: address.y,
                koreaLng: address.x
            }
        });

        if (address.road_address_name) {
            setSelectedAddr(`${address.place_name}, ${address.road_address_name}`);
        } else {
            setSelectedAddr(`${address.place_name}, ${address.address_name}`);
        }

        handleShowAddrSearch(false);
    };

    const handleLocationDefault = () => {
        setSelectedAddr('');
        setSelectedAddrOversea('');
        setMapCenter((prev) => {
            return {
                ...prev,
                koreaLat: 37.5665,
                koreaLng: 126.9780,
                overseasLat: 37.5665,
                overseasLng: 126.9780,
            }
        });
    };

    const handleIsAllday = () => {
        setIsAllday((prev) => !prev);
    };

    const handleDraw = (newOpen: boolean) => {
        setOpenColorBar((prevState) => {
            return {
                ...prevState,
                open: newOpen
            }
        });
    };

    const handleTaskColor = (newOpen: boolean, className: string, colorName: string) => {
        setOpenColorBar((prevState) => {
            return {
                ...prevState,
                open: newOpen,
                selectedColor: className,
                colorName: colorName
            }
        })
    };

    const handleStartTime = (date: Dayjs | null) => {
        if (date) {
            setSelectedTime((prevTime) => {
                return {
                    ...prevTime,
                    startTime: dayjs(date as Dayjs).format('HH:mm')
                }
            })
        }
    };

    const handleEndTime = (date: Dayjs | null) => {
        if (date) {
            setSelectedTime((prevTime) => {
                return {
                    ...prevTime,
                    endTime: dayjs(date as Dayjs).format('HH:mm')
                }
            })
        }
    };

    const handleStartDate = (date: Dayjs | null) => {
        const start = dayjs(date).format('YYYY-MM-DD');
        const end = ((toDoValueRef.current.end) as HTMLInputElement).value;

        if (start > end) {
            setDateValueCheck(false);
        } else {
            setDateValueCheck(true);
        }
    };

    const handleEndDate = (date: Dayjs | null) => {
        const end = dayjs(date).format('YYYY-MM-DD');
        const start = ((toDoValueRef.current.start) as HTMLInputElement).value;

        if (start > end) {
            setDateValueCheck(false);
        } else {
            setDateValueCheck(true);
        }
    };

    const handleSubmit = () => {
        const checkDateInput = dateRef.current?.classList.contains('date-error');
        const checkTimeInput = timeRef.current?.classList.contains('date-error');

        if (!(toDoValueRef.current.title as HTMLInputElement).value) {
            showToast('제목을 입력해주세요.', { type: 'success' });
            (toDoValueRef.current.title as HTMLInputElement).focus();
            return;
        }



        if (checkTimeInput || checkDateInput) {
            showToast('시작일과 종료일이 올바르지 않습니다.', { type: 'error' });
            return;
        }

        handleCloseModal();
        showToast('일정이 등록되었습니다.', { type: 'success' });
    };

    useEffect(() => {
        setOpenColorBar(prevState => ({
            ...prevState,
            selectedColor: dateData.color,
            colorName: dateData.colorName
        }));

        setIsAllday(dateData.allDay);

        setMapCenter((prev) => {
            return {
                ...prev,
                koreaLat: dateData.koreaLat,
                koreaLng: dateData.koreaLng,
                overseasLat: dateData.overseasLat,
                overseasLng: dateData.overseasLng,
            }
        });

        if (dateData.locationName !== '') {
            setSelectedAddr(dateData.locationName);
        }

        if (dateData.overseaLocationName !== '') {
            setSelectedAddrOversea(dateData.overseaLocationName);
        }

        if (!dateData.allDay) {
            setSelectedTime((prevTime) => {
                return {
                    ...prevTime,
                    startTime: dateData.start.split('T')[1],
                    endTime: dateData.end.split('T')[1]
                }
            });
        }

        setIsKorea(dateData.isKorea);
    }, [dateData.id]);

    return (
        <>
            <DialogTitle className="flex justify-between items-center">
                {(isTodoButton || (bottomMenu === 'importantTodo' || bottomMenu === 'all')) ?
                    <IconButton aria-label="delete" size="large" onClick={handleCloseModal} sx={{ color: openColorBar.selectedColor, padding: "8px" }}>
                        <CloseIcon />
                    </IconButton>
                    :
                    <IconButton aria-label="delete" size="large" onClick={() => setShowAddArea(false)} sx={{ color: openColorBar.selectedColor, padding: "8px" }}>
                        <ArrowBackIcon />
                    </IconButton>
                }
                <div className='p-1'>
                    {selectedDateEventInfo.id ?
                        <>
                            <button className="p-2">
                                <FontAwesomeIcon icon={faTrash as IconProp} style={{ color: openColorBar.selectedColor }} />
                            </button>
                            <button className="p-2">
                                <FontAwesomeIcon icon={faPenToSquare as IconProp} style={{ color: openColorBar.selectedColor }} />
                            </button>
                        </>
                        :
                        <button className="p-2">
                            <FontAwesomeIcon icon={faCircleCheck as IconProp} style={{ color: openColorBar.selectedColor }} onClick={handleSubmit} />
                        </button>
                    }
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="text-gray-700 mb-4">
                    <DialogContentsDiv>
                        <input type="text" placeholder="제목" name="title" className="outline-none w-full px-1" defaultValue={dateData.title} ref={(e) => { toDoValueRef.current['title'] = e }} />
                    </DialogContentsDiv>
                    <DialogContentsDiv>
                        <div className="flex justify-between items-center my-1 px-1">
                            <div>
                                <FontAwesomeIcon icon={faClockRotateLeft as IconProp} style={{ color: openColorBar.selectedColor }} />
                                <span className="ml-2">하루종일</span>
                            </div>
                            <Switch
                                color="primary"
                                checked={isAllday}
                                onChange={handleIsAllday}
                                sx={{
                                    "& .MuiSwitch-thumb": { backgroundColor: openColorBar.selectedColor },
                                    "& .MuiSwitch-track": { backgroundColor: openColorBar.selectedColor },
                                    "& .Mui-checked+.MuiSwitch-track": { backgroundColor: openColorBar.selectedColor },
                                }}
                                inputRef={(e) => { toDoValueRef.current['allDay'] = e }}
                            />
                        </div>
                        <div className="flex justify-between items-center my-3 px-1">
                            <div>
                                <span className="ml-5-5">시작일</span>
                            </div>
                            <div className="flex items-center">
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={koLocale}>
                                    <DatePicker
                                        ref={dateRef}
                                        defaultValue={dayjs(dateData.start)}
                                        onChange={(date) => handleStartDate(date)}
                                        className={`w-22 sm:w-48 ${!dateValueCheck ? 'date-error' : ''}`}
                                        showDaysOutsideCurrentMonth
                                        format="YYYY-MM-DD"
                                        desktopModeMediaQuery="@media (min-width: 640px)"
                                        sx={{
                                            "& input": { height: "18px" },
                                            "& .MuiInputBase-root": { borderRadius: "32px" },
                                            "@media (max-width: 640px)": {
                                                "& input": { height: "8px", fontSize: "11px", textAlign: "center", padding: "14px 0 14px 14px" }
                                            },
                                            "& fieldset": { borderColor: openColorBar.selectedColor }
                                        }}
                                        inputRef={(e: any) => toDoValueRef.current['start'] = e}
                                        localeText={{
                                            toolbarTitle: '날짜 선택',
                                            cancelButtonLabel: '취소',
                                            okButtonLabel: '확인'
                                        }}
                                    />
                                    {!isAllday && <TimePicker
                                        ref={timeRef}
                                        className={
                                            `w-22 sm:w-48 custom-input ${(dayjs(`${dayjs(dateData.start).format('YYYY-MM-DD')}T${selectedTime.startTime}`) > dayjs(`${dayjs(dateData.end).format('YYYY-MM-DD')}T${selectedTime.endTime}`)) ? 'date-error' : ''}`
                                        }
                                        format="HH:mm:A"
                                        value={dayjs(selectedTime.startTime, 'HH:mm')}
                                        onChange={(date) => { handleStartTime(date) }}
                                        desktopModeMediaQuery="@media (min-width: 640px)"
                                        sx={{
                                            "& input": { height: "18px" },
                                            "& .MuiInputBase-root": { borderRadius: "32px" },
                                            "@media (max-width: 640px)": {
                                                "& input": { height: "8px", fontSize: "11px", textAlign: "center", padding: "14px 0 14px 14px" }
                                            },
                                            "& fieldset": { borderColor: openColorBar.selectedColor }
                                        }}
                                        localeText={{
                                            toolbarTitle: '시간 선택',
                                            cancelButtonLabel: '취소',
                                            okButtonLabel: '확인'
                                        }}
                                    />}
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className="flex justify-between items-center my-3 px-1">
                            <div>
                                <span className="ml-5-5">종료일</span>
                            </div>
                            <div className="flex items-center">
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={koLocale}>
                                    <DatePicker
                                        defaultValue={(dateData.allDay ? (dateData.start.split('T')[0] === dateData.end.split('T')[0] ? dayjs(dateData.end) : dayjs(dateData.end).add(-1, 'day')) : dayjs(dateData.end))}
                                        onChange={(date) => handleEndDate(date)}
                                        className={`w-22 sm:w-48 ${!dateValueCheck ? 'date-error' : ''}`}
                                        showDaysOutsideCurrentMonth
                                        format="YYYY-MM-DD"
                                        desktopModeMediaQuery="@media (min-width: 640px)"
                                        sx={{
                                            "& input": { height: "18px" },
                                            "& .MuiInputBase-root": { borderRadius: "32px" },
                                            "@media (max-width: 640px)": {
                                                "& input": { height: "8px", fontSize: "11px", textAlign: "center", padding: "14px 0 14px 14px" }
                                            },
                                            "& fieldset": { borderColor: openColorBar.selectedColor }
                                        }}
                                        inputRef={(e: any) => toDoValueRef.current['end'] = e}
                                        localeText={{
                                            toolbarTitle: '날짜 선택',
                                            cancelButtonLabel: '취소',
                                            okButtonLabel: '확인'
                                        }}
                                    />
                                    {!isAllday && <TimePicker
                                        className={
                                            `w-22 sm:w-48 custom-input ${(dayjs(`${dayjs(dateData.start).format('YYYY-MM-DD')}T${selectedTime.startTime}`) > dayjs(`${dayjs(dateData.end).format('YYYY-MM-DD')}T${selectedTime.endTime}`)) ? 'date-error' : ''}`
                                        }
                                        format="HH:mm:A"
                                        value={dayjs(selectedTime.endTime, 'HH:mm')}
                                        onChange={(date) => { handleEndTime(date) }}
                                        desktopModeMediaQuery="@media (min-width: 640px)"
                                        sx={{
                                            "& input": { height: "18px" },
                                            "& .MuiInputBase-root": { borderRadius: "32px" },
                                            "@media (max-width: 640px)": {
                                                "& input": { height: "8px", fontSize: "11px", textAlign: "center", padding: "14px 0 14px 14px" }
                                            },
                                            "& fieldset": { borderColor: openColorBar.selectedColor }
                                        }}
                                        localeText={{
                                            toolbarTitle: '시간 선택',
                                            cancelButtonLabel: '취소',
                                            okButtonLabel: '확인'
                                        }}
                                    />}
                                </LocalizationProvider>
                            </div>
                        </div>
                    </DialogContentsDiv>
                    <DialogContentsDiv>
                        <div className="flex justify-between items-center my-1 px-1">
                            <div>
                                <FontAwesomeIcon icon={faThumbTack as IconProp} style={{ color: openColorBar.selectedColor }} />
                                <span className="ml-2">중요일정</span>
                            </div>
                            <Switch
                                color="primary"
                                defaultChecked={dateData.important}
                                sx={{
                                    "& .MuiSwitch-thumb": { backgroundColor: openColorBar.selectedColor },
                                    "& .MuiSwitch-track": { backgroundColor: openColorBar.selectedColor },
                                    "& .Mui-checked+.MuiSwitch-track": { backgroundColor: openColorBar.selectedColor },
                                }}
                                inputRef={(e) => { toDoValueRef.current['important'] = e }}
                            />
                        </div>
                    </DialogContentsDiv>
                    <DialogContentsDiv>
                        <DialogUiColor handleDraw={handleDraw} selectedColor={openColorBar.selectedColor} colorName={openColorBar.colorName} />
                        <Drawer
                            open={openColorBar.open}
                            onClose={() => handleDraw(false)}
                            anchor={"bottom"}
                            style={{ zIndex: "9999" }}
                            sx={{ "& .MuiDrawer-paperAnchorBottom": { maxHeight: "50%" } }}
                        >
                            <UiColorButtons onClick={handleTaskColor} selectedColor={openColorBar.selectedColor} />
                        </Drawer>
                    </DialogContentsDiv>
                    <DialogContentsDiv>
                        <div className="w-full flex justify-between items-center mt-1 px-1">
                            <div>
                                <FontAwesomeIcon icon={faMapLocationDot as IconProp} style={{ color: openColorBar.selectedColor }} />
                                <span className="ml-2">위치</span>
                            </div>
                            <div>
                                <button
                                    className="border px-1 rounded mr-1 w-14 h-7"
                                    style={{ borderColor: openColorBar.selectedColor, color: (isKorea ? '#fff' : openColorBar.selectedColor), backgroundColor: (isKorea ? openColorBar.selectedColor : 'transparent'), fontSize: "12px" }}
                                    onClick={() => setIsKorea(true)}
                                >
                                    <span>국내</span>
                                </button>
                                <button
                                    className="border px-1 rounded w-14 h-7"
                                    style={{ borderColor: openColorBar.selectedColor, color: (!isKorea ? '#fff' : openColorBar.selectedColor), backgroundColor: (!isKorea ? openColorBar.selectedColor : 'transparent'), fontSize: "12px" }}
                                    onClick={() => setIsKorea(false)}
                                >
                                    <span>해외</span>
                                </button>
                            </div>
                        </div>
                        {isKorea &&
                            <>
                                <div className="w-full flex justify-end items-center mt-2 mb-1 px-1">
                                    <button className="border px-1 rounded mr-1 w-16 h-6" style={{ borderColor: openColorBar.selectedColor, color: openColorBar.selectedColor, fontSize: "12px" }} onClick={handleLocationDefault}>
                                        <FontAwesomeIcon icon={faArrowRotateLeft as IconProp} style={{ color: openColorBar.selectedColor }} />
                                        <span>초기화</span>
                                    </button>
                                    <button className="border px-1 rounded w-16 h-6" style={{ borderColor: openColorBar.selectedColor, color: openColorBar.selectedColor, fontSize: "12px" }} onClick={() => handleShowAddrSearch(true)}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} style={{ color: openColorBar.selectedColor }} />
                                        <span>검색</span>
                                    </button>
                                    <Drawer
                                        open={showAddrSearch}
                                        onClose={() => handleShowAddrSearch(false)}
                                        anchor={"bottom"}
                                        style={{ zIndex: "9999" }}
                                        sx={{ "& .MuiDrawer-paperAnchorBottom": { maxHeight: "100%" } }}
                                    >
                                        <KakaoAddrSearchForm selectedColor={openColorBar.selectedColor} handleSetKoreaAddr={handleSetKoreaAddr} />
                                    </Drawer>
                                </div>
                                <div>
                                    <div className="mb-1">{selectedAddr ? selectedAddr : '선택된 위치가 없습니다.'}</div>
                                    <KakaoMap mapCenter={{ lat: mapCenter.koreaLat, lng: mapCenter.koreaLng }} />
                                </div>
                            </>
                        }
                        {!isKorea &&
                            <>
                                <div className="w-full flex justify-end items-center mt-2 mb-1 px-1">
                                    <button className="border px-1 rounded mr-1 w-16 h-6" style={{ borderColor: openColorBar.selectedColor, color: openColorBar.selectedColor, fontSize: "12px" }} onClick={handleLocationDefault}>
                                        <FontAwesomeIcon icon={faArrowRotateLeft as IconProp} style={{ color: openColorBar.selectedColor }} />
                                        <span>초기화</span>
                                    </button>
                                    <button className="border px-1 rounded w-16 h-6" style={{ borderColor: openColorBar.selectedColor, color: openColorBar.selectedColor, fontSize: "12px" }} onClick={() => handleShowAddrSearch(true)}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} style={{ color: openColorBar.selectedColor }} />
                                        <span>검색</span>
                                    </button>
                                    <Drawer
                                        open={showAddrSearch}
                                        onClose={() => handleShowAddrSearch(false)}
                                        anchor={"bottom"}
                                        style={{ zIndex: "9999" }}
                                        sx={{ "& .MuiDrawer-paperAnchorBottom": { maxHeight: "100%" } }}
                                    >
                                        {/* <GoogleAddrSearchForm selectedColor={openColorBar.selectedColor} handleSetOverseaAddr={handleSetOverseaAddr} /> */}
                                        <OverseaAddrSearchForm selectedColor={openColorBar.selectedColor} handleSetOverseaAddr={handleSetOverseaAddr} />
                                    </Drawer>
                                </div>
                                <div>
                                    <div className="mb-1">{selectedAddrOversea ? selectedAddrOversea : '선택된 위치가 없습니다.'}</div>
                                    {/* <GoogleMaps mapCenter={{lat: mapCenter.overseasLat, lng: mapCenter.overseasLng}} /> */}
                                    <OverseaMap mapCenter={{ lat: mapCenter.overseasLat, lng: mapCenter.overseasLng }} />
                                </div>
                            </>
                        }
                    </DialogContentsDiv>
                    <DialogContentsDiv>
                        <textarea placeholder="일정내용" className="outline-none w-full px-1 min-h-20" ref={(e) => { toDoValueRef.current['description'] = e }} name="description" defaultValue={dateData.description}></textarea>
                    </DialogContentsDiv>
                </div>
            </DialogContent>
        </>
    );
};

export default AddArea;