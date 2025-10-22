'use client';

import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface TheftPattern {
  id: string;
  location: {
    address: string;
    coordinates: [number, number];
  };
  timeOfDay: string;
  dayOfWeek: string;
  bikeType: string;
  bikeColor: string;
  bikeValue: number;
  reportedAt: Timestamp;
  description: string;
}

export interface TheftAnalysis {
  hotspots: {
    location: string;
    coordinates: [number, number];
    theftCount: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  }[];
  timePatterns: {
    hour: number;
    theftCount: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  }[];
  dayPatterns: {
    day: string;
    theftCount: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  }[];
  bikeTypeTargets: {
    type: string;
    theftCount: number;
    percentage: number;
  }[];
  colorTargets: {
    color: string;
    theftCount: number;
    percentage: number;
  }[];
  valueAnalysis: {
    averageValue: number;
    medianValue: number;
    highValueTargets: number;
  };
  trends: {
    period: string;
    theftCount: number;
    change: number; // percentage change
  }[];
  recommendations: string[];
}

export class TheftPatternAnalysis {
  async analyzeTheftPatterns(
    timeRange: { start: Date; end: Date },
    locationFilter?: { coordinates: [number, number]; radius: number }
  ): Promise<TheftAnalysis> {
    try {
      // Query theft reports within time range
      const theftsQuery = query(
        collection(db, 'stolenBikes'),
        where('createdAt', '>=', Timestamp.fromDate(timeRange.start)),
        where('createdAt', '<=', Timestamp.fromDate(timeRange.end)),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(theftsQuery);
      const thefts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TheftPattern[];

      // Filter by location if provided
      const filteredThefts = locationFilter 
        ? thefts.filter(theft => this.isLocationInRange(
            theft.location.coordinates, 
            locationFilter.coordinates, 
            locationFilter.radius
          ))
        : thefts;

      return this.generateAnalysis(filteredThefts);
    } catch (error) {
      console.error('Error analyzing theft patterns:', error);
      throw error;
    }
  }

  private generateAnalysis(thefts: TheftPattern[]): TheftAnalysis {
    const hotspots = this.analyzeHotspots(thefts);
    const timePatterns = this.analyzeTimePatterns(thefts);
    const dayPatterns = this.analyzeDayPatterns(thefts);
    const bikeTypeTargets = this.analyzeBikeTypeTargets(thefts);
    const colorTargets = this.analyzeColorTargets(thefts);
    const valueAnalysis = this.analyzeValuePatterns(thefts);
    const trends = this.analyzeTrends(thefts);
    const recommendations = this.generateRecommendations(thefts, hotspots, timePatterns);

    return {
      hotspots,
      timePatterns,
      dayPatterns,
      bikeTypeTargets,
      colorTargets,
      valueAnalysis,
      trends,
      recommendations
    };
  }

  private analyzeHotspots(thefts: TheftPattern[]): TheftAnalysis['hotspots'] {
    const locationMap = new Map<string, { count: number; coordinates: [number, number] }>();

    thefts.forEach(theft => {
      const key = theft.location.address;
      if (locationMap.has(key)) {
        locationMap.get(key)!.count++;
      } else {
        locationMap.set(key, { count: 1, coordinates: theft.location.coordinates });
      }
    });

    return Array.from(locationMap.entries())
      .map(([location, data]) => ({
        location,
        coordinates: data.coordinates,
        theftCount: data.count,
        riskLevel: this.calculateRiskLevel(data.count, thefts.length)
      }))
      .sort((a, b) => b.theftCount - a.theftCount)
      .slice(0, 10); // Top 10 hotspots
  }

  private analyzeTimePatterns(thefts: TheftPattern[]): TheftAnalysis['timePatterns'] {
    const hourMap = new Map<number, number>();

    thefts.forEach(theft => {
      const hour = new Date(theft.reportedAt.toDate()).getHours();
      hourMap.set(hour, (hourMap.get(hour) || 0) + 1);
    });

    return Array.from({ length: 24 }, (_, hour) => ({
      hour,
      theftCount: hourMap.get(hour) || 0,
      riskLevel: this.calculateRiskLevel(hourMap.get(hour) || 0, thefts.length)
    }));
  }

  private analyzeDayPatterns(thefts: TheftPattern[]): TheftAnalysis['dayPatterns'] {
    const dayMap = new Map<string, number>();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    thefts.forEach(theft => {
      const day = days[new Date(theft.reportedAt.toDate()).getDay()];
      dayMap.set(day, (dayMap.get(day) || 0) + 1);
    });

    return days.map(day => ({
      day,
      theftCount: dayMap.get(day) || 0,
      riskLevel: this.calculateRiskLevel(dayMap.get(day) || 0, thefts.length)
    }));
  }

  private analyzeBikeTypeTargets(thefts: TheftPattern[]): TheftAnalysis['bikeTypeTargets'] {
    const typeMap = new Map<string, number>();

    thefts.forEach(theft => {
      typeMap.set(theft.bikeType, (typeMap.get(theft.bikeType) || 0) + 1);
    });

    const total = thefts.length;
    return Array.from(typeMap.entries())
      .map(([type, count]) => ({
        type,
        theftCount: count,
        percentage: Math.round((count / total) * 100)
      }))
      .sort((a, b) => b.theftCount - a.theftCount);
  }

  private analyzeColorTargets(thefts: TheftPattern[]): TheftAnalysis['colorTargets'] {
    const colorMap = new Map<string, number>();

    thefts.forEach(theft => {
      colorMap.set(theft.bikeColor, (colorMap.get(theft.bikeColor) || 0) + 1);
    });

    const total = thefts.length;
    return Array.from(colorMap.entries())
      .map(([color, count]) => ({
        color,
        theftCount: count,
        percentage: Math.round((count / total) * 100)
      }))
      .sort((a, b) => b.theftCount - a.theftCount);
  }

  private analyzeValuePatterns(thefts: TheftPattern[]): TheftAnalysis['valueAnalysis'] {
    const values = thefts.map(theft => theft.bikeValue).sort((a, b) => a - b);
    const averageValue = values.reduce((sum, val) => sum + val, 0) / values.length;
    const medianValue = values[Math.floor(values.length / 2)];
    const highValueTargets = values.filter(val => val > averageValue * 1.5).length;

    return {
      averageValue: Math.round(averageValue),
      medianValue: Math.round(medianValue),
      highValueTargets
    };
  }

  private analyzeTrends(thefts: TheftPattern[]): TheftAnalysis['trends'] {
    // Group by week for trend analysis
    const weekMap = new Map<string, number>();
    
    thefts.forEach(theft => {
      const date = new Date(theft.reportedAt.toDate());
      const weekKey = `${date.getFullYear()}-W${this.getWeekNumber(date)}`;
      weekMap.set(weekKey, (weekMap.get(weekKey) || 0) + 1);
    });

    const weeks = Array.from(weekMap.entries()).sort();
    return weeks.map(([period, count], index) => ({
      period,
      theftCount: count,
      change: index > 0 ? ((count - weeks[index - 1][1]) / weeks[index - 1][1]) * 100 : 0
    }));
  }

  private generateRecommendations(
    thefts: TheftPattern[],
    hotspots: TheftAnalysis['hotspots'],
    timePatterns: TheftAnalysis['timePatterns']
  ): string[] {
    const recommendations: string[] = [];

    // Hotspot recommendations
    const highRiskHotspots = hotspots.filter(h => h.riskLevel === 'high' || h.riskLevel === 'critical');
    if (highRiskHotspots.length > 0) {
      recommendations.push(`Avoid parking bikes at high-risk locations: ${highRiskHotspots.map(h => h.location).join(', ')}`);
    }

    // Time-based recommendations
    const highRiskHours = timePatterns.filter(t => t.riskLevel === 'high' || t.riskLevel === 'critical');
    if (highRiskHours.length > 0) {
      const hours = highRiskHours.map(h => h.hour).sort();
      recommendations.push(`Be extra cautious during high-risk hours: ${hours.join(', ')}`);
    }

    // General recommendations
    if (thefts.length > 10) {
      recommendations.push('Consider using multiple locks and security measures');
      recommendations.push('Register your bike with local authorities');
      recommendations.push('Take photos of your bike and keep serial numbers');
    }

    return recommendations;
  }

  private calculateRiskLevel(count: number, total: number): 'low' | 'medium' | 'high' | 'critical' {
    const percentage = (count / total) * 100;
    if (percentage >= 20) return 'critical';
    if (percentage >= 10) return 'high';
    if (percentage >= 5) return 'medium';
    return 'low';
  }

  private isLocationInRange(
    theftCoords: [number, number],
    userCoords: [number, number],
    radius: number
  ): boolean {
    const distance = this.calculateDistance(theftCoords, userCoords);
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

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
}

export const theftAnalysis = new TheftPatternAnalysis();

