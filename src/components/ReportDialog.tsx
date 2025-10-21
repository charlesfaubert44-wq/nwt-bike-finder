'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { createReport } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { X, AlertTriangle } from 'lucide-react';
import { sanitizeReportReason } from '@/lib/sanitize';

interface ReportDialogProps {
  itemId: string;
  itemType: 'stolen' | 'found';
  isOpen: boolean;
  onClose: () => void;
}

export function ReportDialog({ itemId, itemType, isOpen, onClose }: ReportDialogProps) {
  const { user } = useAuth();
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !reason.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      const sanitizedReason = sanitizeReportReason(reason);

      if (!sanitizedReason) {
        setError('Please provide a valid reason for reporting.');
        setSubmitting(false);
        return;
      }

      await createReport({
        reportedItemId: itemId,
        reportedItemType: itemType,
        reporterId: user.uid,
        reason: sanitizedReason,
        status: 'pending'
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setReason('');
      }, 2000);
    } catch (err) {
      console.error('Error submitting report:', err);
      setError('Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      onClose();
      setReason('');
      setError('');
      setSuccess(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-danger" />
              Report Content
            </CardTitle>
            <button
              onClick={handleClose}
              className="text-slate-gray hover:text-danger transition-colors"
              disabled={submitting}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center py-8">
              <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-6 w-6 text-success" />
              </div>
              <p className="text-success font-medium mb-2">Report Submitted</p>
              <p className="text-sm text-slate-gray/60">
                Thank you for helping keep our community safe
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <p className="text-sm text-slate-gray mb-4">
                  Please describe why you're reporting this {itemType} bike listing.
                  Our moderation team will review your report.
                </p>

                <label className="block text-sm font-medium text-slate-gray mb-2">
                  Reason for Report
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="E.g., Inappropriate content, spam, false information..."
                  className="w-full px-3 py-2 border border-frost-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px]"
                  required
                  disabled={submitting}
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-danger/10 border border-danger/20 rounded-md">
                  <p className="text-sm text-danger">{error}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={submitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting || !reason.trim()}
                  className="flex-1 bg-danger hover:bg-danger/90"
                >
                  {submitting ? 'Submitting...' : 'Submit Report'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
