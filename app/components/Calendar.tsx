'use client';

import { useRouter } from 'next/navigation';

import useModalStore from '../store/modal';
import useCalendarMenu from '../store/calendarMenu';
import useDateStore from '../store/date';
import ImportantTodoList from './ImportantTodoList';
import TodoListAll from './TodoListAll';

import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import { DateClickArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventApi } from '@fullcalendar/core/index.js';
import koLocale from '@fullcalendar/core/locales/ko';
import { AnimatePresence, motion } from 'framer-motion';

import dayjs from 'dayjs';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Badge from '@mui/material/Badge';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PushPinIcon from '@mui/icons-material/PushPin';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

const Calendar: React.FC = () => {
    const router = useRouter();

    const { bottomMenu, setBottomMenu } = useCalendarMenu();
    const { setShowTodoDialog, setIsTodoButton, setShowAddArea } = useModalStore();
    const { setClickedDate, setTodayDate } = useDateStore();
    
    const handleSearchBtn = () => {
        router.push('search');
        setIsTodoButton(true);
        setShowAddArea(false);
        setIsTodoButton(false);
    };

    const defaultStartDate: string = new Date().toISOString();

    const dateClickEvt = (arg: DateClickArg) => {
        arg.jsEvent.stopPropagation();
        arg.jsEvent.preventDefault();

        const todoEventList = arg.view.calendar.getEvents().map((event: EventApi) => {
            return {
                id: event.id,
                allDay: event.allDay,
                startStr: event.startStr,
                endStr: event.endStr,
                title: event.title,
                backgroundColor: event.backgroundColor
            };
        });

        setClickedDate(arg.dateStr);
        setShowTodoDialog(true);
        console.log(todoEventList);
    };

    const desktopMenuEvt = (value: string) => {
        // if (value === 'importantTodo') {
        //   dispatch(dateAction.getImportantTodoList());
        // }

        setBottomMenu(value);
    };

    const handleBottomMenuChange = (event: React.SyntheticEvent, newValue: string) => {
        if (newValue !== 'todo') {
            setBottomMenu(newValue);
        } else {
            todoButtonEvt();
        }
    };

    const todoButtonEvt = () => {
        setIsTodoButton(true);
        setShowTodoDialog(true);
        setShowAddArea(true);
        setTodayDate();
    };

    const slideVariants = {
        hidden: { x: '-100%', opacity: 0 },
        visible: { x: '0%', opacity: 1 },
        exit: { x: '-100%', opacity: 0 },
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
                key="calendar"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={transitionSettings}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >
                {bottomMenu === 'calendar' &&
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        editable={false}
                        // height={calendarHeight}
                        locale={koLocale}
                        customButtons={{
                            searchButton: {
                                icon: 'bi bi-search',
                                click: () => { handleSearchBtn() },
                            },
                            logout: {
                                click: () => { }
                            },
                        }}
                        headerToolbar={{
                            left: 'prev,next today logout',
                            center: 'title',
                            right: 'searchButton',
                        }}
                        dateClick={dateClickEvt}
                        // events={ }
                        displayEventTime={false}
                        timeZone='UTC'
                    />
                }
                {bottomMenu === 'importantTodo' &&
                    <ImportantTodoList />
                }
                {bottomMenu === 'all' &&
                    <TodoListAll />
                }
                <SpeedDial
                    ariaLabel="Desktop SpeedDial"
                    icon={<SpeedDialIcon />}
                    sx={{
                        display: "none",
                        "@media (min-width:720px)": {
                            display: "flex",
                            position: "absolute",
                            bottom: "30px",
                            right: "30px",
                        }
                    }}
                    direction="up"
                >
                    <SpeedDialAction key="calendar" icon={<CalendarMonthIcon />} tooltipTitle="캘린더" onClick={() => desktopMenuEvt('calendar')} />
                    <SpeedDialAction key="todo" icon={<AddCircleOutlineIcon />} tooltipTitle="일정 추가" onClick={() => todoButtonEvt()} />
                    <SpeedDialAction key="all" icon={<FormatListBulletedIcon />} tooltipTitle="일정 목록" onClick={() => desktopMenuEvt('all')} />
                    <SpeedDialAction
                        key="importantTodo"
                        icon={
                            <Badge
                                // badgeContent={
                                //     importantMyTodoList.filter((i) => {
                                //         const importantEndDate: string = i.allDay ? dayjs(i.end).add(-1, 'day').format('YYYY-MM-DD') : i.end.split('T')[0];
                                //         const importantEndDday: number = dayjs(importantEndDate).startOf('day').diff(dayjs().startOf('day'), 'day');

                                //         return (
                                //             importantEndDday >= 0 && importantEndDday <= 3
                                //         )
                                //     }).length
                                // }
                                color="error">
                                <PushPinIcon />
                            </Badge>
                        }
                        tooltipTitle="중요 일정"
                        onClick={() => desktopMenuEvt('importantTodo')}
                    />
                </SpeedDial>
                <Box sx={{
                    width: "100%",
                    height: "8%",
                    display: "block",
                    "& .MuiBottomNavigationAction-root": { color: "#2c3e50" },
                    "@media (min-width:720px)": {
                        display: "none"
                    }
                }}>
                    <BottomNavigation
                        showLabels
                        // value={bottomMenu}
                        onChange={handleBottomMenuChange}
                        sx={{
                            width: "100%",
                            height: "100%",
                            paddingTop: "12px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignContent: "center"
                        }}
                    >
                        <BottomNavigationAction label="캘린더" value="calendar" icon={<CalendarMonthIcon />} />
                        <BottomNavigationAction label="일정 추가" value="todo" icon={<AddCircleOutlineIcon />} sx={{ color: "#DC143C !important" }} />
                        <BottomNavigationAction label="일정 목록" value="all" icon={<FormatListBulletedIcon />} />
                        <BottomNavigationAction
                            label="중요 일정"
                            value="importantTodo"
                            icon={
                                <Badge
                                    // badgeContent={
                                    //     importantMyTodoList.filter((i) => {
                                    //         const importantEndDate: string = i.allDay ? dayjs(i.end).add(-1, 'day').format('YYYY-MM-DD') : i.end.split('T')[0];
                                    //         const importantEndDday: number = dayjs(importantEndDate).startOf('day').diff(dayjs().startOf('day'), 'day');

                                    //         return (
                                    //             importantEndDday >= 0 && importantEndDday <= 3
                                    //         )
                                    //     }).length
                                    // }
                                    color="error">
                                    <PushPinIcon />
                                </Badge>
                            }
                        // onClick={() => dispatch(dateAction.getImportantTodoList())}
                        />
                    </BottomNavigation>
                </Box>
            </motion.div>
        </AnimatePresence>
    );
};

export default Calendar;