import { FoundBike, StolenBike } from '@/types';

export const DEMO_FOUND_BIKES: FoundBike[] = [
  {
    id: 'demo-1',
    userId: 'demo-user-1',
    photos: ['/demo-images/bike1.jpg'],
    color: 'red',
    type: 'mountain',
    condition: 'good',
    features: 'Black handlebars, red frame, mountain bike tires',
    location: {
      lat: 62.4540,
      lng: -114.3707,
      address: '50th Street near City Hall',
      city: 'Yellowknife',
      territory: 'NWT'
    },
    dateFound: '2024-10-15',
    stillThere: true,
    status: 'active',
    createdAt: '2024-10-15T10:30:00Z'
  },
  {
    id: 'demo-2',
    userId: 'demo-user-2',
    photos: ['/demo-images/bike2.jpg'],
    color: 'blue',
    type: 'road',
    condition: 'excellent',
    features: 'White seat, blue frame, road bike wheels',
    location: {
      lat: 62.4600,
      lng: -114.3600,
      address: 'Franklin Avenue near McDonald\'s',
      city: 'Yellowknife',
      territory: 'NWT'
    },
    dateFound: '2024-10-14',
    stillThere: false,
    status: 'active',
    createdAt: '2024-10-14T15:45:00Z'
  },
  {
    id: 'demo-3',
    userId: 'demo-user-3',
    photos: ['/demo-images/bike3.jpg'],
    color: 'green',
    type: 'hybrid',
    condition: 'fair',
    features: 'Black basket on front, green frame, hybrid tires',
    location: {
      lat: 62.4400,
      lng: -114.3800,
      address: 'Old Town near Bush Pilot Monument',
      city: 'Yellowknife',
      territory: 'NWT'
    },
    dateFound: '2024-10-13',
    stillThere: true,
    status: 'active',
    createdAt: '2024-10-13T09:15:00Z'
  }
];

export const DEMO_STOLEN_BIKES: StolenBike[] = [
  {
    id: 'demo-stolen-1',
    userId: 'demo-user-4',
    photos: ['/demo-images/stolen1.jpg'],
    brand: 'Trek',
    model: 'Domane',
    color: 'black',
    type: 'road',
    size: 'M',
    features: 'Carbon frame, Shimano components, black and white color scheme',
    location: {
      lat: 62.4500,
      lng: -114.3700,
      address: 'Downtown Yellowknife',
      city: 'Yellowknife',
      territory: 'NWT'
    },
    dateStolen: '2024-10-10',
    contactPreference: 'email',
    status: 'active',
    createdAt: '2024-10-10T08:00:00Z'
  },
  {
    id: 'demo-stolen-2',
    userId: 'demo-user-5',
    photos: ['/demo-images/stolen2.jpg'],
    brand: 'Giant',
    model: 'Talon',
    color: 'red',
    type: 'mountain',
    size: 'L',
    features: 'Red frame, black handlebars, mountain bike tires, front suspension',
    location: {
      lat: 62.4600,
      lng: -114.3600,
      address: 'Range Lake area',
      city: 'Yellowknife',
      territory: 'NWT'
    },
    dateStolen: '2024-10-08',
    contactPreference: 'phone',
    status: 'active',
    createdAt: '2024-10-08T18:30:00Z'
  }
];

export const DEMO_MATCHES = [
  {
    id: 'demo-match-1',
    stolenBikeId: 'demo-stolen-1',
    foundBikeId: 'demo-2',
    similarityScore: 85,
    status: 'pending' as const,
    createdAt: '2024-10-15T11:00:00Z'
  }
];
