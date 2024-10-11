'use client';

import { signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Image from 'next/image'
import kakaoLoginImg from '../public/images/kakao_login_large_narrow.png';
import googleLoginImg from '../public/images/google_login.png';
import mainLogo from '../public/images/main_logo.png';
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
                        <div className="w-full h-2/3 flex justify-center items-center">
                            <Image src={mainLogo} alt='main_logo' priority/>
                        </div>    
                        <div className="w-full h-1/3 flex justify-center items-center">
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