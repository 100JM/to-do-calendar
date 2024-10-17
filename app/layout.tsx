import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Sans_KR } from "next/font/google"
import Script from 'next/script';
import SessionProviderWrapper from "./components/nextAuth/SessionProviderWrapper";

const ibmPlexSansKr = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: "400"
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "TO-DO CALENDAR",
  description: "개인 일정을 관리하고 자신만의 달력을 만들어보세요.",
  keywords: ['calendar', '달력', 'to-do', '일정'],
  openGraph: {
    title: 'TO-DO CALENDAR🗓️',
    description: "개인 일정을 관리하고 자신만의 달력을 만들어보세요.",
    images: [
      {
        url: '/images/main_logo.png',
        alt: 'main_logo',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'google-site-verification': 'verification-code', // 구글 서치 콘솔용
    'naver-site-verification': 'verification-code',  // 네이버 서치어드바이저용
  },
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={ibmPlexSansKr.className}
      >
        <Script 
          async
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js" 
          integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4" 
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
