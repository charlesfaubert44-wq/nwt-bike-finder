'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { getStolenBikes, getFoundBikes, updateStolenBike, updateFoundBike } from '@/lib/db';
import { StolenBike, FoundBike } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Bike, AlertTriangle, CheckCircle, Eye, Trash2, MapPin } from 'lucide-react';

export default function MyBikesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stolenBikes, setStolenBikes] = useState<StolenBike[]>([]);
  const [foundBikes, setFoundBikes] = useState<FoundBike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'stolen' | 'found'>('stolen');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchBikes = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        const [stolen, found] = await Promise.all([
          getStolenBikes(user.uid),
          getFoundBikes()
        ]);

        setStolenBikes(stolen);
        // Filter found bikes to only show user's bikes
        setFoundBikes(found.filter(bike => bike.userId === user.uid));
      } catch (err) {
        console.error('Error fetching bikes:', err);
        setError('Failed to load your bikes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBikes();
    }
  }, [user]);

  const handleMarkAsResolved = async (bikeId: string, type: 'stolen' | 'found') => {
    try {
      if (type === 'stolen') {
        await updateStolenBike(bikeId, { status: 'resolved' });
        setStolenBikes(stolenBikes.filter(bike => bike.id !== bikeId));
      } else {
        await updateFoundBike(bikeId, { status: 'resolved' });
        setFoundBikes(foundBikes.filter(bike => bike.id !== bikeId));
      }
    } catch (err) {
      console.error('Error marking bike as resolved:', err);
      alert('Failed to mark bike as resolved. Please try again.');
    }
  };

  const handleRemove = async (bikeId: string, type: 'stolen' | 'found') => {
    if (!confirm('Are you sure you want to remove this bike? This action cannot be undone.')) {
      return;
    }

    try {
      if (type === 'stolen') {
        await updateStolenBike(bikeId, { status: 'removed' });
        setStolenBikes(stolenBikes.filter(bike => bike.id !== bikeId));
      } else {
        await updateFoundBike(bikeId, { status: 'removed' });
        setFoundBikes(foundBikes.filter(bike => bike.id !== bikeId));
      }
    } catch (err) {
      console.error('Error removing bike:', err);
      alert('Failed to remove bike. Please try again.');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-frost-gray to-snow-white pt-20 px-4">
        <div className="max-w-6xl mx-auto py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-gray">Loading your bikes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-frost-gray to-snow-white pt-20 px-4">
        <div className="max-w-6xl mx-auto py-12">
          <Card className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-danger mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-gray mb-2">Error Loading Bikes</h2>
            <p className="text-slate-gray/70 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </Card>
        </div>
      </div>
    );
  }

  const bikes = activeTab === 'stolen' ? stolenBikes : foundBikes;
  const emptyMessage = activeTab === 'stolen'
    ? "You haven't reported any stolen bikes yet."
    : "You haven't reported any found bikes yet.";
  const reportLink = activeTab === 'stolen' ? '/report/stolen' : '/report/found';
  const reportText = activeTab === 'stolen' ? 'Report Stolen Bike' : 'Report Found Bike';

  return (
    <div className="min-h-screen bg-gradient-to-b from-frost-gray to-snow-white pt-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-gray mb-2">My Bikes</h1>
          <p className="text-slate-gray/70">
            Manage your reported stolen and found bikes
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-frost-gray">
          <button
            onClick={() => setActiveTab('stolen')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'stolen'
                ? 'text-danger border-b-2 border-danger'
                : 'text-slate-gray/60 hover:text-slate-gray'
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Stolen Bikes
              {stolenBikes.length > 0 && (
                <span className="bg-danger text-white text-xs px-2 py-0.5 rounded-full">
                  {stolenBikes.length}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('found')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'found'
                ? 'text-success border-b-2 border-success'
                : 'text-slate-gray/60 hover:text-slate-gray'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Found Bikes
              {foundBikes.length > 0 && (
                <span className="bg-success text-white text-xs px-2 py-0.5 rounded-full">
                  {foundBikes.length}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Bike List */}
        {bikes.length === 0 ? (
          <Card className="p-12 text-center">
            <Bike className="w-16 h-16 text-slate-gray/30 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-gray mb-2">No Bikes Yet</h2>
            <p className="text-slate-gray/70 mb-6">{emptyMessage}</p>
            <Link href={reportLink}>
              <Button>{reportText}</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikes.map((bike) => {
              const isStolenBike = 'brand' in bike;
              const stolenBike = isStolenBike ? (bike as StolenBike) : null;
              const foundBike = !isStolenBike ? (bike as FoundBike) : null;

              return (
                <Card key={bike.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Image */}
                  {bike.photos.length > 0 && (
                    <div className="relative w-full h-48 bg-frost-gray">
                      <Image
                        src={bike.photos[0]}
                        alt="Bike"
                        fill
                        className="object-cover"
                      />
                      <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${
                        isStolenBike ? 'bg-danger text-white' : 'bg-success text-white'
                      }`}>
                        {isStolenBike ? 'Stolen' : 'Found'}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    {/* Bike Info */}
                    <div className="mb-4">
                      <h3 className="font-bold text-slate-gray mb-2">
                        {stolenBike ? `${stolenBike.brand} ${stolenBike.model}` : `${bike.color} ${bike.type}`}
                      </h3>
                      <div className="space-y-1 text-sm text-slate-gray/70">
                        <p>{bike.color} • {bike.type}</p>
                        {stolenBike && <p>Size: {stolenBike.size}</p>}
                        {foundBike && <p>Condition: {foundBike.condition}</p>}
                        <p className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {bike.location.city}
                        </p>
                        <p className="text-xs">
                          {isStolenBike
                            ? `Stolen: ${new Date(stolenBike!.dateStolen).toLocaleDateString()}`
                            : `Found: ${new Date(foundBike!.dateFound).toLocaleDateString()}`
                          }
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/bikes/${isStolenBike ? 'stolen' : 'found'}/${bike.id}`}
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      {isStolenBike && bike.status === 'active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsResolved(bike.id, 'stolen')}
                          className="flex-1"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Found It
                        </Button>
                      )}
                      {foundBike && foundBike.stillThere && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsResolved(bike.id, 'found')}
                          className="flex-1"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Resolved
                        </Button>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(bike.id, isStolenBike ? 'stolen' : 'found')}
                      className="w-full mt-2 text-xs text-danger hover:text-danger/80 transition-colors flex items-center justify-center gap-1 py-2"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Quick Action */}
        {bikes.length > 0 && (
          <div className="mt-8 text-center">
            <Link href={reportLink}>
              <Button variant="outline">{reportText}</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
