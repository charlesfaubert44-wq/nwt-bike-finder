'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getStolenBikes, getFoundBikes, getMatches } from '@/lib/db';
import { StolenBike, FoundBike, Match } from '@/types';

export function useBikes() {
  const { user } = useAuth();
  const [stolenBikes, setStolenBikes] = useState<StolenBike[]>([]);
  const [foundBikes, setFoundBikes] = useState<FoundBike[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshStolenBikes = async () => {
    if (!user) return;
    
    try {
      const bikes = await getStolenBikes(user.uid);
      setStolenBikes(bikes);
    } catch (err) {
      console.error('Error fetching stolen bikes:', err);
      setError('Failed to load stolen bikes');
    }
  };

  const refreshFoundBikes = async () => {
    try {
      const bikes = await getFoundBikes();
      setFoundBikes(bikes);
    } catch (err) {
      console.error('Error fetching found bikes:', err);
      setError('Failed to load found bikes');
    }
  };

  const refreshMatches = async () => {
    if (!user) return;
    
    try {
      const userMatches = await getMatches(user.uid);
      setMatches(userMatches);
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError('Failed to load matches');
    }
  };

  const refreshAll = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        refreshFoundBikes(),
        user ? refreshStolenBikes() : Promise.resolve(),
        user ? refreshMatches() : Promise.resolve()
      ]);
    } catch (err) {
      console.error('Error refreshing data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, [user]);

  return {
    stolenBikes,
    foundBikes,
    matches,
    loading,
    error,
    refreshStolenBikes,
    refreshFoundBikes,
    refreshMatches,
    refreshAll
  };
}
