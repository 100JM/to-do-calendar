'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

import UseTodoList from '../hooks/useSWR/useTodoList';
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

import sanitizeHtml from 'sanitize-html';
import dayjs from 'dayjs';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BasicProfile from '../public/images/basic_profile.png';

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
    const { data: session, status } = useSession();

    const { bottomMenu, setBottomMenu, isFadeIn } = useCalendarMenu();
    const { setShowTodoDialog, setIsTodoButton, setShowAddArea, setShowUserDialog } = useModalStore();
    const { setClickedDate, setTodayDate, todoList, setSelectedDateEventList } = useDateStore();

    const logOutBtnRef = useRef<HTMLButtonElement | null>(null);

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

    const fadeVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const fadeTransitionSettings = {
        duration: 1,
        ease: "easeInOut"
    };

    const handleSearchBtn = () => {
        router.push('search');
        setIsTodoButton(true);
        setShowAddArea(false);
    };

    const handleUserBtn = () => {
        setShowUserDialog(true);
    }

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

        const selectedDateEvt = todoEventList.filter((evt) => {
            if (!evt.allDay) {
                const evtEndStr = evt.endStr ? evt.endStr : evt.startStr;
                return dayjs(evt.startStr.split('T')[0]).format('YYYY-MM-DD') <= arg.dateStr
                    &&
                    arg.dateStr <= dayjs(evtEndStr.split('T')[0]).format('YYYY-MM-DD');
            } else {
                return dayjs(evt.startStr.split('T')[0]).format('YYYY-MM-DD') <= arg.dateStr
                    &&
                    arg.dateStr < dayjs(evt.endStr.split('T')[0]).format('YYYY-MM-DD');
            }
        });

        setClickedDate(arg.dateStr);
        setShowTodoDialog(true);
        setSelectedDateEventList(selectedDateEvt);
    };

    const desktopMenuEvt = (value: string) => {
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

    const { isLoading } = UseTodoList(session?.userId);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/');
        }

        const timer = setTimeout(() => {

            if (typeof window !== 'undefined') {
                logOutBtnRef.current = document.querySelector('.fc-logout-button');
    
                const userImg = (session?.user?.image) ? session.user.image : BasicProfile.src;
                const userName = (session?.user?.name) ? `${session.user?.name} 님` : '';
    
                if (logOutBtnRef.current && bottomMenu === 'calendar') {
                    const unsafeHtml = `
                    <div class="no-user-img">
                        <img class="default-person-img" src=${userImg} /><span>${userName}</span>
                    </div>
                `;
    
                    const cleanHtml = sanitizeHtml(unsafeHtml, {
                        allowedTags: ['div', 'img', 'span'],
                        allowedAttributes: {
                            '*': ['class', 'src', 'alt'],
                        },
                    });
    
                    ((logOutBtnRef.current) as HTMLButtonElement).innerHTML = cleanHtml;
                }
            }

        }, 0); // Fullcalendar의 커스텀버튼 렌더링 시점이 맞는 않는것으로 의심되어 bottomMenu가 변경되었을 시 제대로 반영되지 않아 setTimeout을 걸었음

        return () => {
            clearTimeout(timer);
            if (logOutBtnRef.current) {
                logOutBtnRef.current = null;
            }
        };

    }, [router, status, session, bottomMenu, isLoading]);

    return (
        <>
            {status === 'unauthenticated' && isLoading ?
                null
                :
                <AnimatePresence>
                    <motion.div
                        key="calendar"
                        variants={isFadeIn ? fadeVariants : slideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={isFadeIn ? fadeTransitionSettings : transitionSettings}
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
                                locale={koLocale}
                                customButtons={{
                                    searchButton: {
                                        icon: 'bi bi-search',
                                        click: () => { handleSearchBtn() },
                                    },
                                    logout: {
                                        click: () => { handleUserBtn() }
                                    },
                                }}
                                headerToolbar={{
                                    left: 'prev,next today logout',
                                    center: 'title',
                                    right: 'searchButton',
                                }}
                                dateClick={dateClickEvt}
                                events={todoList}
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
                                        badgeContent={
                                            todoList.filter((t) => t.important).filter((i) => {
                                                const importantEndDate: string = i.allDay ? dayjs(i.end).add(-1, 'day').format('YYYY-MM-DD') : i.end.split('T')[0];
                                                const importantEndDday: number = dayjs(importantEndDate).startOf('day').diff(dayjs().startOf('day'), 'day');

                                                return (
                                                    importantEndDday >= 0 && importantEndDday <= 3
                                                );
                                            }).length
                                        }
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
                                value={bottomMenu}
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
                                            badgeContent={
                                                todoList.filter((t) => t.important).filter((i) => {
                                                    const importantEndDate: string = i.allDay ? dayjs(i.end).add(-1, 'day').format('YYYY-MM-DD') : i.end.split('T')[0];
                                                    const importantEndDday: number = dayjs(importantEndDate).startOf('day').diff(dayjs().startOf('day'), 'day');

                                                    return (
                                                        importantEndDday >= 0 && importantEndDday <= 3
                                                    );
                                                }).length
                                            }
                                            color="error">
                                            <PushPinIcon />
                                        </Badge>
                                    }
                                />
                            </BottomNavigation>
                        </Box>
                    </motion.div>
                </AnimatePresence>
            }

        </>
    );
};

export default Calendar;