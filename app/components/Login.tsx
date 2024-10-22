'use client';

import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Image from 'next/image'
import kakaoLoginImg from '../public/images/kakao_login_large_narrow.png';
import googleLoginImg from '../public/images/google_login.png';
import { AnimatePresence, motion } from 'framer-motion';

import CircularProgress from '@mui/joy/CircularProgress';

const Login: React.FC = () => {
    const router = useRouter();
    const { status } = useSession();

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
                                className="w-1/2 h-11 mr-2 flex justify-center items-center relative max-w-60"
                                onClick={() => signIn('kakao', { callbackUrl: '/calendar' })}
                            >
                                <Image src={kakaoLoginImg} alt='kakao_login' priority fill />
                            </button>
                            <button
                                className="w-1/2 h-11 ml-2 flex justify-center items-center relative max-w-60"
                                onClick={() => signIn('google', { callbackUrl: '/calendar' })}
                            >
                                <Image src={googleLoginImg} alt='google_login' priority fill />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            }
        </>
    );
};

export default Login;