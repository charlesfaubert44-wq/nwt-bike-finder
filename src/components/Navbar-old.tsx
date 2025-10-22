'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Menu, X, Bike, MapPin, MessageCircle, User, ChevronDown } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav id="navbar" className="relative z-50 w-full text-gray-900">
      <div className="flex flex-col max-w-screen-xl px-8 mx-auto lg:items-center lg:justify-between lg:flex-row py-4">
        <div className="flex flex-col lg:flex-row items-center space-x-4 xl:space-x-8">
          <div className="w-full flex flex-row items-center justify-between py-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 shadow-md">
                <Bike className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl xl:text-2xl font-bold text-gray-900">YK Bike Finder</span>
            </Link>
            <button 
              className="rounded-lg lg:hidden focus:outline-none focus:shadow-outline"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          
          <ul className={`${isOpen ? 'flex' : 'hidden lg:flex'} w-full h-auto flex-col flex-grow lg:items-center pb-4 lg:pb-0 lg:justify-end lg:flex-row origin-top duration-300 xl:space-x-2 space-y-3 lg:space-y-0`}>
            <li className="w-full">
              <Link 
                href="/map"
                className="md:px-4 py-2 text-sm bg-transparent rounded-lg text-gray-600 hover:text-gray-900 focus:outline-none focus:shadow-outline flex items-center space-x-1.5"
              >
                <MapPin className="h-4 w-4" />
                <span>Map</span>
              </Link>
            </li>
            <li className="w-full">
              <Link 
                href="/report/stolen"
                className="md:px-4 py-2 text-sm bg-transparent rounded-lg text-gray-600 hover:text-gray-900 focus:outline-none focus:shadow-outline"
              >
                Report Stolen
              </Link>
            </li>
            <li className="w-full">
              <Link 
                href="/report/found"
                className="md:px-4 py-2 text-sm bg-transparent rounded-lg text-gray-600 hover:text-gray-900 focus:outline-none focus:shadow-outline"
              >
                Report Found
              </Link>
            </li>
            {user && (
              <li className="w-full">
                <Link 
                  href="/matches"
                  className="md:px-4 py-2 text-sm bg-transparent rounded-lg text-gray-600 hover:text-gray-900 focus:outline-none focus:shadow-outline flex items-center space-x-1.5"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Matches</span>
                </Link>
              </li>
            )}
            {user && (
              <li className="w-full">
                <Link 
                  href="/bikes/my-bikes"
                  className="md:px-4 py-2 text-sm bg-transparent rounded-lg text-gray-600 hover:text-gray-900 focus:outline-none focus:shadow-outline flex items-center space-x-1.5"
                >
                  <User className="h-4 w-4" />
                  <span>My Bikes</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
        
        <div className={`${isOpen ? 'flex' : 'hidden lg:flex'} space-x-3`}>
          {user ? (
            <Button 
              onClick={logout}
              className="px-8 xl:px-10 py-3 mt-2 bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 rounded-full text-sm shadow-sm hover:shadow-md hover:shadow-primary-500/50 transition-all duration-300"
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Link href="/auth/login">
                <Button className="px-8 xl:px-10 py-3 mt-2 bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 rounded-full text-sm shadow-sm hover:shadow-md hover:shadow-primary-500/50 transition-all duration-300">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="px-8 xl:px-10 py-3 mt-2 bg-gradient-to-r from-primary-600 to-secondary-500 text-white hover:from-primary-700 hover:to-secondary-600 rounded-full text-sm shadow-md hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="h-10 w-10"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/map"
                className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <MapPin className="h-5 w-5" />
                <span>Map View</span>
              </Link>
              <Link
                href="/report/stolen"
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Report Stolen
              </Link>
              <Link
                href="/report/found"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-gray hover:text-primary hover:bg-frost-gray"
                onClick={() => setIsOpen(false)}
              >
                Report Found
              </Link>
              {user && (
                <>
                  <Link
                    href="/matches"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-gray hover:text-primary hover:bg-frost-gray"
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Matches</span>
                  </Link>
                  <Link
                    href="/bikes/my-bikes"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-gray hover:text-primary hover:bg-frost-gray"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>My Bikes</span>
                  </Link>
                </>
              )}
              <div className="pt-4 pb-3 border-t border-frost-gray">
                {user ? (
                  <Button variant="outline" onClick={logout} className="w-full">
                    Sign Out
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
