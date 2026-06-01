import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.scss';

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Zorcube',
  description: 'Speedcubing timer, platform & progress tracker by zorreth',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={robotoMono.variable}>
      <body>{children}</body>
    </html>
  );
}
