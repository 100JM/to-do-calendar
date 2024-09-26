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

    // const { userInfo, setUserInfo } = useUserStore();

    // const handleLogin = (res: any) => {
    //     const userInfo = {
    //         id: res.profile.id,
    //         name: res.profile.properties.nickname,
    //         profileImage: res.profile.properties.profile_image ? res.profile.properties.profile_image : ''
    //     };

    //     localStorage.setItem('user_info', JSON.stringify(userInfo));
    //     localStorage.setItem('kakao_access_token', res.response.access_token);
    //     const expiresIn = res.response.expires_in * 1000;
    //     const expiresTime = Date.now() + expiresIn;
    //     localStorage.setItem('kakao_access_token_expires_in', expiresTime.toString());

    //     const storeageUserInfo = localStorage.getItem('user_info');

    //     setUserInfo(storeageUserInfo);
    // };

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const checkKakaoInit = () => {
    //             if (!window.Kakao) return;

    //             // Kakao가 존재하고 초기화되지 않았을 때 초기화
    //             if (!window.Kakao.isInitialized()) {
    //                 window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY);
    //                 console.log('Kakao SDK initialized');
    //             }
    //         };

    //         // Kakao SDK가 로드될 때까지 기다림
    //         if (document.readyState === 'complete') {
    //             checkKakaoInit();
    //         } else {
    //             window.addEventListener('load', checkKakaoInit);
    //             return () => window.removeEventListener('load', checkKakaoInit);
    //         }
    //     }
    // }, []);

    // useEffect(() => {
    //     if (window.Kakao) {
    //         if (window.Kakao.Auth.getAccessToken()) {
    //             router.push('calendar');
    //         } else {
    //             router.replace('/');
    //         }
    //     }
    // }, [userInfo, router]);

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
                            {/* <KakaoLogin
                            token={process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY ? process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY : ''}
                            onSuccess={handleLogin}
                            onFail={() => console.log('fail')}
                            style={{
                                backgroundColor: "none",
                                width: "220px",
                                height: "60px",
                            }}
                        >
                            <Image src={kakaoLoginImg} alt='kakao_login' />
                        </KakaoLogin> */}
                            <button
                                className="w-2/3"
                                onClick={() => signIn('kakao', { callbackUrl: '/calendar' })}
                            >
                                <Image src={kakaoLoginImg} alt='kakao_login' />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            }
        </>
    );
};

export default Login;