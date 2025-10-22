'use client';

import { collection, addDoc, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface SafetyAlert {
  id: string;
  type: 'theft' | 'hazard' | 'police' | 'weather' | 'construction';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: {
    address: string;
    coordinates: [number, number];
    radius: number; // in meters
  };
  reportedBy: string;
  reportedAt: Timestamp;
  expiresAt: Timestamp;
  isActive: boolean;
  affectedAreas: string[];
  recommendations: string[];
}

export interface SafetyAlertSubscription {
  userId: string;
  alertTypes: SafetyAlert['type'][];
  locations: {
    address: string;
    coordinates: [number, number];
    radius: number;
  }[];
  notificationPreferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

export class SafetyAlertSystem {
  async createAlert(alert: Omit<SafetyAlert, 'id' | 'reportedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'safetyAlerts'), {
        ...alert,
        reportedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating safety alert:', error);
      throw error;
    }
  }

  async getActiveAlerts(location?: { coordinates: [number, number]; radius: number }): Promise<SafetyAlert[]> {
    try {
      const q = query(
        collection(db, 'safetyAlerts'),
        where('isActive', '==', true),
        where('expiresAt', '>', Timestamp.now()),
        orderBy('reportedAt', 'desc')
      );

      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const alerts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as SafetyAlert[];

          // Filter by location if provided
          if (location) {
            const filteredAlerts = alerts.filter(alert => 
              this.isLocationInRange(alert.location.coordinates, location.coordinates, location.radius)
            );
            resolve(filteredAlerts);
          } else {
            resolve(alerts);
          }
        }, reject);
      });
    } catch (error) {
      console.error('Error fetching safety alerts:', error);
      throw error;
    }
  }

  private isLocationInRange(
    alertCoords: [number, number], 
    userCoords: [number, number], 
    radius: number
  ): boolean {
    const distance = this.calculateDistance(alertCoords, userCoords);
    return distance <= radius;
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

  generateAlertRecommendations(alert: SafetyAlert): string[] {
    const recommendations: string[] = [];

    switch (alert.type) {
      case 'theft':
        recommendations.push('Avoid parking bikes in this area');
        recommendations.push('Use additional locks and security measures');
        recommendations.push('Report any suspicious activity to police');
        break;
      case 'hazard':
        recommendations.push('Exercise extra caution when cycling');
        recommendations.push('Consider alternative routes if possible');
        recommendations.push('Report the hazard to city services');
        break;
      case 'police':
        recommendations.push('Follow all traffic laws and regulations');
        recommendations.push('Have proper identification and bike registration');
        recommendations.push('Be prepared for potential stops');
        break;
      case 'weather':
        recommendations.push('Check weather conditions before cycling');
        recommendations.push('Use appropriate safety gear');
        recommendations.push('Consider postponing non-essential trips');
        break;
      case 'construction':
        recommendations.push('Use designated detour routes');
        recommendations.push('Watch for construction vehicles and workers');
        recommendations.push('Reduce speed and increase following distance');
        break;
    }

    return recommendations;
  }

  getAlertIcon(type: SafetyAlert['type']): string {
    switch (type) {
      case 'theft': return '🚨';
      case 'hazard': return '⚠️';
      case 'police': return '👮';
      case 'weather': return '🌧️';
      case 'construction': return '🚧';
      default: return '📢';
    }
  }

  getSeverityColor(severity: SafetyAlert['severity']): string {
    switch (severity) {
      case 'low': return 'text-success';
      case 'medium': return 'text-accent';
      case 'high': return 'text-danger';
      case 'critical': return 'text-red-600';
      default: return 'text-slate-gray';
    }
  }
}

export const safetyAlertSystem = new SafetyAlertSystem();

