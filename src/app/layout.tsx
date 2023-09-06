import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MediaQueryProvider } from './components/Providers/MediaQueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Samaritan Club',
  description: 'A place for people to find the right organisation to help.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'rgb(15, 15, 15)' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <MediaQueryProvider>{children}</MediaQueryProvider>
      </body>
    </html>
  );
}
