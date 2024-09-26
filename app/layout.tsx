import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Sans_KR } from "next/font/google"
import Script from 'next/script';
import SessionProviderWrapper from "./components/nextAuth/SessionProviderWrapper";

const ibmPlexSansKr = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: "400"
});

export const metadata: Metadata = {
  title: "TO DO CALENDAR",
  description: "Make your calendar",
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
    <html lang="en">
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
