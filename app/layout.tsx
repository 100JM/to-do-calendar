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
}

export const metadata: Metadata = {
  metadataBase: new URL('https://100jm-to-do-calendar.vercel.app'),
  title: 'TO-DO CALENDAR🗓️: TO-DO 캘린더',
  description: '개인 일정을 관리하고 자신만의 달력을 만들어보세요.',
  keywords: ['calendar', '달력', 'to-do', '일정', 'TO-DO 캘린더', 'TO-DO CALENDAR'],
  openGraph: {
    title: 'TO-DO CALENDAR🗓️: TO-DO 캘린더',
    description: "개인 일정을 관리하고 자신만의 달력을 만들어보세요.",
    images: [
      {
        url: 'https://100jm-to-do-calendar.vercel.app/images/openGraph_image.png',
        alt: 'main_logo',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
    url: 'https://100jm-to-do-calendar.vercel.app',
    siteName: 'TO-DO CALENDAR🗓️: TO-DO 캘린더'
  },
  twitter: {
    title: 'TO-DO CALENDAR🗓️: TO-DO 캘린더',
    description: "개인 일정을 관리하고 자신만의 달력을 만들어보세요.",
    images: [
      {
        url: 'https://100jm-to-do-calendar.vercel.app/images/openGraph_image.png',
        alt: 'main_logo',
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  // other: {
  //   'google-site-verification': 'verification-code', // 구글 서치 콘솔용
  //   'naver-site-verification': 'verification-code',  // 네이버 서치어드바이저용
  // },
};

// declare global {
//   interface Window {
//     Kakao: any;
//   }
// }

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
