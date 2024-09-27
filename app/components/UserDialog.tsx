'use client';

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import useModalStore from '../store/modal';
import useUserStore from '../store/user';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';

const UserDialog: React.FC = () => {
    const { showUserDialog, setShowUserDialog } = useModalStore();
    const { data: session, status } = useSession();

    const [logOutComfirm, setLogOutComfirm] = useState<boolean>(false);

    const handleLogout = () => {
        setLogOutComfirm(false);
        setShowUserDialog(false);
        signOut({ callbackUrl: '/' });
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
                                    <button type="button" style={{ color: "#2c3e50", paddingRight: "4px" }} title='로그아웃' onClick={() => setLogOutComfirm(true)}>
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
                        <DialogContent style={{padding: "20px 24px"}}>
                            <div className="w-full grid">
                                <div>등록된 일정: 20</div>
                                <div className="w-full flex">
                                    <div className="w-1/3">진행 일정: <span style={{color: '#3788d8'}}>14</span></div>
                                    <div className="w-1/3">종료 일정: <span style={{color: '#708090'}}>6</span></div>
                                    <div className="w-1/3">중요 일정: <span style={{color: '#DC143C'}}>6</span></div>
                                </div>
                                <div className="flex items-center justify-end pt-2 text-slate-500">
                                    <button className="flex items-center">
                                        <span className="pr-1">개인정보 제공 동의</span>
                                        <HelpIcon fontSize='small'/>
                                    </button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Dialog
                        open={logOutComfirm}
                        onClose={() => setLogOutComfirm(false)}
                        fullWidth={true}
                    >
                        <DialogTitle>
                            로그아웃
                        </DialogTitle>
                        <DialogContent>
                            로그아웃 하시겠습니까?<br />
                            완료된 후 로그인 페이지로 이동합니다.
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={() => setLogOutComfirm(false)}>
                                취소
                            </Button>
                            <Button autoFocus onClick={handleLogout}>
                                확인
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
        </>
    )
};

export default UserDialog;