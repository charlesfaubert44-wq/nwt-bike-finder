'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SafetyAlert, safetyAlertSystem } from '@/lib/safetyAlerts';
import { AlertTriangle, MapPin, Clock, User, Bell, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SafetyAlertsProps {
  userLocation?: { coordinates: [number, number]; radius: number };
  className?: string;
}

export function SafetyAlerts({ userLocation, className }: SafetyAlertsProps) {
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const activeAlerts = await safetyAlertSystem.getActiveAlerts(userLocation);
        setAlerts(activeAlerts);
      } catch (error) {
        console.error('Error fetching safety alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [userLocation]);

  const getAlertIcon = (type: SafetyAlert['type']) => {
    return safetyAlertSystem.getAlertIcon(type);
  };

  const getSeverityColor = (severity: SafetyAlert['severity']) => {
    return safetyAlertSystem.getSeverityColor(severity);
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

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-primary" />
                Community Safety Alerts
              </CardTitle>
              <CardDescription>
                Stay informed about bike safety in your area
              </CardDescription>
            </div>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              size="sm"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-1" />
              Report Alert
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-slate-gray/50 mx-auto mb-4" />
              <p className="text-slate-gray/60">No active safety alerts in your area</p>
              <p className="text-sm text-slate-gray/40 mt-2">
                Be the first to report a safety concern
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-danger">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getAlertIcon(alert.type)}</span>
                        <div>
                          <h4 className="font-semibold">{alert.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-slate-gray">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                              alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                              alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {alert.severity.toUpperCase()}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDistanceToNow(alert.reportedAt.toDate(), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-gray mb-3">{alert.description}</p>

                    <div className="flex items-center text-sm text-slate-gray mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{alert.location.address}</span>
                    </div>

                    <div className="flex items-center text-sm text-slate-gray mb-3">
                      <User className="h-4 w-4 mr-1" />
                      <span>Reported by community member</span>
                    </div>

                    {alert.recommendations.length > 0 && (
                      <div className="bg-frost-gray p-3 rounded-lg">
                        <h5 className="font-medium text-sm mb-2">Safety Recommendations:</h5>
                        <ul className="space-y-1">
                          {alert.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <AlertTriangle className="h-3 w-3 text-accent mr-2 mt-0.5 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showCreateForm && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Report Safety Alert</CardTitle>
            <CardDescription>
              Help keep the community safe by reporting safety concerns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-slate-gray/60 mb-4">
                Safety alert reporting form would be implemented here
              </p>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

