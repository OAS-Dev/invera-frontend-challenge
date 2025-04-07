import type {Metadata} from 'next';
import {Sora} from 'next/font/google';
import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';

const sora = Sora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Invera Challenge - Dashboard',
  description: 'Dashboard de Invera - Usuarios',
  keywords: ['Invera', 'Dashboard', 'Usuarios'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={`${sora.className} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
