'use client';

import { signOut } from 'next-auth/react';
import useModalStore from '../store/modal';
import useUserStore from '../store/user';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { blue } from '@mui/material/colors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const UserDialog: React.FC = () => {
    const { showUserDialog, setShowUserDialog } = useModalStore();
    const { setUserInfo } = useUserStore();

    const handleLogout = () => {
        setShowUserDialog(false);
        signOut({ callbackUrl: '/' });
    };

    return (
        <>
            {showUserDialog &&
                <Dialog
                    open={showUserDialog}
                    onClose={() => setShowUserDialog(false)}
                >
                    <DialogTitle style={{ padding: "10px 16px", borderBottom: "1px solid #eee" }}>
                        <div className="flex justify-between items-center">
                            {/* <div className="flex items-center">
                        {
                            !userImg &&
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600], marginRight: "8px" }}>
                                <PersonIcon />
                            </Avatar>
                        }
                        {
                            userImg &&
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600], marginRight: "8px" }}>
                                <img src={userImg} />
                            </Avatar>
                        }
                        {` ${userName}님`}
                    </div> */}
                            <button type="button" style={{ color: "#2c3e50" }} onClick={() => setShowUserDialog(false)}>
                                <FontAwesomeIcon icon={faXmark as IconProp} />
                            </button>
                        </div>
                    </DialogTitle>
                    <List sx={{ pt: 0 }}>
                        <ListItem disableGutters>
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                        <ManageAccountsIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={'개인정보동의 내역 수정'}></ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                        <LogoutIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={'로그아웃'}></ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Dialog>
            }
        </>
    )
};

export default UserDialog;