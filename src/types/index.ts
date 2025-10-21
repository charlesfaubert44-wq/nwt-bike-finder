export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phone?: string;
  createdAt: string;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
  city: string;
  territory: 'NWT';
}

export interface Bike {
  id: string;
  userId: string;
  photos: string[];
  color: string;
  type: 'road' | 'mountain' | 'hybrid' | 'electric' | 'other';
  condition?: 'excellent' | 'good' | 'fair' | 'poor';
  features: string;
  location: Location;
  status: 'active' | 'resolved' | 'removed';
  createdAt: string;
  imageFeatures?: number[];
}

export interface StolenBike extends Bike {
  brand: string;
  model: string;
  size: string;
  dateStolen: string;
  contactPreference: 'email' | 'phone' | 'chat';
}

export interface FoundBike extends Bike {
  dateFound: string;
  stillThere: boolean;
}

export interface Match {
  id: string;
  stolenBikeId: string;
  foundBikeId: string;
  similarityScore: number;
  status: 'pending' | 'chatting' | 'resolved';
  resolution?: 'reunited' | 'false-alarm';
  chatRoomId?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image';
  imageUrl?: string;
}

export interface Report {
  id: string;
  reportedItemId: string;
  reportedItemType: 'stolen' | 'found';
  reporterId: string;
  reason: string;
  status: 'pending' | 'reviewed';
  resolution?: 'approved' | 'dismissed';
  reviewedAt?: string;
  reviewedBy?: string;
  createdAt: string;
}

export interface BikeFormData {
  photos: File[];
  color: string;
  type: 'road' | 'mountain' | 'hybrid' | 'electric' | 'other';
  features: string;
  location: Location;
}

export interface StolenBikeFormData extends BikeFormData {
  brand: string;
  model: string;
  size: string;
  dateStolen: string;
  contactPreference: 'email' | 'phone' | 'chat';
}

export interface FoundBikeFormData extends BikeFormData {
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  dateFound: string;
  stillThere: boolean;
}

export interface ImageMatchResult {
  bikeId: string;
  similarity: number;
  bike: StolenBike | FoundBike;
}

export interface NWTCommunity {
  name: string;
  coordinates: [number, number];
  population: number;
  region: 'North Slave' | 'South Slave' | 'Dehcho' | 'Sahtu' | 'Beaufort Delta' | 'Tłı̨chǫ';
}

// Soft Launch: Yellowknife area only
export const NWT_COMMUNITIES: NWTCommunity[] = [
  { name: 'Yellowknife', coordinates: [-114.3707, 62.4540], population: 20000, region: 'North Slave' },
  { name: 'Dettah', coordinates: [-114.3707, 62.4111], population: 200, region: 'North Slave' },
  { name: 'N\'Dilo', coordinates: [-114.3707, 62.4706], population: 200, region: 'North Slave' }
];

// Full NWT communities (for future expansion)
export const FULL_NWT_COMMUNITIES: NWTCommunity[] = [
  { name: 'Yellowknife', coordinates: [-114.3707, 62.4540], population: 20000, region: 'North Slave' },
  { name: 'Hay River', coordinates: [-115.7994, 60.8156], population: 3500, region: 'South Slave' },
  { name: 'Inuvik', coordinates: [-133.7218, 68.3607], population: 3200, region: 'Beaufort Delta' },
  { name: 'Fort Smith', coordinates: [-111.8881, 60.0042], population: 2500, region: 'South Slave' },
  { name: 'Behchokǫ̀', coordinates: [-117.2019, 62.8025], population: 2000, region: 'North Slave' },
  { name: 'Whatì', coordinates: [-117.2019, 63.1436], population: 500, region: 'North Slave' },
  { name: 'Gamètì', coordinates: [-117.2019, 64.1122], population: 300, region: 'North Slave' },
  { name: 'Wekweètì', coordinates: [-117.2019, 64.1914], population: 150, region: 'North Slave' },
  { name: 'Dettah', coordinates: [-114.3707, 62.4111], population: 200, region: 'North Slave' },
  { name: 'N\'Dilo', coordinates: [-114.3707, 62.4706], population: 200, region: 'North Slave' },
  { name: 'Fort Simpson', coordinates: [-121.3081, 61.8631], population: 1200, region: 'Dehcho' },
  { name: 'Fort Providence', coordinates: [-117.6500, 61.3500], population: 800, region: 'Dehcho' },
  { name: 'Fort Liard', coordinates: [-123.4667, 60.2333], population: 500, region: 'Dehcho' },
  { name: 'Wrigley', coordinates: [-123.4667, 63.2333], population: 150, region: 'Dehcho' },
  { name: 'Jean Marie River', coordinates: [-120.5167, 61.5167], population: 100, region: 'Dehcho' },
  { name: 'Kakisa', coordinates: [-117.4000, 60.9167], population: 50, region: 'Dehcho' },
  { name: 'Norman Wells', coordinates: [-126.8333, 65.2833], population: 800, region: 'Sahtu' },
  { name: 'Délı̨nę', coordinates: [-123.4333, 65.2000], population: 500, region: 'Sahtu' },
  { name: 'Colville Lake', coordinates: [-126.0833, 67.0333], population: 150, region: 'Sahtu' },
  { name: 'Fort Good Hope', coordinates: [-128.6500, 66.2667], population: 550, region: 'Sahtu' },
  { name: 'Tulita', coordinates: [-125.8500, 64.9000], population: 500, region: 'Sahtu' },
  { name: 'Aklavik', coordinates: [-135.0106, 68.2192], population: 600, region: 'Beaufort Delta' },
  { name: 'Tuktoyaktuk', coordinates: [-133.0378, 69.4447], population: 900, region: 'Beaufort Delta' },
  { name: 'Paulatuk', coordinates: [-124.0667, 69.3500], population: 300, region: 'Beaufort Delta' },
  { name: 'Sachs Harbour', coordinates: [-125.0000, 71.9833], population: 100, region: 'Beaufort Delta' },
  { name: 'Ulukhaktok', coordinates: [-117.7500, 70.7333], population: 400, region: 'Beaufort Delta' },
  { name: 'Behchokǫ̀', coordinates: [-117.2019, 62.8025], population: 2000, region: 'Tłı̨chǫ' },
  { name: 'Gamètì', coordinates: [-117.2019, 64.1122], population: 300, region: 'Tłı̨chǫ' },
  { name: 'Wekweètì', coordinates: [-117.2019, 64.1914], population: 150, region: 'Tłı̨chǫ' },
  { name: 'Whatì', coordinates: [-117.2019, 63.1436], population: 500, region: 'Tłı̨chǫ' }
];
