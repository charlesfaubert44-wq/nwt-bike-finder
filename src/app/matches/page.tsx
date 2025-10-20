'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { getMatches, getStolenBike, getFoundBike } from '@/lib/db';
import { Match, StolenBike, FoundBike } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Bike, MessageCircle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface MatchWithDetails extends Match {
  stolenBike: StolenBike | null;
  foundBike: FoundBike | null;
}

export default function MatchesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [matches, setMatches] = useState<MatchWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchMatches = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        const matchesData = await getMatches(user.uid);

        // Fetch detailed bike information for each match
        const matchesWithDetails = await Promise.all(
          matchesData.map(async (match) => {
            const [stolenBike, foundBike] = await Promise.all([
              getStolenBike(match.stolenBikeId),
              getFoundBike(match.foundBikeId)
            ]);

            return {
              ...match,
              stolenBike,
              foundBike
            };
          })
        );

        setMatches(matchesWithDetails);
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError('Failed to load matches. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMatches();
    }
  }, [user]);

  const getStatusBadge = (status: Match['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
            <AlertCircle className="w-4 h-4" />
            Pending Review
          </span>
        );
      case 'chatting':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
            <MessageCircle className="w-4 h-4" />
            Chatting
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-success/20 text-success text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Resolved
          </span>
        );
    }
  };

  const getResolutionBadge = (resolution?: Match['resolution']) => {
    if (!resolution) return null;

    switch (resolution) {
      case 'reunited':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-success text-white text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Reunited!
          </span>
        );
      case 'false-alarm':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-gray text-white text-xs font-medium">
            <XCircle className="w-3 h-3" />
            False Alarm
          </span>
        );
    }
  };

  const getSimilarityColor = (score: number) => {
    if (score >= 0.8) return 'text-success';
    if (score >= 0.6) return 'text-accent';
    return 'text-danger';
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-frost-gray to-snow-white pt-20 px-4">
        <div className="max-w-4xl mx-auto py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-gray">Loading matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-frost-gray to-snow-white pt-20 px-4">
        <div className="max-w-4xl mx-auto py-12">
          <Card className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-danger mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-gray mb-2">Error Loading Matches</h2>
            <p className="text-slate-gray/70 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-frost-gray to-snow-white pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-gray mb-2">Your Matches</h1>
          <p className="text-slate-gray/70">
            AI-powered matches between your stolen bikes and found bikes in the community
          </p>
        </div>

        {matches.length === 0 ? (
          <Card className="p-12 text-center">
            <Bike className="w-16 h-16 text-slate-gray/30 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-gray mb-2">No Matches Yet</h2>
            <p className="text-slate-gray/70 mb-6">
              We haven't found any potential matches for your stolen bikes yet.
              We'll notify you when we find a possible match!
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/report/stolen">
                <Button>Report a Stolen Bike</Button>
              </Link>
              <Link href="/map">
                <Button variant="outline">Browse Found Bikes</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {matches.map((match) => (
              <Card key={match.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`text-2xl font-bold ${getSimilarityColor(match.similarityScore)}`}>
                      {Math.round(match.similarityScore * 100)}%
                    </div>
                    <div>
                      <div className="text-sm text-slate-gray/70">Match Confidence</div>
                      {getStatusBadge(match.status)}
                    </div>
                  </div>
                  {getResolutionBadge(match.resolution)}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Stolen Bike */}
                  <div className="border-r md:pr-6">
                    <h3 className="font-semibold text-slate-gray mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-danger" />
                      Your Stolen Bike
                    </h3>
                    {match.stolenBike ? (
                      <div>
                        {match.stolenBike.photos.length > 0 && (
                          <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden bg-frost-gray">
                            <Image
                              src={match.stolenBike.photos[0]}
                              alt="Stolen bike"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="space-y-1 text-sm">
                          <p className="font-medium text-slate-gray">
                            {match.stolenBike.brand} {match.stolenBike.model}
                          </p>
                          <p className="text-slate-gray/70">
                            {match.stolenBike.color} • {match.stolenBike.type} • {match.stolenBike.size}
                          </p>
                          <p className="text-slate-gray/70">
                            Stolen: {new Date(match.stolenBike.dateStolen).toLocaleDateString()}
                          </p>
                        </div>
                        <Link href={`/bikes/stolen/${match.stolenBikeId}`}>
                          <Button variant="outline" size="sm" className="mt-3 w-full">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <p className="text-slate-gray/50 italic">Bike details unavailable</p>
                    )}
                  </div>

                  {/* Found Bike */}
                  <div>
                    <h3 className="font-semibold text-slate-gray mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      Found Bike Match
                    </h3>
                    {match.foundBike ? (
                      <div>
                        {match.foundBike.photos.length > 0 && (
                          <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden bg-frost-gray">
                            <Image
                              src={match.foundBike.photos[0]}
                              alt="Found bike"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="space-y-1 text-sm">
                          <p className="font-medium text-slate-gray">
                            {match.foundBike.color} {match.foundBike.type}
                          </p>
                          <p className="text-slate-gray/70">
                            Condition: {match.foundBike.condition}
                          </p>
                          <p className="text-slate-gray/70">
                            Found: {new Date(match.foundBike.dateFound).toLocaleDateString()}
                          </p>
                          <p className="text-slate-gray/70">
                            Location: {match.foundBike.location.city}
                          </p>
                          {match.foundBike.stillThere && (
                            <p className="text-success font-medium">Still at location</p>
                          )}
                        </div>
                        <Link href={`/bikes/found/${match.foundBikeId}`}>
                          <Button variant="outline" size="sm" className="mt-3 w-full">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <p className="text-slate-gray/50 italic">Bike details unavailable</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-6 border-t flex gap-3">
                  {match.status === 'pending' && (
                    <Button className="flex-1" disabled>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start Chat (Coming Soon)
                    </Button>
                  )}
                  {match.status === 'chatting' && match.chatRoomId && (
                    <Button className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Continue Chat
                    </Button>
                  )}
                  {match.status === 'resolved' && (
                    <div className="flex-1 text-center py-2 text-slate-gray/70">
                      This match has been resolved
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
