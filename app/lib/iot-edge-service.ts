import { IoTDataPlaneClient, PublishCommand } from '@aws-sdk/client-iot-data-plane';
import { createBedrockClient } from './aws-config';

export interface IoTSensorData {
  timestamp: string;
  temperature?: number;
  humidity?: number;
  lightLevel?: number;
  motionDetected?: boolean;
  deviceId: string;
}

export interface EdgeProcessingResult {
  emotionalState: 'happy' | 'sad' | 'excited' | 'calm' | 'stressed';
  confidence: number;
  recommendedAction: string;
}

export class IoTEdgeService {
  private iotClient: IoTDataPlaneClient | null = null;
  private readonly TOPIC_PREFIX = 'cuddlebear/';

  constructor() {
    if (typeof window !== 'undefined') {
      const bedrockClient = createBedrockClient();
      if (bedrockClient) {
        this.iotClient = new IoTDataPlaneClient({
          region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
          credentials: bedrockClient.config.credentials
        });
      }
    }
  }

  async publishSensorData(data: IoTSensorData): Promise<void> {
    if (!this.iotClient) {
      console.log('IoT client not available, skipping sensor data publish');
      return;
    }
    
    try {
      const command = new PublishCommand({
        topic: `${this.TOPIC_PREFIX}sensors/${data.deviceId}`,
        payload: new TextEncoder().encode(JSON.stringify(data)),
        qos: 1
      });

      await this.iotClient.send(command);
      console.log('Sensor data published to IoT Core:', data);
    } catch (error) {
      console.error('Failed to publish sensor data:', error);
    }
  }

  async processEdgeData(voiceData: string, sensorData?: IoTSensorData): Promise<EdgeProcessingResult> {
    const emotionalKeywords = {
      happy: ['great', 'good', 'excellent', 'wonderful', 'amazing', 'love', 'excited'],
      sad: ['sad', 'down', 'bad', 'terrible', 'awful', 'depressed', 'upset'],
      excited: ['excited', 'thrilled', 'amazing', 'awesome', 'fantastic', 'incredible'],
      calm: ['calm', 'peaceful', 'relaxed', 'quiet', 'serene', 'tranquil'],
      stressed: ['stressed', 'worried', 'anxious', 'overwhelmed', 'busy', 'tired']
    };

    const lowerCaseText = voiceData.toLowerCase();
    let detectedEmotion: EdgeProcessingResult['emotionalState'] = 'calm';
    let maxMatches = 0;

    for (const [emotion, keywords] of Object.entries(emotionalKeywords)) {
      const matches = keywords.filter(keyword => lowerCaseText.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedEmotion = emotion as EdgeProcessingResult['emotionalState'];
      }
    }

    let confidence = Math.min(0.9, 0.3 + (maxMatches * 0.2));

    if (sensorData?.temperature && sensorData.temperature > 25) {
      if (detectedEmotion === 'stressed') confidence += 0.1;
    }
    if (sensorData?.lightLevel && sensorData.lightLevel < 30) {
      if (detectedEmotion === 'sad' || detectedEmotion === 'calm') confidence += 0.1;
    }

    const recommendedActions = {
      happy: "That's wonderful! Let's celebrate this positive energy together! 🎉",
      sad: "I'm here for you. How about we talk about something that makes you smile? 🤗",
      excited: "I love your enthusiasm! Tell me more about what's got you so excited! ✨",
      calm: "It's nice to have peaceful moments. Would you like to share what's bringing you peace? 🌿",
      stressed: "Take a deep breath with me. Let's find ways to help you feel more relaxed. 🧘‍♀️"
    };

    const result: EdgeProcessingResult = {
      emotionalState: detectedEmotion,
      confidence: Math.min(confidence, 0.95),
      recommendedAction: recommendedActions[detectedEmotion]
    };

    await this.publishEmotionalData(result);
    return result;
  }

  private async publishEmotionalData(emotionalResult: EdgeProcessingResult): Promise<void> {
    if (!this.iotClient) {
      console.log('IoT client not available, skipping emotional data publish');
      return;
    }
    
    try {
      const command = new PublishCommand({
        topic: `${this.TOPIC_PREFIX}emotions/analysis`,
        payload: new TextEncoder().encode(JSON.stringify({
          ...emotionalResult,
          timestamp: new Date().toISOString(),
          deviceId: 'cuddlebear-web-client'
        })),
        qos: 1
      });

      await this.iotClient.send(command);
    } catch (error) {
      console.error('Failed to publish emotional data:', error);
    }
  }

  simulateSensorData(): IoTSensorData {
    return {
      timestamp: new Date().toISOString(),
      temperature: 20 + Math.random() * 10,
      humidity: 40 + Math.random() * 30,
      lightLevel: Math.random() * 100,
      motionDetected: Math.random() > 0.7,
      deviceId: 'cuddlebear-sensor-001'
    };
  }
}