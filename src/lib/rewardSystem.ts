'use client';

import { collection, addDoc, query, where, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export interface Reward {
  id: string;
  userId: string;
  type: 'recovery' | 'report' | 'community' | 'milestone';
  points: number;
  description: string;
  bikeId?: string;
  createdAt: Date;
  status: 'pending' | 'approved' | 'redeemed';
  metadata?: {
    recoveryValue?: number;
    reportType?: string;
    communityAction?: string;
    milestoneType?: string;
  };
}

export interface UserRewardProfile {
  userId: string;
  totalPoints: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  badges: string[];
  achievements: string[];
  nextLevelPoints: number;
  rank: number; // Community ranking
}

export interface RewardTier {
  name: string;
  minPoints: number;
  benefits: string[];
  color: string;
  icon: string;
}

export class RewardSystem {
  private rewardTiers: RewardTier[] = [
    {
      name: 'Bronze',
      minPoints: 0,
      benefits: ['Basic community access', 'Standard support'],
      color: '#CD7F32',
      icon: '🥉'
    },
    {
      name: 'Silver',
      minPoints: 100,
      benefits: ['Priority support', 'Advanced search filters', 'Community badge'],
      color: '#C0C0C0',
      icon: '🥈'
    },
    {
      name: 'Gold',
      minPoints: 500,
      benefits: ['VIP support', 'Early feature access', 'Exclusive events', 'Gold badge'],
      color: '#FFD700',
      icon: '🥇'
    },
    {
      name: 'Platinum',
      minPoints: 1000,
      benefits: ['All Gold benefits', 'Community moderator privileges', 'Platinum badge', 'Annual recognition'],
      color: '#E5E4E2',
      icon: '💎'
    }
  ];

  async awardPoints(
    userId: string,
    type: Reward['type'],
    description: string,
    points: number,
    bikeId?: string,
    metadata?: Reward['metadata']
  ): Promise<string> {
    try {
      const reward: Omit<Reward, 'id'> = {
        userId,
        type,
        points,
        description,
        bikeId,
        createdAt: new Date(),
        status: 'pending',
        metadata
      };

      const docRef = await addDoc(collection(db, 'rewards'), reward);
      return docRef.id;
    } catch (error) {
      console.error('Error awarding points:', error);
      throw error;
    }
  }

  async getUserRewardProfile(userId: string): Promise<UserRewardProfile> {
    try {
      const rewardsQuery = query(
        collection(db, 'rewards'),
        where('userId', '==', userId),
        where('status', '==', 'approved')
      );

      const snapshot = await getDocs(rewardsQuery);
      const rewards = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Reward[];

      const totalPoints = rewards.reduce((sum, reward) => sum + reward.points, 0);
      const level = this.calculateLevel(totalPoints);
      const badges = this.calculateBadges(rewards);
      const achievements = this.calculateAchievements(rewards);
      const nextLevelPoints = this.getNextLevelPoints(totalPoints);
      const rank = await this.calculateRank(userId, totalPoints);

      return {
        userId,
        totalPoints,
        level,
        badges,
        achievements,
        nextLevelPoints,
        rank
      };
    } catch (error) {
      console.error('Error getting user reward profile:', error);
      throw error;
    }
  }

  private calculateLevel(points: number): UserRewardProfile['level'] {
    if (points >= 1000) return 'platinum';
    if (points >= 500) return 'gold';
    if (points >= 100) return 'silver';
    return 'bronze';
  }

  private calculateBadges(rewards: Reward[]): string[] {
    const badges: string[] = [];

    // Recovery badges
    const recoveryCount = rewards.filter(r => r.type === 'recovery').length;
    if (recoveryCount >= 1) badges.push('First Recovery');
    if (recoveryCount >= 5) badges.push('Recovery Expert');
    if (recoveryCount >= 10) badges.push('Bike Hero');

    // Community badges
    const communityCount = rewards.filter(r => r.type === 'community').length;
    if (communityCount >= 3) badges.push('Community Helper');
    if (communityCount >= 10) badges.push('Community Champion');

    // Milestone badges
    const totalPoints = rewards.reduce((sum, r) => sum + r.points, 0);
    if (totalPoints >= 100) badges.push('Point Collector');
    if (totalPoints >= 500) badges.push('Point Master');
    if (totalPoints >= 1000) badges.push('Point Legend');

    return badges;
  }

  private calculateAchievements(rewards: Reward[]): string[] {
    const achievements: string[] = [];

    const recoveryCount = rewards.filter(r => r.type === 'recovery').length;
    const reportCount = rewards.filter(r => r.type === 'report').length;
    const totalPoints = rewards.reduce((sum, r) => sum + r.points, 0);

    if (recoveryCount >= 1) achievements.push('First Bike Recovery');
    if (recoveryCount >= 5) achievements.push('Recovery Specialist');
    if (recoveryCount >= 10) achievements.push('Bike Recovery Master');
    if (reportCount >= 10) achievements.push('Community Reporter');
    if (totalPoints >= 100) achievements.push('Century Club');
    if (totalPoints >= 500) achievements.push('Half Millennium');
    if (totalPoints >= 1000) achievements.push('Millennium Club');

    return achievements;
  }

  private getNextLevelPoints(currentPoints: number): number {
    const currentTier = this.rewardTiers.find(tier => 
      currentPoints >= tier.minPoints && 
      (this.rewardTiers[this.rewardTiers.indexOf(tier) + 1]?.minPoints || Infinity) > currentPoints
    );

    if (!currentTier) return 0;

    const nextTier = this.rewardTiers[this.rewardTiers.indexOf(currentTier) + 1];
    return nextTier ? nextTier.minPoints - currentPoints : 0;
  }

  private async calculateRank(userId: string, userPoints: number): Promise<number> {
    try {
      const allRewardsQuery = query(collection(db, 'rewards'), where('status', '==', 'approved'));
      const snapshot = await getDocs(allRewardsQuery);
      
      const userPointsMap = new Map<string, number>();
      snapshot.docs.forEach(doc => {
        const reward = doc.data() as Reward;
        const current = userPointsMap.get(reward.userId) || 0;
        userPointsMap.set(reward.userId, current + reward.points);
      });

      const sortedUsers = Array.from(userPointsMap.entries())
        .sort(([,a], [,b]) => b - a);

      const rank = sortedUsers.findIndex(([id]) => id === userId) + 1;
      return rank || 1;
    } catch (error) {
      console.error('Error calculating rank:', error);
      return 1;
    }
  }

  getRewardTier(level: UserRewardProfile['level']): RewardTier {
    return this.rewardTiers.find(tier => tier.name.toLowerCase() === level) || this.rewardTiers[0];
  }

  calculateRecoveryPoints(bikeValue: number, condition: 'excellent' | 'good' | 'fair' | 'poor'): number {
    const basePoints = Math.min(50, Math.floor(bikeValue / 20)); // Max 50 points based on value
    const conditionMultiplier = {
      'excellent': 1.2,
      'good': 1.0,
      'fair': 0.8,
      'poor': 0.6
    };

    return Math.floor(basePoints * conditionMultiplier[condition]);
  }

  calculateReportPoints(reportType: string): number {
    const pointsMap: Record<string, number> = {
      'theft': 25,
      'hazard': 15,
      'found_bike': 20,
      'safety_concern': 10,
      'community_help': 5
    };

    return pointsMap[reportType] || 5;
  }
}

export const rewardSystem = new RewardSystem();

