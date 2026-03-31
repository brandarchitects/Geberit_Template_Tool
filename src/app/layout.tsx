import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Geberit Template Tool',
  description: 'Create and export Geberit print templates',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
