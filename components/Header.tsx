import React from 'react';
import Link from 'next/link';
import { Home, List, User } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <a className="flex items-center space-x-1" aria-label="Home">
              <Home className="w-5 h-5" />
              <span className="hidden md:inline">Home</span>
            </a>
          </Link>
          <Link href="/tasks">
            <a className="flex items-center space-x-1" aria-label="Tasks">
              <List className="w-5 h-5" />
              <span className="hidden md:inline">Tasks</span>
            </a>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={onLogout}
                className="flex items-center space-x-1"
                aria-label="Logout"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link href="/login">
              <a className="flex items-center space-x-1" aria-label="Login">
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Login</span>
              </a>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;