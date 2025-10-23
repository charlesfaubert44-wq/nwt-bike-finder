import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yellowknife Trip Planner - Plan Your Northern Adventure',
  description: 'Discover and plan your perfect Yellowknife experience. Aurora viewing, wilderness adventures, cultural experiences, and more.',
  keywords: ['Yellowknife', 'Northwest Territories', 'Aurora', 'Northern Lights', 'Trip Planning', 'Canada Travel'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
