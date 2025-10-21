'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getReports, updateReport, getStolenBikes, getFoundBikes, deleteStolenBike, deleteFoundBike, updateStolenBike, updateFoundBike } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Report, StolenBike, FoundBike } from '@/types';
import { Shield, AlertTriangle, CheckCircle, XCircle, RefreshCw, Users, Bike, Trash2, Eye } from 'lucide-react';
import { formatDateTime, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function AdminPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [stolenBikes, setStolenBikes] = useState<StolenBike[]>([]);
  const [foundBikes, setFoundBikes] = useState<FoundBike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'reports' | 'stolen' | 'found'>('reports');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [reportsData, stolenData, foundData] = await Promise.all([
        getReports(),
        getStolenBikes(),
        getFoundBikes()
      ]);
      setReports(reportsData);
      setStolenBikes(stolenData);
      setFoundBikes(foundData);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReviewReport = async (reportId: string, action: 'approve' | 'dismiss') => {
    try {
      await updateReport(reportId, {
        status: 'reviewed',
        resolution: action === 'approve' ? 'approved' : 'dismissed',
        reviewedAt: new Date().toISOString(),
        reviewedBy: user?.uid
      });
      await fetchData();
    } catch (err) {
      console.error('Error updating report:', err);
    }
  };

  const handleRemoveBike = async (bikeId: string, type: 'stolen' | 'found') => {
    if (!confirm(`Are you sure you want to remove this ${type} bike? This action cannot be undone.`)) {
      return;
    }

    try {
      if (type === 'stolen') {
        await updateStolenBike(bikeId, { status: 'removed' });
      } else {
        await updateFoundBike(bikeId, { status: 'removed' });
      }
      await fetchData();
    } catch (err) {
      console.error('Error removing bike:', err);
      alert('Failed to remove bike');
    }
  };

  const handleDeleteBike = async (bikeId: string, type: 'stolen' | 'found') => {
    if (!confirm(`Are you sure you want to permanently delete this ${type} bike? This action cannot be undone.`)) {
      return;
    }

    try {
      if (type === 'stolen') {
        await deleteStolenBike(bikeId);
      } else {
        await deleteFoundBike(bikeId);
      }
      await fetchData();
    } catch (err) {
      console.error('Error deleting bike:', err);
      alert('Failed to delete bike');
    }
  };

  // Simple admin check - in production, you'd have proper role-based access
  const isAdmin = user?.email?.includes('admin') || user?.email?.includes('moderator');

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please sign in to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.href = '/auth/login'}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-danger">Access Denied</CardTitle>
            <CardDescription>You don't have permission to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.href = '/'}>
              Back to Home
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
            <p className="text-slate-gray">Loading admin panel...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-gray mb-2">Admin Panel</h1>
          <p className="text-slate-gray/80">
            Manage reports and moderate content for YK Bike Finder
          </p>
        </div>

        {error && (
          <Card className="mb-6 border-danger/20 bg-danger/10">
            <CardContent className="pt-6">
              <p className="text-danger">{error}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-8 w-8 text-danger" />
                <div>
                  <p className="text-2xl font-bold text-danger">
                    {reports.filter(r => r.status === 'pending').length}
                  </p>
                  <p className="text-sm text-slate-gray">Pending Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-danger" />
                <div>
                  <p className="text-2xl font-bold text-slate-gray">
                    {stolenBikes.filter(b => b.status === 'active').length}
                  </p>
                  <p className="text-sm text-slate-gray">Active Stolen</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold text-slate-gray">
                    {foundBikes.filter(b => b.status === 'active').length}
                  </p>
                  <p className="text-sm text-slate-gray">Active Found</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Bike className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-slate-gray">
                    {stolenBikes.length + foundBikes.length}
                  </p>
                  <p className="text-sm text-slate-gray">Total Bikes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex space-x-2">
          <Button
            variant={activeTab === 'reports' ? 'default' : 'outline'}
            onClick={() => setActiveTab('reports')}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Reports ({reports.filter(r => r.status === 'pending').length})
          </Button>
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
        </div>

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Content Reports</span>
                <Button variant="outline" size="sm" onClick={fetchData}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </CardTitle>
              <CardDescription>
                Review and moderate reported content
              </CardDescription>
            </CardHeader>
            <CardContent>
            {reports.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="h-12 w-12 text-slate-gray/50 mx-auto mb-4" />
                <p className="text-slate-gray/60">No reports to review</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((report) => (
                  <Card key={report.id} className="border-l-4 border-l-danger">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-medium text-slate-gray">
                              Report #{report.id.slice(-8)}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              report.status === 'pending' 
                                ? 'bg-danger/20 text-danger' 
                                : 'bg-success/20 text-success'
                            }`}>
                              {report.status}
                            </span>
                          </div>
                          
                          <p className="text-sm text-slate-gray mb-2">
                            <strong>Type:</strong> {report.reportedItemType} bike
                          </p>
                          
                          <p className="text-sm text-slate-gray mb-2">
                            <strong>Reason:</strong> {report.reason}
                          </p>
                          
                          <p className="text-xs text-slate-gray/60">
                            Reported {formatDateTime(report.createdAt)}
                          </p>
                        </div>
                        
                        {report.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReviewReport(report.id, 'approve')}
                              className="text-success border-success hover:bg-success hover:text-white"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReviewReport(report.id, 'dismiss')}
                              className="text-danger border-danger hover:bg-danger hover:text-white"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Dismiss
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            </CardContent>
          </Card>
        )}

        {/* Stolen Bikes Tab */}
        {activeTab === 'stolen' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Stolen Bikes</span>
                <Button variant="outline" size="sm" onClick={fetchData}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </CardTitle>
              <CardDescription>
                Manage stolen bike reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stolenBikes.length === 0 ? (
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 text-slate-gray/50 mx-auto mb-4" />
                  <p className="text-slate-gray/60">No stolen bikes reported</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stolenBikes.map((bike) => (
                    <Card key={bike.id} className="border-l-4 border-l-danger">
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 flex-shrink-0">
                            <img
                              src={bike.photos[0]}
                              alt={`${bike.brand} ${bike.model}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-bold text-slate-gray">
                                  {bike.brand} {bike.model}
                                </h3>
                                <p className="text-sm text-slate-gray/60">
                                  {bike.type} • {bike.color} • {bike.location.city}
                                </p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                bike.status === 'active'
                                  ? 'bg-danger/20 text-danger'
                                  : bike.status === 'resolved'
                                  ? 'bg-success/20 text-success'
                                  : 'bg-slate-gray/20 text-slate-gray'
                              }`}>
                                {bike.status}
                              </span>
                            </div>
                            <p className="text-sm text-slate-gray mb-3">
                              Stolen {formatDate(bike.dateStolen)} • Reported {formatDateTime(bike.createdAt)}
                            </p>
                            <div className="flex space-x-2">
                              <Link href={`/bikes/stolen/${bike.id}`}>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </Link>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRemoveBike(bike.id, 'stolen')}
                                className="text-accent border-accent hover:bg-accent hover:text-white"
                              >
                                Hide
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteBike(bike.id, 'stolen')}
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
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Found Bikes Tab */}
        {activeTab === 'found' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Found Bikes</span>
                <Button variant="outline" size="sm" onClick={fetchData}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </CardTitle>
              <CardDescription>
                Manage found bike reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              {foundBikes.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-slate-gray/50 mx-auto mb-4" />
                  <p className="text-slate-gray/60">No found bikes reported</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {foundBikes.map((bike) => (
                    <Card key={bike.id} className="border-l-4 border-l-success">
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 flex-shrink-0">
                            <img
                              src={bike.photos[0]}
                              alt="Found bike"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-bold text-slate-gray">
                                  Found Bike
                                </h3>
                                <p className="text-sm text-slate-gray/60">
                                  {bike.type} • {bike.color} • {bike.condition} • {bike.location.city}
                                </p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                bike.status === 'active'
                                  ? 'bg-success/20 text-success'
                                  : bike.status === 'resolved'
                                  ? 'bg-primary/20 text-primary'
                                  : 'bg-slate-gray/20 text-slate-gray'
                              }`}>
                                {bike.status}
                              </span>
                            </div>
                            <p className="text-sm text-slate-gray mb-3">
                              Found {formatDate(bike.dateFound)} • Reported {formatDateTime(bike.createdAt)}
                            </p>
                            <div className="flex space-x-2">
                              <Link href={`/bikes/found/${bike.id}`}>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </Link>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRemoveBike(bike.id, 'found')}
                                className="text-accent border-accent hover:bg-accent hover:text-white"
                              >
                                Hide
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteBike(bike.id, 'found')}
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
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
