'use client';

import { useState } from 'react';
import { X, Info, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function SoftLaunchBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-accent/20 to-primary/20 border-b border-accent/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
              <Info className="h-4 w-4 text-accent" />
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-slate-gray" />
              <span className="font-medium text-slate-gray">
                <strong>Soft Launch:</strong> Currently serving Yellowknife area only
              </span>
              <span className="text-slate-gray/60">
                • Dettah • N'Dilo
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="h-8 w-8 text-slate-gray hover:text-slate-gray/80"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
