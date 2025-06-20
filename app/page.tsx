'use client';

import { useState, useCallback } from 'react';
import CuddleBear from './components/CuddleBear';
import { BedrockService } from './lib/bedrock-service';
import { IoTEdgeService } from './lib/iot-edge-service';

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [bearResponse, setBearResponse] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const bedrockService = new BedrockService();
  const iotEdgeService = new IoTEdgeService();

  const handleSpeechResult = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;

    setIsProcessing(true);
    setBearResponse('');

    try {
      const sensorData = iotEdgeService.simulateSensorData();
      
      const [aiResponse, emotionalAnalysis] = await Promise.all([
        bedrockService.sendMessage(userInput),
        iotEdgeService.processEdgeData(userInput, sensorData)
      ]);

      let enhancedResponse = aiResponse;
      if (emotionalAnalysis.confidence > 0.6) {
        enhancedResponse = `${emotionalAnalysis.recommendedAction} ${aiResponse}`;
      }

      setBearResponse(enhancedResponse);
    } catch (error) {
      console.error('Error processing speech:', error);
      setBearResponse("I'm having some trouble right now, but I'm still here to listen! 💝");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleMicToggle = useCallback((listening: boolean) => {
    setIsListening(listening);
    if (listening) {
      setBearResponse('');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <CuddleBear
        onSpeechResult={handleSpeechResult}
        onMicToggle={handleMicToggle}
        isProcessing={isProcessing}
        bearResponse={bearResponse}
      />
      
      <div className="fixed bottom-4 left-4 text-xs text-gray-500 max-w-xs hidden sm:block">
        <p>🔊 Voice recognition active</p>
        <p>🤖 AWS Bedrock AI powered</p>
        <p>📡 IoT edge processing enabled</p>
      </div>
    </div>
  );
}
