'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Menu, X, Bike, MapPin, MessageCircle, User } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`sticky top-0 z-50 w-full text-gray-900 transition-all duration-300 ${
        scrolled
          ? 'bg-gradient-to-b from-gray-50 to-white'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 lg:px-8 xl:px-16 2xl:px-24 mx-auto py-4">
        <div className={`mx-auto transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xl rounded-2xl px-6 lg:px-8 py-3 border border-gray-200/50'
            : 'bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl px-6 lg:px-8 py-3 border border-gray-100'
        }`}>
        {/* Mobile Header */}
        <div className="flex lg:hidden flex-row items-center justify-between w-full">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <Bike className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              YK Bike Finder
            </span>
          </Link>

          <button
            className="rounded-lg focus:outline-none focus:shadow-outline p-2 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Header - Enhanced Layout */}
        <div className="hidden lg:flex lg:items-center lg:justify-between w-full">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <Bike className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors leading-tight">
                  YK Bike Finder
                </span>
                <span className="text-xs text-gray-500 font-medium">Community-Powered Recovery</span>
              </div>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="flex items-center space-x-2 xl:space-x-3">
            <Link
              href="/map"
              className="px-5 xl:px-6 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 flex items-center space-x-2 group"
            >
              <MapPin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Map</span>
            </Link>
            <Link
              href="/report/stolen"
              className="px-5 xl:px-6 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 group"
            >
              <span>Report Stolen</span>
            </Link>
            <Link
              href="/report/found"
              className="px-5 xl:px-6 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 group"
            >
              <span>Report Found</span>
            </Link>
            {user && (
              <>
                <Link
                  href="/matches"
                  className="px-5 xl:px-6 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 flex items-center space-x-2 group"
                >
                  <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>Matches</span>
                </Link>
                <Link
                  href="/bikes/my-bikes"
                  className="px-5 xl:px-6 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 flex items-center space-x-2 group"
                >
                  <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>My Bikes</span>
                </Link>
              </>
            )}
          </div>

          {/* Right: Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Button
                onClick={logout}
                className="px-8 py-3 bg-transparent text-primary-600 border-2 border-primary-600 hover:bg-primary-50 rounded-xl text-base font-semibold shadow-sm hover:shadow-lg transition-all duration-300"
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button className="px-8 py-3 bg-transparent text-primary-600 border-2 border-primary-600 hover:bg-primary-50 rounded-xl text-base font-semibold shadow-sm hover:shadow-lg transition-all duration-300">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-500 text-white hover:from-primary-700 hover:to-secondary-600 border-0 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isOpen ? 'flex' : 'hidden'} lg:hidden flex-col w-full pt-4 pb-2 space-y-2`}>
          <Link
            href="/map"
            className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 flex items-center space-x-2"
            onClick={() => setIsOpen(false)}
          >
            <MapPin className="h-4 w-4" />
            <span>Map</span>
          </Link>
          <Link
            href="/report/stolen"
            className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Report Stolen
          </Link>
          <Link
            href="/report/found"
            className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Report Found
          </Link>
          {user && (
            <>
              <Link
                href="/matches"
                className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Matches</span>
              </Link>
              <Link
                href="/bikes/my-bikes"
                className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-4 w-4" />
                <span>My Bikes</span>
              </Link>
            </>
          )}

          <div className="pt-4 border-t border-gray-200 space-y-2">
            {user ? (
              <Button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full px-6 py-3 bg-transparent text-primary-600 border-2 border-primary-600 hover:bg-primary-50 rounded-full text-sm font-medium transition-all duration-300"
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Link href="/auth/login" className="block" onClick={() => setIsOpen(false)}>
                  <Button className="w-full px-6 py-3 bg-transparent text-primary-600 border-2 border-primary-600 hover:bg-primary-50 rounded-full text-sm font-medium transition-all duration-300">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register" className="block" onClick={() => setIsOpen(false)}>
                  <Button className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-500 text-white hover:from-primary-700 hover:to-secondary-600 border-0 rounded-full text-sm font-medium shadow-md transition-all duration-300">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        </div>
      </div>
    </nav>
  );
}
