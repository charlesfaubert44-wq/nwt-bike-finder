'use client';

import { useState, useEffect } from 'react';
import { useBikes } from '@/hooks/useBikes';
import { MapView } from '@/components/MapView';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FoundBike } from '@/types';
import { MapPin, Filter, RefreshCw } from 'lucide-react';

export default function MapPage() {
  const { foundBikes, loading, refreshFoundBikes } = useBikes();
  const [selectedBike, setSelectedBike] = useState<FoundBike | null>(null);
  const [filteredBikes, setFilteredBikes] = useState<FoundBike[]>([]);
  const [filters, setFilters] = useState({
    type: 'all',
    color: 'all',
    dateRange: '30' // days
  });

  useEffect(() => {
    let filtered = foundBikes;

    // Filter by type
    if (filters.type !== 'all') {
      filtered = filtered.filter(bike => bike.type === filters.type);
    }

    // Filter by color
    if (filters.color !== 'all') {
      filtered = filtered.filter(bike => 
        bike.color.toLowerCase().includes(filters.color.toLowerCase())
      );
    }

    // Filter by date range
    if (filters.dateRange !== 'all') {
      const days = parseInt(filters.dateRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      filtered = filtered.filter(bike => 
        new Date(bike.dateFound) >= cutoffDate
      );
    }

    setFilteredBikes(filtered);
  }, [foundBikes, filters]);

  const handleBikeSelect = (bike: FoundBike) => {
    setSelectedBike(bike);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 text-primary animate-spin mb-4" />
            <p className="text-slate-gray">Loading found bikes...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-gray mb-2">Found Bikes Map</h1>
          <p className="text-slate-gray/80">
            View found bikes in the Yellowknife area
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-primary" />
                  Filters
                </CardTitle>
                <CardDescription>
                  Filter found bikes by type, color, and date
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">
                    Bike Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-frost-gray bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <option value="all">All Types</option>
                    <option value="road">Road</option>
                    <option value="mountain">Mountain</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="electric">Electric</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">
                    Color
                  </label>
                  <select
                    value={filters.color}
                    onChange={(e) => handleFilterChange('color', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-frost-gray bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <option value="all">All Colors</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="yellow">Yellow</option>
                    <option value="orange">Orange</option>
                    <option value="purple">Purple</option>
                    <option value="gray">Gray</option>
                    <option value="brown">Brown</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">
                    Found Within
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-frost-gray bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 90 days</option>
                    <option value="all">All time</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-frost-gray">
                  <p className="text-sm text-slate-gray/80">
                    Showing {filteredBikes.length} of {foundBikes.length} bikes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <MapView
                  bikes={filteredBikes}
                  onBikeSelect={handleBikeSelect}
                  selectedBikeId={selectedBike?.id}
                  className="h-full rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Selected Bike Details */}
        {selectedBike && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Selected Bike Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-slate-gray mb-2">Basic Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: selectedBike.color }}
                        />
                        <span><strong>Color:</strong> {selectedBike.color}</span>
                      </div>
                      <div><strong>Type:</strong> {selectedBike.type.charAt(0).toUpperCase() + selectedBike.type.slice(1)}</div>
                      <div><strong>Condition:</strong> {selectedBike.condition?.charAt(0).toUpperCase() + selectedBike.condition?.slice(1)}</div>
                      <div><strong>Found:</strong> {new Date(selectedBike.dateFound).toLocaleDateString()}</div>
                      <div><strong>Status:</strong> {selectedBike.stillThere ? 'Still there' : 'Moved to safe location'}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-gray mb-2">Location</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Address:</strong> {selectedBike.location.address}</div>
                      <div><strong>Community:</strong> {selectedBike.location.city}</div>
                    </div>
                    {selectedBike.features && (
                      <div className="mt-4">
                        <h3 className="font-medium text-slate-gray mb-2">Features</h3>
                        <p className="text-sm text-slate-gray/80">{selectedBike.features}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedBike(null)}
                  >
                    Close Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
