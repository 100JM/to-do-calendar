'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Image from 'next/image'
import kakaoLoginImg from '../public/images/kakao_login_large_narrow.png';
import googleLoginImg from '../public/images/web_light_sq_SI@2x.png';
import { AnimatePresence, motion } from 'framer-motion';

import CircularProgress from '@mui/joy/CircularProgress';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const Login: React.FC = () => {
    const router = useRouter();
    const { status } = useSession();

    const [showLoginDrawer, setShowLoginDrawer] = useState<boolean>(false);

    const fadeVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const fadeTransitionSettings = {
        duration: 1,
        ease: "easeInOut"
    };

    useEffect(() => {
        if (status === 'authenticated') {
            router.replace('calendar');
        }
    }, [status, router])

    return (
        <>
            {
                status === 'loading' &&
                null
            }
            {
                status === 'authenticated' &&
                <div className="w-full h-1/3 flex justify-center items-center">
                    <CircularProgress color="neutral" variant="soft" size="lg" />
                </div>
            }
            {
                status === 'unauthenticated' &&
                <AnimatePresence>
                    <motion.div
                        key="login"
                        variants={fadeVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={fadeTransitionSettings}
                        className="w-full h-1/3"
                    >
                        <div className="w-full h-full flex justify-center items-center">
                            <button
                                className="w-1/2 h-11 flex justify-center items-center relative max-w-48 login-botton"
                                onClick={() => setShowLoginDrawer(true)}
                            >
                                로그인
                            </button>
                            <SwipeableDrawer
                                open={showLoginDrawer}
                                onOpen={() => setShowLoginDrawer(true)}
                                onClose={() => setShowLoginDrawer(false)}
                                anchor={"bottom"}
                                style={{ zIndex: "9990" }}
                                sx={{ 
                                    "& .MuiDrawer-paperAnchorBottom": 
                                    {
                                        maxHeight: "100%", 
                                        // maxWidth: "768px",
                                        // width: "100%",
                                        // left: "50%",
                                        // right: "auto",
                                        // transform: "translateX(-50%)",
                                        borderTopLeftRadius: "10px",
                                        borderTopRightRadius: "10px"
                                    }
                                }}
                            >
                                <div className="puller"></div>
                                <div className="px-5 pt-6 pb-0 flex justify-center items-center">
                                    <button
                                        className="w-1/2 h-11 flex justify-center items-center relative max-w-44"
                                        onClick={() => signIn('kakao', { callbackUrl: '/calendar' })}
                                    >
                                        <Image src={kakaoLoginImg} alt="kakao_login" priority fill sizes="width: 100%" />
                                    </button>
                                </div>
                                <div className="p-5 flex justify-center items-center">
                                    <button
                                        className="w-1/2 h-11 flex justify-center items-center relative max-w-44 bg-white rounded shadow hover:bg-gray-100 text-sm"
                                        onClick={() => signIn('google', { callbackUrl: '/calendar' })}
                                    >
                                        <Image src={googleLoginImg} alt="google_login" priority fill sizes="width: 100%" />
                                    </button>
                                </div>
                            </SwipeableDrawer>
                        </div>
                    </motion.div>
                </AnimatePresence>
            }
        </>
    );
};

export default Login;