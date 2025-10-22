'use client';

import { collection, addDoc, query, where, orderBy, getDocs, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface BikeShareListing {
  id: string;
  ownerId: string;
  ownerName: string;
  bike: {
    brand: string;
    model: string;
    type: string;
    color: string;
    size: string;
    condition: 'excellent' | 'good' | 'fair' | 'poor';
    photos: string[];
    features: string[];
  };
  location: {
    address: string;
    coordinates: [number, number];
    city: string;
  };
  availability: {
    startDate: Date;
    endDate: Date;
    timeSlots: {
      start: string; // HH:MM format
      end: string;
      available: boolean;
    }[];
  };
  pricing: {
    hourly: number;
    daily: number;
    weekly: number;
    deposit: number;
  };
  rules: {
    minAge: number;
    maxDistance: number; // in km
    helmetRequired: boolean;
    insuranceRequired: boolean;
    cancellationPolicy: string;
  };
  status: 'active' | 'inactive' | 'rented' | 'maintenance';
  createdAt: Timestamp;
  rating: number;
  totalRentals: number;
}

export interface BikeRental {
  id: string;
  listingId: string;
  renterId: string;
  renterName: string;
  startDate: Date;
  endDate: Date;
  totalCost: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: Timestamp;
  bikeCondition: {
    before: string[];
    after: string[];
  };
  review?: {
    rating: number;
    comment: string;
    createdAt: Timestamp;
  };
}

export interface BikeShareSearch {
  location: {
    coordinates: [number, number];
    radius: number; // in km
  };
  dateRange: {
    start: Date;
    end: Date;
  };
  bikeType?: string;
  maxPrice?: number;
  features?: string[];
}

export class BikeSharingSystem {
  async createListing(listing: Omit<BikeShareListing, 'id' | 'createdAt' | 'rating' | 'totalRentals'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'bikeShareListings'), {
        ...listing,
        createdAt: Timestamp.now(),
        rating: 0,
        totalRentals: 0,
        status: 'active'
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating bike share listing:', error);
      throw error;
    }
  }

  async searchListings(search: BikeShareSearch): Promise<BikeShareListing[]> {
    try {
      const listingsQuery = query(
        collection(db, 'bikeShareListings'),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(listingsQuery);
      let listings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BikeShareListing[];

      // Filter by location
      listings = listings.filter(listing => 
        this.isLocationInRange(
          listing.location.coordinates,
          search.location.coordinates,
          search.location.radius * 1000 // Convert km to meters
        )
      );

      // Filter by date range
      listings = listings.filter(listing => 
        this.isDateRangeAvailable(listing.availability, search.dateRange)
      );

      // Filter by bike type
      if (search.bikeType) {
        listings = listings.filter(listing => 
          listing.bike.type.toLowerCase().includes(search.bikeType!.toLowerCase())
        );
      }

      // Filter by max price
      if (search.maxPrice) {
        listings = listings.filter(listing => 
          listing.pricing.hourly <= search.maxPrice!
        );
      }

      // Filter by features
      if (search.features && search.features.length > 0) {
        listings = listings.filter(listing =>
          search.features!.every(feature =>
            listing.bike.features.some(bikeFeature =>
              bikeFeature.toLowerCase().includes(feature.toLowerCase())
            )
          )
        );
      }

      return listings;
    } catch (error) {
      console.error('Error searching bike share listings:', error);
      throw error;
    }
  }

  async createRental(rental: Omit<BikeRental, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'bikeRentals'), {
        ...rental,
        createdAt: Timestamp.now()
      });

      // Update listing status
      await updateDoc(doc(db, 'bikeShareListings', rental.listingId), {
        status: 'rented'
      });

      return docRef.id;
    } catch (error) {
      console.error('Error creating bike rental:', error);
      throw error;
    }
  }

  async getUserListings(userId: string): Promise<BikeShareListing[]> {
    try {
      const listingsQuery = query(
        collection(db, 'bikeShareListings'),
        where('ownerId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(listingsQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BikeShareListing[];
    } catch (error) {
      console.error('Error getting user listings:', error);
      throw error;
    }
  }

  async getUserRentals(userId: string): Promise<BikeRental[]> {
    try {
      const rentalsQuery = query(
        collection(db, 'bikeRentals'),
        where('renterId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(rentalsQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BikeRental[];
    } catch (error) {
      console.error('Error getting user rentals:', error);
      throw error;
    }
  }

  async updateListingStatus(listingId: string, status: BikeShareListing['status']): Promise<void> {
    try {
      await updateDoc(doc(db, 'bikeShareListings', listingId), { status });
    } catch (error) {
      console.error('Error updating listing status:', error);
      throw error;
    }
  }

  async addReview(rentalId: string, review: { rating: number; comment: string }): Promise<void> {
    try {
      await updateDoc(doc(db, 'bikeRentals', rentalId), {
        review: {
          ...review,
          createdAt: Timestamp.now()
        }
      });

      // Update listing rating
      const rental = await getDocs(query(collection(db, 'bikeRentals'), where('id', '==', rentalId)));
      if (!rental.empty) {
        const rentalData = rental.docs[0].data() as BikeRental;
        const listingId = rentalData.listingId;
        
        // Calculate new average rating
        const reviewsQuery = query(
          collection(db, 'bikeRentals'),
          where('listingId', '==', listingId),
          where('review', '!=', null)
        );
        
        const reviewsSnapshot = await getDocs(reviewsQuery);
        const reviews = reviewsSnapshot.docs.map(doc => doc.data().review);
        const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        
        await updateDoc(doc(db, 'bikeShareListings', listingId), {
          rating: Math.round(averageRating * 10) / 10
        });
      }
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  }

  private isLocationInRange(
    listingCoords: [number, number],
    searchCoords: [number, number],
    radius: number
  ): boolean {
    const distance = this.calculateDistance(listingCoords, searchCoords);
    return distance <= radius;
  }

  private isDateRangeAvailable(
    availability: BikeShareListing['availability'],
    searchRange: { start: Date; end: Date }
  ): boolean {
    return searchRange.start >= availability.startDate && 
           searchRange.end <= availability.endDate;
  }

  private calculateDistance(coord1: [number, number], coord2: [number, number]): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = coord1[0] * Math.PI / 180;
    const φ2 = coord2[0] * Math.PI / 180;
    const Δφ = (coord2[0] - coord1[0]) * Math.PI / 180;
    const Δλ = (coord2[1] - coord1[1]) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  calculateRentalCost(
    pricing: BikeShareListing['pricing'],
    startDate: Date,
    endDate: Date
  ): number {
    const durationMs = endDate.getTime() - startDate.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);
    const durationDays = durationHours / 24;

    if (durationDays >= 7) {
      const weeks = Math.ceil(durationDays / 7);
      return weeks * pricing.weekly;
    } else if (durationDays >= 1) {
      const days = Math.ceil(durationDays);
      return days * pricing.daily;
    } else {
      const hours = Math.ceil(durationHours);
      return hours * pricing.hourly;
    }
  }

  generateListingId(): string {
    return `bike_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  validateRentalDates(
    startDate: Date,
    endDate: Date,
    availability: BikeShareListing['availability']
  ): { valid: boolean; message?: string } {
    if (startDate >= endDate) {
      return { valid: false, message: 'End date must be after start date' };
    }

    if (startDate < availability.startDate) {
      return { valid: false, message: 'Start date is before availability period' };
    }

    if (endDate > availability.endDate) {
      return { valid: false, message: 'End date is after availability period' };
    }

    return { valid: true };
  }
}

export const bikeSharingSystem = new BikeSharingSystem();

