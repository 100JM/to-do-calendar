'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import useModalStore from '../store/modal';
import useDateStore from '../store/date';

import ComfirmDialog from './dialog/ComfrimDialog';
import dayjs from 'dayjs';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { blue } from '@mui/material/colors';

interface myTodoListCntInterface {
    all: number;
    ongoing: number;
    ended: number;
    important: number;
}

const defaultDate: string = new Date().toISOString();

const UserDialog: React.FC = () => {
    const { data: session } = useSession();
    const { showUserDialog, setShowUserDialog, showComfirm, setShowComfirm, setComfirmText } = useModalStore();
    const { todoList } = useDateStore();

    const [myTodoListCnt, setMyTodoListCnt] = useState<myTodoListCntInterface>({
        all: 0,
        ongoing: 0,
        ended: 0,
        important: 0,
    });

    const comfirmComment = {
        logoutTitle: '로그아웃',
        logoutBody: '로그아웃 하시겠습니까?\n완료된 후 로그인 페이지로 이동합니다.',
        disconnectTitle: '연결 해제',
        disconnectBody: '카카오 계정 연결을 해제하시겠습니까?\n해제 후 재이용 시 로그인을 필요로 하며 등록된 데이터는 지워지지 않습니다.',
    };

    const handleComfirm = (title: string, body: string) => {
        setShowComfirm(true);
        setComfirmText({
            title: title,
            body: body
        });
    };

    useEffect(() => {
        const all = todoList;
        const ongoing = all.filter((o) => {
            const todoEnday = o.allDay ? dayjs(o.end).add(-1, 'day').format('YYYY-MM-DD') : o.end.split('T')[0];
            return todoEnday >= dayjs(defaultDate).format('YYYY-MM-DD');
        }).length;
        const ended = all.filter((e) => {
            const todoEnday = e.allDay ? dayjs(e.end).add(-1, 'day').format('YYYY-MM-DD') : e.end.split('T')[0];
            return todoEnday < dayjs(defaultDate).format('YYYY-MM-DD');
        }).length;
        const important = all.filter((i) => i.important).length;

        setMyTodoListCnt((prev) => {
            return {
                ...prev,
                all: all.length,
                ongoing: ongoing,
                ended: ended,
                important: important
            }
        });
    }, [session, todoList])

    return (
        <>
            {showUserDialog &&
                <>
                    <Dialog
                        open={showUserDialog}
                        onClose={() => setShowUserDialog(false)}
                        fullWidth={true}
                    >
                        <DialogTitle style={{ padding: "10px 16px", borderBottom: "1px solid #eee" }}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center h-full">
                                    <Avatar sx={{ bgcolor: blue[100], color: blue[600], marginRight: "8px" }}>
                                        {session?.user?.image ?
                                            <Image src={session?.user?.image} alt='user_img' width={50} height={50} />
                                            :
                                            <PersonIcon />
                                        }
                                    </Avatar>
                                    <div className="grid text-xs">
                                        <span>{`${session?.user?.name} 님`}</span>
                                        <span className="text-slate-500">{session?.user?.email ? session.user.email : '이메일 제공 비동의'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center h-full">
                                    <button type="button" style={{ color: "#2c3e50", paddingRight: "4px" }} title='로그아웃' onClick={() => handleComfirm(comfirmComment.logoutTitle, comfirmComment.logoutBody)}>
                                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                            <LogoutIcon />
                                        </Avatar>
                                    </button>
                                    <button type="button" style={{ color: "#2c3e50" }} title='닫기' onClick={() => setShowUserDialog(false)}>
                                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                            <CloseIcon />
                                        </Avatar>
                                    </button>
                                </div>
                            </div>
                        </DialogTitle>
                        <DialogContent style={{ padding: "20px 24px" }}>
                            <div className="w-full grid">
                                <div>등록된 일정: {myTodoListCnt.all}</div>
                                <div className="w-full grid pb-6">
                                    <div className="w-full">진행 일정: <span style={{ color: '#3788d8' }}>{myTodoListCnt.ongoing}</span></div>
                                    <div className="w-full">종료 일정: <span style={{ color: '#708090' }}>{myTodoListCnt.ended}</span></div>
                                    <div className="w-full">중요 일정: <span style={{ color: '#DC143C' }}>{myTodoListCnt.important}</span></div>
                                </div>
                                <div className="flex items-center justify-between text-slate-500">
                                    <div className="flex items-center text-xs">
                                        <span className="pr-1">로그인 제공 : {session?.provider}</span>
                                    </div>
                                    {
                                        session?.provider === 'kakao' ?
                                        <button className="flex items-center text-xs text-red-500 hover:text-red-300" onClick={() => handleComfirm(comfirmComment.disconnectTitle, comfirmComment.disconnectBody)}>
                                            <span className="pr-1">계정 연결 해제</span>
                                            <FontAwesomeIcon icon={faUserSlash as IconProp} />
                                        </button>
                                        :
                                        null
                                    }
                                    {/* <button className="flex items-center">
                                        <span className="pr-1">개인정보 제공 동의</span>
                                        <HelpIcon fontSize='small' />
                                    </button> */}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    {showComfirm && <ComfirmDialog />}
                </>
            }
        </>
    )
};

export default UserDialog;