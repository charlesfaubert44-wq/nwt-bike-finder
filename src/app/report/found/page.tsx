'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { ImageUploader } from '@/components/ImageUploader';
import { Bike, ArrowLeft, MapPin } from 'lucide-react';
import { createFoundBike } from '@/lib/db';
import { uploadBikeImages as uploadImages } from '@/lib/storage';
import { extractFeaturesFromFile } from '@/lib/imageMatching';
import { FoundBikeFormData, NWT_COMMUNITIES } from '@/types';

export default function ReportFoundPage() {
  const [formData, setFormData] = useState<FoundBikeFormData>({
    photos: [],
    color: '',
    type: 'road',
    condition: 'good',
    features: '',
    location: {
      lat: 0,
      lng: 0,
      address: '',
      city: '',
      territory: 'NWT'
    },
    dateFound: '',
    stillThere: true
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value
      }
    }));
  };

  const handleImagesChange = (images: File[]) => {
    setFormData(prev => ({
      ...prev,
      photos: images
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be signed in to report a found bike');
      return;
    }

    if (formData.photos.length === 0) {
      setError('Please upload at least one photo');
      return;
    }

    if (!formData.location.address || !formData.location.city) {
      setError('Please provide location details');
      return;
    }

    setLoading(true);

    try {
      // Upload images to Firebase Storage
      const imageUrls = await uploadImages(formData.photos, 'temp-id', 'found');
      
      // Extract features from images for matching
      const imageFeatures = await Promise.all(
        formData.photos.map(file => extractFeaturesFromFile(file))
      );

      // Create bike document
      const bikeId = await createFoundBike({
        userId: user.uid,
        photos: imageUrls,
        color: formData.color,
        type: formData.type,
        condition: formData.condition,
        features: formData.features,
        location: formData.location,
        dateFound: formData.dateFound,
        stillThere: formData.stillThere,
        status: 'active',
        imageFeatures: imageFeatures[0] // Use first image's features for now
      });

      router.push(`/bikes/found/${bikeId}?success=true`);
    } catch (error) {
      console.error('Error creating found bike report:', error);
      setError('Failed to create report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle>Sign in required</CardTitle>
            <CardDescription>
              You need to be signed in to report a found bike
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push('/auth/login')}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-slate-gray hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-slate-gray">Report Found Bike</h1>
          <p className="text-slate-gray/80 mt-2">
            Help reunite a bike with its owner by reporting what you found
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bike className="h-5 w-5 mr-2 text-primary" />
              Bike Details
            </CardTitle>
            <CardDescription>
              Provide details about the bike you found to help identify the owner
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Photos */}
              <div>
                <label className="block text-sm font-medium text-slate-gray mb-2">
                  Photos *
                </label>
                <ImageUploader
                  images={formData.photos}
                  onImagesChange={handleImagesChange}
                  maxImages={5}
                />
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-slate-gray mb-1">
                    Color *
                  </label>
                  <Input
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="e.g., Red, Blue, Black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-slate-gray mb-1">
                    Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-frost-gray bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    required
                  >
                    <option value="road">Road</option>
                    <option value="mountain">Mountain</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="electric">Electric</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-slate-gray mb-1">
                  Condition
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-frost-gray bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              <div>
                <label htmlFor="features" className="block text-sm font-medium text-slate-gray mb-1">
                  Distinctive Features
                </label>
                <textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="Describe any unique features, damage, accessories, etc."
                  rows={3}
                  className="flex w-full rounded-md border border-frost-gray bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-slate-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-slate-gray mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Location *
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-slate-gray mb-1">
                      Address
                    </label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.location.address}
                      onChange={handleLocationChange}
                      placeholder="Street address"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-gray mb-1">
                      Community
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.location.city}
                      onChange={handleLocationChange}
                      className="flex h-10 w-full rounded-md border border-frost-gray bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      required
                    >
                      <option value="">Select community</option>
                      {NWT_COMMUNITIES.map(community => (
                        <option key={community.name} value={community.name}>
                          {community.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Date and Status */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="dateFound" className="block text-sm font-medium text-slate-gray mb-1">
                    Date Found *
                  </label>
                  <Input
                    id="dateFound"
                    name="dateFound"
                    type="date"
                    value={formData.dateFound}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-1">
                    Current Status
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="stillThere"
                        checked={formData.stillThere}
                        onChange={() => setFormData(prev => ({ ...prev, stillThere: true }))}
                        className="mr-2"
                      />
                      Still there
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="stillThere"
                        checked={!formData.stillThere}
                        onChange={() => setFormData(prev => ({ ...prev, stillThere: false }))}
                        className="mr-2"
                      />
                      Moved to safe location
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating Report...' : 'Create Report'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
