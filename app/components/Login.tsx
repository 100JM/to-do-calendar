'use client';

import { signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useUserStore from '../store/user';

import KakaoLogin from 'react-kakao-login';

import Image from 'next/image'
import kakaoLoginImg from '../public/images/kakao_login_large_narrow.png';
import { AnimatePresence, motion } from 'framer-motion';

const Login: React.FC = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

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
            {status === 'authenticated' ?
                null
                : <AnimatePresence>
                    <motion.div
                        key="login"
                        variants={fadeVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={fadeTransitionSettings}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}>
                        <div className="w-full h-1/2 flex justify-center items-center">
                            <button
                                className="w-2/3 flex justify-center items-center"
                                onClick={() => signIn('kakao', { callbackUrl: '/calendar' })}
                            >
                                <Image src={kakaoLoginImg} alt='kakao_login' priority/>
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            }
        </>
    );
};

export default Login;