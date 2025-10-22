'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getStolenBike } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StolenBike } from '@/types';
import { Bike, MapPin, Calendar, User, ArrowLeft, Shield, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { formatDate, getTimeAgo } from '@/lib/utils';

export default function StolenBikeDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [bike, setBike] = useState<StolenBike | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBike = async () => {
      if (!id || typeof id !== 'string') return;
      
      try {
        const bikeData = await getStolenBike(id);
        if (bikeData) {
          setBike(bikeData);
        } else {
          setError('Bike not found');
        }
      } catch (err) {
        console.error('Error fetching bike:', err);
        setError('Failed to load bike details');
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bike className="h-8 w-8 text-primary animate-pulse mb-4" />
            <p className="text-slate-gray">Loading bike details...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !bike) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Bike Not Found</CardTitle>
            <CardDescription>{error || 'This bike could not be found'}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isOwner = user && bike.userId === user.uid;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-slate-gray hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-slate-gray">Stolen Bike Details</h1>
          <p className="text-slate-gray/80 mt-2">
            {isOwner ? 'Your reported stolen bike' : 'Reported stolen bike details'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Photos */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bike className="h-5 w-5 mr-2 text-primary" />
                  Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {bike.photos.map((photo, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-frost-gray">
                      <img
                        src={photo}
                        alt={`Bike photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-gray">Brand</label>
                    <p className="text-lg">{bike.brand}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-gray">Model</label>
                    <p className="text-lg">{bike.model}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-gray">Color</label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: bike.color }}
                      />
                      <span>{bike.color}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-gray">Type</label>
                    <p className="text-lg capitalize">{bike.type}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-gray">Size</label>
                    <p className="text-lg">{bike.size}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-gray">Status</label>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-danger" />
                      <span className="text-danger font-medium">Stolen</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-slate-gray">Address</label>
                  <p>{bike.location.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-gray">Community</label>
                  <p>{bike.location.city}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-gray">Date Stolen</label>
                  <p>{formatDate(bike.dateStolen)}</p>
                </div>
              </CardContent>
            </Card>

            {bike.features && (
              <Card>
                <CardHeader>
                  <CardTitle>Distinctive Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-gray">{bike.features}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Report Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-slate-gray">Reported</label>
                  <p>{getTimeAgo(bike.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-gray">Contact Preference</label>
                  <p className="capitalize">{bike.contactPreference}</p>
                </div>
              </CardContent>
            </Card>

            {isOwner && (
              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  View Matches
                </Button>
                <Button variant="outline" className="flex-1">
                  Edit Report
                </Button>
              </div>
            )}

            {!isOwner && (
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-medium text-slate-gray mb-2">Think you found this bike?</h3>
                    <p className="text-sm text-slate-gray/80 mb-4">
                      Report it as found to help reunite it with its owner
                    </p>
                    <Link href="/report/found">
                      <Button className="w-full">
                        Report as Found
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

