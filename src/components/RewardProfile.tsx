'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { UserRewardProfile, rewardSystem } from '@/lib/rewardSystem';
import { useAuth } from '@/hooks/useAuth';
import { Trophy, Star, Award, Target, TrendingUp, Users } from 'lucide-react';

interface RewardProfileProps {
  className?: string;
}

export function RewardProfile({ className }: RewardProfileProps) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserRewardProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const userProfile = await rewardSystem.getUserRewardProfile(user.uid);
      setProfile(userProfile);
    } catch (error) {
      console.error('Error loading reward profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className={className}>
        <CardContent className="text-center py-8">
          <Trophy className="h-12 w-12 text-slate-gray/50 mx-auto mb-4" />
          <p className="text-slate-gray/60">Unable to load reward profile</p>
        </CardContent>
      </Card>
    );
  }

  const tier = rewardSystem.getRewardTier(profile.level);
  const progressPercentage = profile.nextLevelPoints > 0 
    ? ((profile.totalPoints - tier.minPoints) / (profile.nextLevelPoints + profile.totalPoints - tier.minPoints)) * 100
    : 100;

  return (
    <div className={className}>
      {/* Main Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-primary" />
            Your Reward Profile
          </CardTitle>
          <CardDescription>
            Track your community contributions and achievements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Level and Points */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl mr-3">{tier.icon}</span>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: tier.color }}>
                  {tier.name} Level
                </h3>
                <p className="text-slate-gray">{profile.totalPoints} points</p>
              </div>
            </div>

            {/* Progress Bar */}
            {profile.nextLevelPoints > 0 && (
              <div className="w-full bg-frost-gray rounded-full h-3 mb-2">
                <div 
                  className="h-3 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${progressPercentage}%`,
                    backgroundColor: tier.color
                  }}
                />
              </div>
            )}

            {profile.nextLevelPoints > 0 ? (
              <p className="text-sm text-slate-gray">
                {profile.nextLevelPoints} points to next level
              </p>
            ) : (
              <p className="text-sm text-success font-medium">
                🎉 Maximum level achieved!
              </p>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-frost-gray rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Users className="h-4 w-4 text-primary mr-1" />
                <span className="text-sm font-medium">Rank</span>
              </div>
              <p className="text-xl font-bold text-primary">#{profile.rank}</p>
            </div>
            <div className="text-center p-3 bg-frost-gray rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Award className="h-4 w-4 text-accent mr-1" />
                <span className="text-sm font-medium">Badges</span>
              </div>
              <p className="text-xl font-bold text-accent">{profile.badges.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      {profile.badges.length > 0 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-accent" />
              Badges Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {profile.badges.map((badge, index) => (
                <div key={index} className="flex items-center p-2 bg-accent/10 rounded-lg">
                  <Star className="h-4 w-4 text-accent mr-2" />
                  <span className="text-sm font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievements */}
      {profile.achievements.length > 0 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {profile.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center p-2 bg-primary/10 rounded-lg">
                  <Trophy className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm font-medium">{achievement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tier Benefits */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-primary" />
            {tier.name} Level Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {tier.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-sm">
                <div 
                  className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                  style={{ backgroundColor: tier.color }}
                />
                {benefit}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* How to Earn Points */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-success" />
            How to Earn Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-success/10 rounded-lg">
              <span className="text-sm font-medium">Recover a stolen bike</span>
              <span className="text-sm font-bold text-success">+25-50 pts</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-primary/10 rounded-lg">
              <span className="text-sm font-medium">Report found bike</span>
              <span className="text-sm font-bold text-primary">+20 pts</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-accent/10 rounded-lg">
              <span className="text-sm font-medium">Report safety concern</span>
              <span className="text-sm font-bold text-accent">+10-25 pts</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-frost-gray rounded-lg">
              <span className="text-sm font-medium">Help community member</span>
              <span className="text-sm font-bold text-slate-gray">+5 pts</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

