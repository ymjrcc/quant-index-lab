import Header from '@/components/Header';
import '../styles/global.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <div className="mt-16"> 
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
