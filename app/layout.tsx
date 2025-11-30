import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LucideIcon } from 'lucide-react';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Forge App - Simple Todo Application',
  description: 'Manage your tasks effectively with Forge App.',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
};

type LayoutProps = {
  children: ReactNode;
};

const GlobalProviders = ({ children }: LayoutProps) => {
  return (
    <div className={inter.className}>
      {children}
    </div>
  );
};

const Navigation = () => (
  <nav className="bg-gray-800 p-4 text-white">
    <ul className="flex space-x-4">
      <li>Home</li>
      <li>About</li>
      <li>Contact</li>
    </ul>
  </nav>
);

const Footer = () => (
  <footer className="bg-gray-800 p-4 text-white text-center">
    <p>&copy; 2023 Forge App. All rights reserved.</p>
  </footer>
);

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet={metadata.charset} />
        <meta name="viewport" content={metadata.viewport} />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="flex flex-col min-h-screen">
        <GlobalProviders>
          <Navigation />
          <main className="flex-grow">{children}</main>
          <Footer />
        </GlobalProviders>
      </body>
    </html>
  );
};

export default Layout;