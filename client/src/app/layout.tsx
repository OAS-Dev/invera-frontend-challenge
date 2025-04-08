import type {Metadata} from 'next';
import {Sora} from 'next/font/google';
import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';
import {Toaster} from '@/components/ui/sonner';

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
          <Toaster
            position='top-center'
            expand={false}
            richColors
            closeButton
            theme='system'
            className='font-medium'
            toastOptions={{
              duration: 3000,
              classNames: {
                toast: 'rounded-lg border border-gray-200 dark:border-[#5F5F5F] shadow-lg',
                success: 'group border-l-4 border-l-[#2CE284]',
                error: 'group border-l-4 border-l-[#ff5c5c]',
                info: 'group border-l-4 border-l-[#7B99FF]',
                warning: 'group border-l-4 border-l-[#ffb347]',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
