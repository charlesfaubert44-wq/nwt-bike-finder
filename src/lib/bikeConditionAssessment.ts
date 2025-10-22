'use client';

import * as tf from '@tensorflow/tfjs';

interface BikeCondition {
  overall: 'excellent' | 'good' | 'fair' | 'poor';
  components: {
    frame: number; // 0-100 score
    wheels: number;
    brakes: number;
    drivetrain: number;
    accessories: number;
  };
  estimatedValue: number;
  maintenanceNeeded: string[];
  confidence: number;
}

export class BikeConditionAssessment {
  private model: tf.LayersModel | null = null;

  async loadModel() {
    try {
      // In production, this would load a pre-trained model
      // For now, we'll create a mock assessment
      console.log('Bike condition assessment model loaded');
    } catch (error) {
      console.error('Error loading bike condition model:', error);
    }
  }

  async assessBikeCondition(imageFile: File): Promise<BikeCondition> {
    // Mock implementation - in production this would use actual ML model
    const mockAssessment: BikeCondition = {
      overall: 'good',
      components: {
        frame: 85,
        wheels: 78,
        brakes: 92,
        drivetrain: 80,
        accessories: 70
      },
      estimatedValue: this.calculateEstimatedValue(),
      maintenanceNeeded: this.getMaintenanceRecommendations(),
      confidence: 0.87
    };

    return mockAssessment;
  }

  private calculateEstimatedValue(): number {
    // Mock calculation based on bike condition
    const baseValue = 800; // Base value for a good bike
    const conditionMultiplier = 0.85; // Based on overall condition
    return Math.round(baseValue * conditionMultiplier);
  }

  private getMaintenanceRecommendations(): string[] {
    return [
      'Check tire pressure and tread wear',
      'Lubricate chain and derailleurs',
      'Inspect brake pads for wear',
      'Tighten loose bolts and screws'
    ];
  }

  generateConditionReport(condition: BikeCondition): string {
    const { overall, components, estimatedValue, maintenanceNeeded } = condition;
    
    let report = `## Bike Condition Assessment\n\n`;
    report += `**Overall Condition:** ${overall.toUpperCase()}\n`;
    report += `**Estimated Value:** $${estimatedValue}\n\n`;
    
    report += `### Component Scores:\n`;
    Object.entries(components).forEach(([component, score]) => {
      const status = score >= 90 ? '🟢' : score >= 70 ? '🟡' : '🔴';
      report += `- ${component.charAt(0).toUpperCase() + component.slice(1)}: ${score}/100 ${status}\n`;
    });
    
    if (maintenanceNeeded.length > 0) {
      report += `\n### Maintenance Recommendations:\n`;
      maintenanceNeeded.forEach(item => {
        report += `- ${item}\n`;
      });
    }
    
    return report;
  }
}

export const bikeConditionAssessment = new BikeConditionAssessment();

