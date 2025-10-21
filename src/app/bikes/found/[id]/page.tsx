'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getFoundBike } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FoundBike } from '@/types';
import { Bike, MapPin, Calendar, User, ArrowLeft, CheckCircle, MessageCircle, Flag } from 'lucide-react';
import Link from 'next/link';
import { formatDate, getTimeAgo } from '@/lib/utils';
import { ReportDialog } from '@/components/ReportDialog';

export default function FoundBikeDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [bike, setBike] = useState<FoundBike | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showReportDialog, setShowReportDialog] = useState(false);

  useEffect(() => {
    const fetchBike = async () => {
      if (!id || typeof id !== 'string') return;
      
      try {
        const bikeData = await getFoundBike(id);
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
          <Link href="/map" className="inline-flex items-center text-slate-gray hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to map
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-gray">Found Bike Details</h1>
              <p className="text-slate-gray/80 mt-2">
                {isOwner ? 'Your found bike report' : 'Found bike details'}
              </p>
            </div>
            {!isOwner && user && (
              <Button
                variant="outline"
                onClick={() => setShowReportDialog(true)}
                className="text-danger border-danger hover:bg-danger hover:text-white"
              >
                <Flag className="h-4 w-4 mr-2" />
                Report
              </Button>
            )}
          </div>
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
                    <label className="text-sm font-medium text-slate-gray">Condition</label>
                    <p className="text-lg capitalize">{bike.condition}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-gray">Status</label>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-success font-medium">Found</span>
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
                  <label className="text-sm font-medium text-slate-gray">Date Found</label>
                  <p>{formatDate(bike.dateFound)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-gray">Current Status</label>
                  <p className={bike.stillThere ? 'text-success' : 'text-accent'}>
                    {bike.stillThere ? 'Still at location' : 'Moved to safe location'}
                  </p>
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
              </CardContent>
            </Card>

            {isOwner && (
              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  View Messages
                </Button>
                <Button variant="outline" className="flex-1">
                  Edit Report
                </Button>
              </div>
            )}

            {!isOwner && (
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-medium text-slate-gray mb-2">Is this your bike?</h3>
                    <p className="text-sm text-slate-gray/80 mb-4">
                      Contact the finder to arrange pickup
                    </p>
                    <Button className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Finder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <ReportDialog
          itemId={bike.id}
          itemType="found"
          isOpen={showReportDialog}
          onClose={() => setShowReportDialog(false)}
        />
      </div>
    </div>
  );
}
