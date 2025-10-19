import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getTimeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function getCommunityFromCoordinates(lat: number, lng: number): string {
  // Simple distance-based community detection
  // In a real app, you'd use a more sophisticated geocoding service
  const communities = [
    { name: 'Yellowknife', lat: 62.4540, lng: -114.3707 },
    { name: 'Hay River', lat: 60.8156, lng: -115.7994 },
    { name: 'Inuvik', lat: 68.3607, lng: -133.7218 },
    { name: 'Fort Smith', lat: 60.0042, lng: -111.8881 },
    { name: 'Behchokǫ̀', lat: 62.8025, lng: -117.2019 },
    { name: 'Fort Simpson', lat: 61.8631, lng: -121.3081 },
    { name: 'Norman Wells', lat: 65.2833, lng: -126.8333 },
    { name: 'Aklavik', lat: 68.2192, lng: -135.0106 },
    { name: 'Tuktoyaktuk', lat: 69.4447, lng: -133.0378 }
  ];

  let closestCommunity = communities[0];
  let minDistance = calculateDistance(lat, lng, closestCommunity.lat, closestCommunity.lng);

  for (const community of communities) {
    const distance = calculateDistance(lat, lng, community.lat, community.lng);
    if (distance < minDistance) {
      minDistance = distance;
      closestCommunity = community;
    }
  }

  return closestCommunity.name;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
