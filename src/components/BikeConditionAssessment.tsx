'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ImageUploader } from '@/components/ImageUploader';
import { bikeConditionAssessment, BikeCondition } from '@/lib/bikeConditionAssessment';
import { Wrench, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';

interface BikeConditionAssessmentProps {
  onAssessmentComplete?: (condition: BikeCondition) => void;
  className?: string;
}

export function BikeConditionAssessment({ onAssessmentComplete, className }: BikeConditionAssessmentProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assessment, setAssessment] = useState<BikeCondition | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleImageUpload = (files: File[]) => {
    if (files.length > 0) {
      setUploadedImage(files[0]);
      setAssessment(null); // Reset previous assessment
    }
  };

  const handleAssessment = async () => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);
    try {
      const result = await bikeConditionAssessment.assessBikeCondition(uploadedImage);
      setAssessment(result);
      onAssessmentComplete?.(result);
    } catch (error) {
      console.error('Error assessing bike condition:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getConditionColor = (overall: string) => {
    switch (overall) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'fair': return 'text-accent';
      case 'poor': return 'text-danger';
      default: return 'text-slate-gray';
    }
  };

  const getConditionIcon = (overall: string) => {
    switch (overall) {
      case 'excellent': return <CheckCircle className="h-5 w-5 text-success" />;
      case 'good': return <CheckCircle className="h-5 w-5 text-primary" />;
      case 'fair': return <AlertTriangle className="h-5 w-5 text-accent" />;
      case 'poor': return <AlertTriangle className="h-5 w-5 text-danger" />;
      default: return <Wrench className="h-5 w-5 text-slate-gray" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wrench className="h-5 w-5 mr-2 text-primary" />
          AI Bike Condition Assessment
        </CardTitle>
        <CardDescription>
          Upload a photo of your bike to get an AI-powered condition assessment and estimated value
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!assessment ? (
          <>
            <div>
              <ImageUploader
                onImagesChange={handleImageUpload}
                maxImages={1}
                accept="image/*"
                className="w-full"
              />
            </div>
            
            {uploadedImage && (
              <div className="text-center">
                <Button 
                  onClick={handleAssessment}
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Analyzing Bike Condition...
                    </>
                  ) : (
                    <>
                      <Wrench className="h-4 w-4 mr-2" />
                      Assess Bike Condition
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            {/* Overall Assessment */}
            <div className="text-center p-4 bg-frost-gray rounded-lg">
              <div className="flex items-center justify-center mb-2">
                {getConditionIcon(assessment.overall)}
                <span className={`ml-2 text-xl font-bold ${getConditionColor(assessment.overall)}`}>
                  {assessment.overall.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-slate-gray">
                Confidence: {Math.round(assessment.confidence * 100)}%
              </p>
            </div>

            {/* Estimated Value */}
            <div className="flex items-center justify-center p-3 bg-accent/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-accent mr-2" />
              <span className="text-lg font-semibold text-accent">
                Estimated Value: ${assessment.estimatedValue}
              </span>
            </div>

            {/* Component Scores */}
            <div>
              <h4 className="font-semibold mb-3">Component Analysis</h4>
              <div className="space-y-2">
                {Object.entries(assessment.components).map(([component, score]) => (
                  <div key={component} className="flex items-center justify-between">
                    <span className="capitalize text-sm">{component}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-frost-gray rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            score >= 90 ? 'bg-success' : 
                            score >= 70 ? 'bg-primary' : 
                            'bg-danger'
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance Recommendations */}
            {assessment.maintenanceNeeded.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Maintenance Needed</h4>
                <ul className="space-y-1">
                  {assessment.maintenanceNeeded.map((item, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <AlertTriangle className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setAssessment(null)}
                className="flex-1"
              >
                Assess Another Bike
              </Button>
              <Button 
                onClick={() => {
                  const report = bikeConditionAssessment.generateConditionReport(assessment);
                  const blob = new Blob([report], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'bike-condition-report.txt';
                  a.click();
                }}
                className="flex-1"
              >
                Download Report
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

