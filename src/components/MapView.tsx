'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FoundBike } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Bike, MapPin, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

// Fix for default markers in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bike marker icon
const createBikeIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-bike-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 16px;
      ">
        🚲
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
};

interface MapViewProps {
  bikes: FoundBike[];
  onBikeSelect?: (bike: FoundBike) => void;
  selectedBikeId?: string;
  className?: string;
}

function MapContent({ bikes, onBikeSelect, selectedBikeId }: Omit<MapViewProps, 'className'>) {
  const map = useMap();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (bikes.length > 0 && isClient) {
      const bounds = L.latLngBounds(
        bikes.map(bike => [bike.location.lat, bike.location.lng])
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [bikes, map, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {bikes.map((bike) => (
        <Marker
          key={bike.id}
          position={[bike.location.lat, bike.location.lng]}
          icon={createBikeIcon(bike.color === 'red' ? '#C84630' : bike.color === 'blue' ? '#4A90A4' : bike.color === 'green' ? '#2D5F5D' : '#6B7280')}
          eventHandlers={{
            click: () => onBikeSelect?.(bike)
          }}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <div className="flex items-center space-x-2 mb-2">
                <Bike className="h-4 w-4 text-primary" />
                <span className="font-medium text-slate-gray">
                  {bike.type.charAt(0).toUpperCase() + bike.type.slice(1)} Bike
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: bike.color }}
                  />
                  <span className="text-slate-gray">{bike.color}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3 text-slate-gray" />
                  <span className="text-slate-gray">{bike.location.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-3 w-3 text-slate-gray" />
                  <span className="text-slate-gray">{formatDate(bike.dateFound)}</span>
                </div>
                {bike.features && (
                  <p className="text-xs text-slate-gray/80 mt-2">
                    {bike.features.length > 100 
                      ? `${bike.features.substring(0, 100)}...` 
                      : bike.features
                    }
                  </p>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export function MapView({ bikes, onBikeSelect, selectedBikeId, className }: MapViewProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={`flex items-center justify-center h-96 bg-frost-gray rounded-lg ${className}`}>
        <div className="text-center">
          <MapPin className="h-8 w-8 text-slate-gray/50 mx-auto mb-2" />
          <p className="text-slate-gray/50">Loading map...</p>
        </div>
      </div>
    );
  }

  // Default to Yellowknife area for soft launch
  const center: [number, number] = bikes.length > 0 
    ? [bikes[0].location.lat, bikes[0].location.lng]
    : [62.4540, -114.3707]; // Yellowknife coordinates

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={bikes.length > 1 ? 10 : 13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapContent 
          bikes={bikes} 
          onBikeSelect={onBikeSelect} 
          selectedBikeId={selectedBikeId}
        />
      </MapContainer>
    </div>
  );
}
