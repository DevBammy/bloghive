// app/(auth)/layout.js
import { Syne, Urbanist } from 'next/font/google';
import '../globals.scss';

const SyneSans = Syne({
  variable: '--font-syne-sans',
  subsets: ['latin'],
});
const UrbanistSans = Urbanist({
  variable: '--font-urbanist-sans',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Login | BlogHive',
  description: 'Login to your BlogHive account',
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${SyneSans.variable} ${UrbanistSans.variable} layout`}>
        {children}
      </body>
    </html>
  );
}
