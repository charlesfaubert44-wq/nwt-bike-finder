'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getStolenBikes, getFoundBikes, getMatches, updateStolenBike, updateFoundBike, deleteStolenBike, deleteFoundBike } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StolenBike, FoundBike, Match } from '@/types';
import { User as UserIcon, Bike, MapPin, Calendar, Shield, CheckCircle, Trash2, Edit, MessageCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { formatDate, getTimeAgo } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [stolenBikes, setStolenBikes] = useState<StolenBike[]>([]);
  const [foundBikes, setFoundBikes] = useState<FoundBike[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'stolen' | 'found' | 'matches'>('stolen');

  const fetchUserData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const [stolenData, foundData, matchesData] = await Promise.all([
        getStolenBikes(user.uid),
        getFoundBikes().then(bikes => bikes.filter(b => b.userId === user.uid)),
        getMatches(user.uid)
      ]);

      setStolenBikes(stolenData);
      setFoundBikes(foundData);
      setMatches(matchesData);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load your data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleDeleteStolen = async (bikeId: string) => {
    if (!confirm('Are you sure you want to delete this stolen bike report?')) return;

    try {
      await deleteStolenBike(bikeId);
      await fetchUserData();
    } catch (err) {
      console.error('Error deleting bike:', err);
      alert('Failed to delete bike');
    }
  };

  const handleDeleteFound = async (bikeId: string) => {
    if (!confirm('Are you sure you want to delete this found bike report?')) return;

    try {
      await deleteFoundBike(bikeId);
      await fetchUserData();
    } catch (err) {
      console.error('Error deleting bike:', err);
      alert('Failed to delete bike');
    }
  };

  const handleMarkResolved = async (bikeId: string, type: 'stolen' | 'found') => {
    if (!confirm('Mark this bike as resolved?')) return;

    try {
      if (type === 'stolen') {
        await updateStolenBike(bikeId, { status: 'resolved' });
      } else {
        await updateFoundBike(bikeId, { status: 'resolved' });
      }
      await fetchUserData();
    } catch (err) {
      console.error('Error updating bike:', err);
      alert('Failed to update bike');
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please sign in to view your profile</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push('/auth/login')}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 text-primary animate-spin mb-4" />
            <p className="text-slate-gray">Loading your profile...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-gray mb-2">My Profile</h1>
          <p className="text-slate-gray/80">
            Manage your bike reports and account
          </p>
        </div>

        {error && (
          <Card className="mb-6 border-danger/20 bg-danger/10">
            <CardContent className="pt-6">
              <p className="text-danger">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* User Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-primary" />
                Account Information
              </span>
              <Button variant="outline" onClick={handleLogout} size="sm">
                Sign Out
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-gray">Display Name</label>
                <p className="text-lg">{user.displayName || 'Anonymous'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-gray">Email</label>
                <p className="text-lg">{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-danger" />
                <div>
                  <p className="text-2xl font-bold text-danger">
                    {stolenBikes.filter(b => b.status === 'active').length}
                  </p>
                  <p className="text-sm text-slate-gray">Active Stolen Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold text-success">
                    {foundBikes.filter(b => b.status === 'active').length}
                  </p>
                  <p className="text-sm text-slate-gray">Found Bike Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {matches.filter(m => m.status === 'pending' || m.status === 'chatting').length}
                  </p>
                  <p className="text-sm text-slate-gray">Active Matches</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex space-x-2">
          <Button
            variant={activeTab === 'stolen' ? 'default' : 'outline'}
            onClick={() => setActiveTab('stolen')}
          >
            <Shield className="h-4 w-4 mr-2" />
            Stolen Bikes ({stolenBikes.length})
          </Button>
          <Button
            variant={activeTab === 'found' ? 'default' : 'outline'}
            onClick={() => setActiveTab('found')}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Found Bikes ({foundBikes.length})
          </Button>
          <Button
            variant={activeTab === 'matches' ? 'default' : 'outline'}
            onClick={() => setActiveTab('matches')}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Matches ({matches.length})
          </Button>
        </div>

        {/* Stolen Bikes Tab */}
        {activeTab === 'stolen' && (
          <div className="space-y-4">
            {stolenBikes.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Shield className="h-12 w-12 text-slate-gray/50 mx-auto mb-4" />
                  <p className="text-slate-gray/60 mb-4">You haven't reported any stolen bikes</p>
                  <Link href="/report/stolen">
                    <Button>Report Stolen Bike</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              stolenBikes.map((bike) => (
                <Card key={bike.id} className={bike.status === 'resolved' ? 'opacity-60' : ''}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-32 h-32 flex-shrink-0">
                        <img
                          src={bike.photos[0]}
                          alt={`${bike.brand} ${bike.model}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-slate-gray">
                              {bike.brand} {bike.model}
                            </h3>
                            <p className="text-sm text-slate-gray/60">
                              {bike.type} • {bike.color}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            bike.status === 'active'
                              ? 'bg-danger/20 text-danger'
                              : 'bg-success/20 text-success'
                          }`}>
                            {bike.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-gray mb-4">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-primary" />
                            {bike.location.city}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-primary" />
                            Stolen {formatDate(bike.dateStolen)}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link href={`/bikes/stolen/${bike.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                          {bike.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkResolved(bike.id, 'stolen')}
                              className="text-success border-success hover:bg-success hover:text-white"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Resolved
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteStolen(bike.id)}
                            className="text-danger border-danger hover:bg-danger hover:text-white"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Found Bikes Tab */}
        {activeTab === 'found' && (
          <div className="space-y-4">
            {foundBikes.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-slate-gray/50 mx-auto mb-4" />
                  <p className="text-slate-gray/60 mb-4">You haven't reported any found bikes</p>
                  <Link href="/report/found">
                    <Button>Report Found Bike</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              foundBikes.map((bike) => (
                <Card key={bike.id} className={bike.status === 'resolved' ? 'opacity-60' : ''}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-32 h-32 flex-shrink-0">
                        <img
                          src={bike.photos[0]}
                          alt="Found bike"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-slate-gray">
                              Found Bike
                            </h3>
                            <p className="text-sm text-slate-gray/60">
                              {bike.type} • {bike.color} • {bike.condition}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            bike.status === 'active'
                              ? 'bg-success/20 text-success'
                              : 'bg-slate-gray/20 text-slate-gray'
                          }`}>
                            {bike.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-gray mb-4">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-primary" />
                            {bike.location.city}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-primary" />
                            Found {formatDate(bike.dateFound)}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link href={`/bikes/found/${bike.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                          {bike.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkResolved(bike.id, 'found')}
                              className="text-success border-success hover:bg-success hover:text-white"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Resolved
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteFound(bike.id)}
                            className="text-danger border-danger hover:bg-danger hover:text-white"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <div className="space-y-4">
            {matches.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageCircle className="h-12 w-12 text-slate-gray/50 mx-auto mb-4" />
                  <p className="text-slate-gray/60">No matches yet</p>
                  <p className="text-sm text-slate-gray/40 mt-2">
                    Matches will appear here when found bikes match your stolen bike reports
                  </p>
                </CardContent>
              </Card>
            ) : (
              matches.map((match) => (
                <Card key={match.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-gray mb-1">
                          Potential Match Found
                        </h3>
                        <p className="text-sm text-slate-gray/60">
                          {Math.round(match.similarityScore * 100)}% similarity
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        match.status === 'pending'
                          ? 'bg-accent/20 text-accent'
                          : match.status === 'chatting'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-success/20 text-success'
                      }`}>
                        {match.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-gray mb-4">
                      Created {getTimeAgo(match.createdAt)}
                    </p>
                    <div className="flex space-x-2">
                      <Link href={`/bikes/stolen/${match.stolenBikeId}`}>
                        <Button variant="outline" size="sm">
                          View Stolen Bike
                        </Button>
                      </Link>
                      <Link href={`/bikes/found/${match.foundBikeId}`}>
                        <Button variant="outline" size="sm">
                          View Found Bike
                        </Button>
                      </Link>
                      {match.chatRoomId && (
                        <Button variant="default" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Open Chat
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
