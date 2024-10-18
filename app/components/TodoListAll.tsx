import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import useDateStore from '../store/date';
import useModalStore from "../store/modal";
import useToastStore from '../store/toast';

import dayjs, { Dayjs } from 'dayjs';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import RefreshIcon from '@mui/icons-material/Refresh';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ko';

interface FilterListInterface {
    name: string;
    value: string;
}

interface FilterDateInterface {
    startVal: string | null;
    endVal: string | null;
}

const FILTER_LIST: FilterListInterface[] = [
    {
        name: '전체',
        value: 'all'
    },
    {
        name: '종료 일정',
        value: 'end'
    },
    {
        name: '진행 일정',
        value: 'ongoing'
    },
];

interface TodoListInterface {
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
    user: string;
}

const koLocale: string = dayjs.locale('ko');

const TodoListAll: React.FC = () => {
    const { data: session } = useSession();
    const { todoList, setSelectedDateEventInfo } = useDateStore();
    const { setShowAddArea, setIsTodoButton, setShowTodoDialog } = useModalStore();
    const { showToast } = useToastStore();

    const [filter, setFilter] = useState<Array<string>>(FILTER_LIST.map(f => f.value));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [dateAnchorEl, setDateAnchorEl] = useState<null | HTMLElement>(null);
    const [myTodoListAll, setMyTodoListAll] = useState<Array<TodoListInterface>>([]);
    const [filterDate, setFilterDate] = useState<FilterDateInterface>({
        startVal: null,
        endVal: null
    });
    const [checkFilterDate, setCheckFilterDate] = useState<boolean>(true);

    const dateRef = useRef<HTMLDivElement | null>(null);
    const startDate = useRef<HTMLInputElement | null>(null);
    const endDate = useRef<HTMLInputElement | null>(null);

    const open = Boolean(anchorEl);
    const dateOpen = Boolean(dateAnchorEl);

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDateAnchorEl(event.currentTarget);
        setCheckFilterDate(true);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    const handleDateClose = () => {
        setDateAnchorEl(null);
    };

    const handleCheck = (value: string, isChecked: boolean) => {
        if (value === 'all') {
            setFilter(isChecked ? FILTER_LIST.map(f => f.value) : []);
        } else {
            setFilter((prevFilter) => {
                const newFilter = isChecked
                    ? [...prevFilter, value]
                    : prevFilter.filter(f => f !== value);

                if (newFilter.length === FILTER_LIST.length - 1 && !newFilter.includes('all')) {
                    return [...newFilter, 'all'];
                }

                if (newFilter.includes('all') && !isChecked) {
                    return newFilter.filter(f => f !== 'all');
                }

                return newFilter;
            });
        }
    };

    const handleClickTodo = (id: string) => {
        setSelectedDateEventInfo(id);
        setShowAddArea(true);
        setIsTodoButton(true)
        setShowTodoDialog(true);
    };

    const handleStartDate = (date: Dayjs | null) => {
        const start = dayjs(date).format('YYYY-MM-DD');
        const end = ((endDate.current) as HTMLInputElement).value;

        if(start && end) {
            if (start > end) {
                showToast('시작일과 종료일이 올바르지 않습니다.', { type: 'error' });
                setCheckFilterDate(false);
                return;
            } else {
                setCheckFilterDate(true);
                setFilterDate((prev) => {
                    return {
                        ...prev,
                        startVal: start,
                        endVal: end
                    }
                });
            }
        }
    };

    const handleEndDate = (date: Dayjs | null) => {
        const end = dayjs(date).format('YYYY-MM-DD');
        const start = ((startDate.current) as HTMLInputElement).value;

        if(start && end) {
            if (start > end) {
                showToast('시작일과 종료일이 올바르지 않습니다.', { type: 'error' });
                setCheckFilterDate(false);
                return;
            } else {
                setCheckFilterDate(true);
                setFilterDate((prev) => {
                    return {
                        ...prev,
                        startVal: start,
                        endVal: end
                    }
                });
            }
        }
    };

    const handleRefreshFilter = () => {
        setFilterDate((prev) => {
            return {
                ...prev,
                startVal: null,
                endVal: null
            }
        });

        setFilter(FILTER_LIST.map(f => f.value));
    };

    const stopLabelEvt = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    useEffect(() => {
        let filteredList = todoList.filter((todo) => {
            const isEndDate = todo.allDay ? dayjs(todo.end).add(-1, 'day').format('YYYY-MM-DD') : todo.end.split('T')[0];
            const isOngoing = dayjs(isEndDate).startOf('day').diff(dayjs().startOf('day'), 'day');

            if (filter.includes('all')) {
                return true;
            }

            if (filter.includes('end') && isOngoing < 0) {
                return true;
            }

            if (filter.includes('ongoing') && isOngoing >= 0) {
                return true;
            }

            return false;
        });

        if (filterDate.startVal && filterDate.endVal) {
            filteredList = filteredList.filter((t) => {
                if (!t.allDay) {
                    return dayjs(filterDate.startVal).format('YYYY-MM-DD') <= dayjs(t.start.split('T')[0]).format('YYYY-MM-DD')
                        &&
                        dayjs(filterDate.endVal).format('YYYY-MM-DD') >= dayjs(t.end.split('T')[0]).format('YYYY-MM-DD');
                } else {
                    return dayjs(filterDate.startVal).format('YYYY-MM-DD') <= dayjs(t.start.split('T')[0]).format('YYYY-MM-DD')
                        &&
                        dayjs(filterDate.endVal).format('YYYY-MM-DD') >= dayjs(t.end.split('T')[0]).add(-1, 'day').format('YYYY-MM-DD');
                }
            });
        } 

        setMyTodoListAll((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(filteredList)) {
                return filteredList;
            }
            return prev;
        });

    }, [filter, todoList, session, filterDate]);

    return (
        <>
            <div className="w-full h-10 flex items-center pb-2 relative">
                <span className="absolute left-1/2 transform -translate-x-1/2 text-lg">일정 목록</span>
                <div className="mr-auto">
                    <Button
                        id="basic-date-button"
                        aria-controls={dateOpen ? 'basic-date-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={dateOpen ? 'true' : undefined}
                        onClick={handleDateClick}
                        style={{
                            backgroundColor: "#1976d2",
                            color: "#fff",
                            padding: "2px",
                            minWidth: "48px"
                        }}
                    >
                        기간
                    </Button>
                    <Menu
                        id="basic-date-menu"
                        anchorEl={dateAnchorEl}
                        open={dateOpen}
                        onClose={handleDateClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-date-button',
                        }}
                        sx={{
                            "& ul": { padding: "2px" }
                        }}
                    >
                        <li className="p-1 m-1">
                            <FormControlLabel
                                style={{ margin: 0 }}
                                sx={{
                                    "& span": { fontSize: "14px" }
                                }}
                                control={
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={koLocale}>
                                        <DatePicker
                                            ref={dateRef}
                                            value={filterDate.startVal ? dayjs(filterDate.startVal) : null}
                                            onChange={(date) => handleStartDate(date)}
                                            className={`w-22 ml-1 sm:w-48 ${!checkFilterDate ? 'date-error' : ''}`}
                                            showDaysOutsideCurrentMonth
                                            format="YYYY-MM-DD"
                                            desktopModeMediaQuery="@media (min-width: 640px)"
                                            sx={{
                                                "& input": { height: "18px" },
                                                "@media (max-width: 640px)": {
                                                    "& input": { height: "8px", fontSize: "9px", textAlign: "center", padding: "14px 0 14px 14px" }
                                                },
                                                "& fieldset": { borderColor: "#3788d8" }
                                            }}
                                            inputRef={startDate}
                                            localeText={{
                                                toolbarTitle: '날짜 선택',
                                                cancelButtonLabel: '취소',
                                                okButtonLabel: '확인'
                                            }}
                                        />
                                    </LocalizationProvider>
                                }
                                label={'시작일'}
                                labelPlacement='start'
                                onClick={stopLabelEvt}
                            />
                        </li>
                        <li className="p-1 m-1">
                            <FormControlLabel
                                style={{ margin: 0 }}
                                sx={{
                                    "& span": { fontSize: "14px" }
                                }}
                                control={
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={koLocale}>
                                        <DatePicker
                                            value={filterDate.endVal ? dayjs(filterDate.endVal) : null}
                                            onChange={(date) => handleEndDate(date)}
                                            className={`w-22 ml-1 sm:w-48 ${!checkFilterDate ? 'date-error' : ''}`}
                                            showDaysOutsideCurrentMonth
                                            format="YYYY-MM-DD"
                                            desktopModeMediaQuery="@media (min-width: 640px)"
                                            sx={{
                                                "& input": { height: "18px" },
                                                "@media (max-width: 640px)": {
                                                    "& input": { height: "8px", fontSize: "9px", textAlign: "center", padding: "14px 0 14px 14px" }
                                                },
                                                "& fieldset": { borderColor: "#3788d8" }
                                            }}
                                            inputRef={endDate}
                                            localeText={{
                                                toolbarTitle: '날짜 선택',
                                                cancelButtonLabel: '취소',
                                                okButtonLabel: '확인'
                                            }}
                                        />
                                    </LocalizationProvider>
                                }
                                label={'종료일'}
                                labelPlacement='start'
                                onClick={stopLabelEvt}
                            />
                        </li>
                    </Menu>
                    <Button
                        id="basic-refresh-button"
                        style={{
                            backgroundColor: "#708090",
                            color: "#fff",
                            padding: "2px",
                            minWidth: "36px",
                            height: "28.5px",
                            marginLeft: "4px"
                        }}
                        onClick={handleRefreshFilter}
                    >
                        <RefreshIcon fontSize='small' />
                    </Button>
                </div>
                <div className="ml-auto">
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleFilterClick}
                        style={{
                            backgroundColor: "#1976d2",
                            color: "#fff",
                            padding: "2px",
                            minWidth: "48px"
                        }}
                    >
                        필터
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleFilterClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        sx={{
                            "& ul": { padding: "2px" }
                        }}
                    >
                        {
                            FILTER_LIST.map((f) => {
                                return (
                                    <li className="p-1" key={f.value}>
                                        <FormControlLabel
                                            style={{ margin: 0 }}
                                            sx={{
                                                "& span": { fontSize: "14px" }
                                            }}
                                            control={
                                                <Checkbox
                                                    style={{ padding: 0 }}
                                                    checked={filter.includes(f.value)}
                                                    value={f.value}
                                                    onChange={(e) => handleCheck(e.target.value, e.target.checked)}
                                                />
                                            }
                                            label={f.name}
                                        />
                                    </li>
                                );
                            })
                        }
                    </Menu>
                </div>
            </div>
            <div style={{ width: "100%", height: "calc(92% - 2.5rem)", overflowY: "auto" }}>
                {
                    (myTodoListAll.length > 0) ?
                        myTodoListAll.sort((a, b) => {
                            const dateA = new Date(a.end.split('T')[0]);
                            const dateB = new Date(b.end.split('T')[0]);

                            return dateA.getTime() - dateB.getTime();
                        }).map((i) => {
                            const endDay: string = i.allDay ? dayjs(i.end).add(-1, 'day').format('YYYY-MM-DD') : i.end.split('T')[0];
                            const endDday: number = dayjs(endDay).startOf('day').diff(dayjs().startOf('day'), 'day');

                            return (
                                <div key={i.id} className="p-2 border border-gray-300 rounded-xl shadow mb-3 flex cursor-pointer hover:bg-gray-100" onClick={() => handleClickTodo(i.id)}>
                                    <div className="w-4 rounded-md mr-2" style={{ backgroundColor: `${i.color}` }}></div>
                                    <div style={{ width: "calc(100% - 1.5rem)" }}>
                                        <div className="overflow-hidden text-ellipsis whitespace-nowrap">{i.title}</div>
                                        <div className="flex justify-between">
                                            <div>{`시작일 ${i.start.split('T')[0]}`}</div>
                                            {
                                                i.important &&
                                                <div>
                                                    <i className="bi bi-pin-fill" style={{ color: `${i.color}` }}></i>
                                                    <span>중요 일정</span>
                                                </div>
                                            }
                                        </div>
                                        <div className="flex justify-between">
                                            <div>{`종료일 ${endDay}`}</div>
                                            <div>
                                                {
                                                    (endDday > 0) ?
                                                        (
                                                            (endDday <= 3) ?
                                                                <>
                                                                    <i className="bi bi-alarm text-red-500">
                                                                        {` D-day ${endDday}일`}
                                                                    </i>
                                                                </>
                                                                :
                                                                ` D-day ${endDday}일`
                                                        )
                                                        :
                                                        (
                                                            (endDday === 0) ?
                                                                <>
                                                                    <i className="bi bi-alarm text-red-500">
                                                                        {'D-day 오늘'}
                                                                    </i>
                                                                </>
                                                                :
                                                                '종료된 일정'
                                                        )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="w-full h-full flex items-center justify-center text-base">
                            등록된 일정이 없습니다.
                        </div>
                }
            </div>
        </>
    );
};

export default TodoListAll;