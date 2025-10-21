'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChange, signInWithEmail, signUpWithEmail, signInWithGoogle, logout } from '@/lib/auth';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ user: FirebaseUser | null; error: any }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{ user: FirebaseUser | null; error: any }>;
  signInWithGoogle: () => Promise<{ user: FirebaseUser | null; error: any }>;
  logout: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const result = await signInWithEmail(email, password);
    setLoading(false);
    return result;
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    const result = await signUpWithEmail(email, password, displayName);
    setLoading(false);
    return result;
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await signInWithGoogle();
    setLoading(false);
    return result;
  };

  const handleLogout = async () => {
    setLoading(true);
    const result = await logout();
    setLoading(false);
    return result;
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle: handleGoogleSignIn,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
