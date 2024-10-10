import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import useModalStore from '@/app/store/modal';
import useDateStore from '@/app/store/date';
import useToastStore from '@/app/store/toast';
import useDeleteTodo from '@/app/hooks/useSWR/useDeleteTodo';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { faUserSlash, faArrowRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


const ComfirmDialog: React.FC = () => {
    const { data: session, status } = useSession();

    const { setShowUserDialog, showComfirm, comfirmText, setShowComfirm, setComfirmText, setShowTodoDialog, setIsTodoButton, setShowAddArea } = useModalStore();
    const { deleteId, setDeletedId, setSelectedDateEventInfoDefault } = useDateStore();
    const { showToast } = useToastStore();

    const accessToken: string | undefined = session?.accessToken;

    const handleCloseModal = () => {
        setShowTodoDialog(false);
        setIsTodoButton(false);
        setShowAddArea(false);
        setSelectedDateEventInfoDefault();
    };

    const handleCloseComfirmDialog = () => {
        setShowComfirm(false);
        setComfirmText({
            title: '',
            body: ''
        });
        setDeletedId('');
    };

    const handleDelete = async () => {
        const result = await useDeleteTodo(deleteId, session?.userId);
        
        if (result) {
            handleCloseComfirmDialog();
            handleCloseModal();
            showToast('일정이 삭제되었습니다.', { type: 'success' });
        } else {
            handleCloseComfirmDialog();
            showToast('오류가 발생했습니다.\n새로고침 후 다시 시도해주세요.', { type: 'error' });
        }
    }

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
        } else if (comfirmText.title === '일정 삭제') {
            handleDelete();
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
                <FontAwesomeIcon icon={(comfirmText.title === '로그아웃' ? faArrowRightFromBracket : (comfirmText.title === '연결 해제' ? faUserSlash : faTrash)) as IconProp} />
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