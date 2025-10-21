'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Menu, X, Bike, MapPin, MessageCircle, User } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-frost-gray bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Bike className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-gray">YK Bike Finder</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/map" className="flex items-center space-x-1 text-slate-gray hover:text-primary transition-colors">
              <MapPin className="h-4 w-4" />
              <span>Map</span>
            </Link>
            <Link href="/report/stolen" className="text-slate-gray hover:text-primary transition-colors">
              Report Stolen
            </Link>
            <Link href="/report/found" className="text-slate-gray hover:text-primary transition-colors">
              Report Found
            </Link>
            {user && (
              <Link href="/matches" className="flex items-center space-x-1 text-slate-gray hover:text-primary transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>Matches</span>
              </Link>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/bikes/my-bikes" className="flex items-center space-x-1 text-slate-gray hover:text-primary transition-colors">
                  <User className="h-4 w-4" />
                  <span>My Bikes</span>
                </Link>
                <Button variant="outline" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-frost-gray">
              <Link
                href="/map"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-gray hover:text-primary hover:bg-frost-gray"
                onClick={() => setIsOpen(false)}
              >
                <MapPin className="h-4 w-4" />
                <span>Map</span>
              </Link>
              <Link
                href="/report/stolen"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-gray hover:text-primary hover:bg-frost-gray"
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
