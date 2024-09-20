import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Sans_KR } from "next/font/google"

const ibmPlexSansKr = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: "400"
});

export const metadata: Metadata = {
  title: "TO DO CALENDAR",
  description: "Make your calendar",
};

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
        {children}
      </body>
    </html>
  );
}
