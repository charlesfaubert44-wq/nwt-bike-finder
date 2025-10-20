'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getReports, updateReport, isUserAdmin } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Report } from '@/types';
import { Shield, AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default function AdminPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCheckLoading, setAdminCheckLoading] = useState(true);

  // Check if user has admin role
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isUserAdmin(user.uid);
        setIsAdmin(adminStatus);
      }
      setAdminCheckLoading(false);
    };
    checkAdminStatus();
  }, [user]);

  const fetchReports = async () => {
    try {
      const reportsData = await getReports();
      setReports(reportsData);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchReports();
    } else {
      setLoading(false);
    }
  }, [isAdmin]);

  const handleReviewReport = async (reportId: string, action: 'approve' | 'dismiss') => {
    try {
      await updateReport(reportId, {
        status: 'reviewed',
        resolution: action === 'approve' ? 'approved' : 'dismissed'
      });
      await fetchReports(); // Refresh the list
    } catch (err) {
      console.error('Error updating report:', err);
    }
  };

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

  if (adminCheckLoading || loading) {
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

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-danger">Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access the admin panel. Only users with admin or moderator roles can access this page.
            </CardDescription>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
                <CheckCircle className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold text-success">
                    {reports.filter(r => r.status === 'reviewed').length}
                  </p>
                  <p className="text-sm text-slate-gray">Reviewed Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-slate-gray">
                    {reports.length}
                  </p>
                  <p className="text-sm text-slate-gray">Total Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Content Reports</span>
              <Button variant="outline" size="sm" onClick={fetchReports}>
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
      </div>
    </div>
  );
}
