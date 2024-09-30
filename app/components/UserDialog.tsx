'use client';

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import useModalStore from '../store/modal';

import ComfirmDialog from './dialog/ComfrimDialog';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Avatar from '@mui/material/Avatar';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { blue } from '@mui/material/colors';

interface ComfirmTextInterface {
    title: string;
    body: string;
}

const UserDialog: React.FC = () => {
    const { showUserDialog, setShowUserDialog } = useModalStore();
    const { data: session, status } = useSession();

    const [showComfirm, setShowComfirm] = useState<boolean>(false);
    const [comfirmText, setComfirmText] = useState<ComfirmTextInterface>({
        title: '',
        body: '',
    });

    const comfirmComment:any = {
        logoutTitle: '로그아웃',
        logoutBody: '로그아웃 하시겠습니까?\n완료된 후 로그인 페이지로 이동합니다.',
        disconnectTitle: '연결 해제',
        disconnectBody: '카카오 계정 연결을 해제하시겠습니까?\n해제 후 재이용 시 로그인을 필요로 하며 등록된 데이터는 지워지지 않습니다.',
    };

    const handleCloseComfirmDialog = () => {
        setShowComfirm(false);
        setComfirmText((prev) => {
            return {
                ...prev,
                title: '',
                body: ''
            }
        });
    };

    const handleComfirm = (title: string, body: string) => {
        setShowComfirm(true);
        setComfirmText((prev) => {
            return {
                ...prev,
                title: title,
                body: body
            }
        });
    };

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
                                <div>등록된 일정: 20</div>
                                <div className="w-full grid pb-6">
                                    <div className="w-full">진행 일정: <span style={{ color: '#3788d8' }}>14</span></div>
                                    <div className="w-full">종료 일정: <span style={{ color: '#708090' }}>6</span></div>
                                    <div className="w-full">중요 일정: <span style={{ color: '#DC143C' }}>6</span></div>
                                </div>
                                <div className="flex items-center justify-between text-slate-500">
                                    <button className="flex items-center text-xs text-red-500 hover:text-red-300" onClick={() => handleComfirm(comfirmComment.disconnectTitle, comfirmComment.disconnectBody)}>
                                        <span className="pr-1">계정 연결 해제</span>
                                        <FontAwesomeIcon icon={faUserSlash as IconProp} />
                                    </button>
                                    <button className="flex items-center">
                                        <span className="pr-1">개인정보 제공 동의</span>
                                        <HelpIcon fontSize='small' />
                                    </button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    {showComfirm && <ComfirmDialog showComfirm={showComfirm} handleCloseComfirmDialog={handleCloseComfirmDialog} comfirmText={comfirmText} />}
                </>
            }
        </>
    )
};

export default UserDialog;