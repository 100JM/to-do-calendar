'use client';

import useModalStore from '../store/modal';

import CircularProgress from '@mui/joy/CircularProgress';

const LoadingBar: React.FC = () => {
    const { showLoadingBar } = useModalStore();

    return (
        <>
            {
                showLoadingBar &&
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "9999" }}
                >
                    <CircularProgress variant="plain" size="lg" />
                </div>
            }
        </>
    );
};

export default LoadingBar;