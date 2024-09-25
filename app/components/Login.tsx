'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import KakaoLogin from 'react-kakao-login';

import Image from 'next/image'
import kakaoLoginImg from '../public/images/kakao_login_large_narrow.png';

const Login: React.FC = () => {
    const router = useRouter();

    const handleLogin = (res: any) => {
        console.log(res);
        router.push('calendar');
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkKakaoInit = () => {
                if (!window.Kakao) return;

                // Kakao가 존재하고 초기화되지 않았을 때 초기화
                if (!window.Kakao.isInitialized()) {
                    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY);
                    console.log('Kakao SDK initialized');
                }
            };

            // Kakao SDK가 로드될 때까지 기다림
            if (document.readyState === 'complete') {
                checkKakaoInit();
            } else {
                window.addEventListener('load', checkKakaoInit);
                return () => window.removeEventListener('load', checkKakaoInit);
            }
        }
    }, []);

    return (
        <div className="w-full h-1/2 flex justify-center items-center">
            <KakaoLogin
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
            </KakaoLogin>
        </div>
    );
};

export default Login;