import useModalStore from '@/app/store/modal';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { faUserSlash, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ComfirmInterface {
    showComfirm: boolean;
    handleCloseComfirmDialog: () => void;
    comfirmText: {
        title: string,
        body: string,
    };
}

const ComfirmDialog: React.FC<ComfirmInterface> = ({ showComfirm, handleCloseComfirmDialog, comfirmText }) => {
    const { data: session, status } = useSession();

    const { setShowUserDialog } = useModalStore();
    const accessToken: string | undefined = session?.accessToken;

    const handleLogout = () => {
        handleCloseComfirmDialog();
        setShowUserDialog(false);
        signOut({ callbackUrl: '/' });
    };

    const handleComfirm = () => {
        if (comfirmText.title === '로그아웃') {
            handleLogout();
        } else if (comfirmText.title === '연결 해제') {
            handleDisconnect();
        }
    };

    const handleDisconnect = async () => {
        try {
            const disconnectResponse = await fetch('https://kapi.kakao.com/v1/user/unlink', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });

            if (disconnectResponse.ok) {
                handleLogout();
            } else {
                alert('오류 발생: 새로고침 후 다시 시도해주세요.');
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleServiceTerms = async () => {
        const scopesToRevoke: string = 'account_email, profile';

        try {
            const response = await fetch('https://kapi.kakao.com/v2/user/revoke/service_terms', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    tags: scopesToRevoke,
                }),
            });

            if (response.ok) {
                console.log(response);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog
            open={showComfirm}
            onClose={handleCloseComfirmDialog}
            fullWidth={true}
        >
            <DialogTitle style={{color: "#1976d2"}}>
                {`${comfirmText.title} `}
                <FontAwesomeIcon icon={(comfirmText.title === '로그아웃' ? faArrowRightFromBracket : faUserSlash) as IconProp} />
            </DialogTitle>
            <DialogContent>
                {
                    comfirmText.body.split('\n').map((t, i) => {
                        return (
                            <span key={i}>
                                {t}
                                <br />
                            </span>
                        )
                    })
                }
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCloseComfirmDialog}>
                    취소
                </Button>
                <Button autoFocus onClick={handleComfirm}>
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ComfirmDialog;