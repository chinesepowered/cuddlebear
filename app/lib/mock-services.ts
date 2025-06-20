// Mock services for demo without AWS setup

export interface MockConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class MockBedrockService {
  private conversationHistory: MockConversationMessage[] = [];
  private isDemo = true;

  async sendMessage(userMessage: string): Promise<string> {
    this.conversationHistory.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    });

    console.log('🤖 AWS Bedrock: Invoking Claude 3 Haiku model...');
    console.log('📤 Request payload: anthropic.claude-3-haiku-20240307-v1:0');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    const response = this.generateMockResponse(userMessage);
    
    console.log('📥 AWS Bedrock: Response received from Claude - tokens used:', Math.floor(50 + Math.random() * 150));
    
    this.conversationHistory.push({
      role: 'assistant',
      content: response,
      timestamp: new Date()
    });

    return response;
  }

  private generateMockResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    // Emotion-based responses
    if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed')) {
      return "I can hear that you're going through a tough time right now. Remember that it's okay to feel sad sometimes - you're not alone in this. Would you like to talk about what's making you feel this way? I'm here to listen. 🤗";
    }

    if (lowerMessage.includes('happy') || lowerMessage.includes('excited') || lowerMessage.includes('great') || lowerMessage.includes('amazing')) {
      return "Your happiness is absolutely contagious! I love hearing the joy in your voice. It sounds like something wonderful is happening in your life. Tell me more about what's making you feel so fantastic! ✨";
    }

    if (lowerMessage.includes('stressed') || lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('overwhelmed')) {
      return "I can sense the stress in your voice, and I want you to know that what you're feeling is completely valid. Let's take a deep breath together. Sometimes it helps to talk through what's weighing on your mind. What's causing you the most stress right now? 🧘‍♀️";
    }

    if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('sleepy')) {
      return "It sounds like you need some rest, dear friend. Being tired can make everything feel more difficult. Have you been getting enough sleep lately? Maybe we can chat about some cozy activities that might help you relax? 😴";
    }

    if (lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('office')) {
      return "Work can definitely be challenging sometimes! It's important to find that balance between being productive and taking care of yourself. How are things going at work? Remember, you're doing better than you think! 💪";
    }

    if (lowerMessage.includes('love') || lowerMessage.includes('relationship') || lowerMessage.includes('partner')) {
      return "Love is such a beautiful thing! Whether it's romantic love, family love, or friendship - these connections make life so much richer. It warms my fuzzy heart to hear you talk about the people who matter to you! 💕";
    }

    if (lowerMessage.includes('family') || lowerMessage.includes('parents') || lowerMessage.includes('kids') || lowerMessage.includes('children')) {
      return "Family relationships can be both wonderful and complicated! They shape us in so many ways. I hope you're surrounded by love and support from the people who matter most to you. Tell me more about your family! 👨‍👩‍👧‍👦";
    }

    if (lowerMessage.includes('health') || lowerMessage.includes('sick') || lowerMessage.includes('doctor')) {
      return "Taking care of your health is so important, and I'm proud of you for paying attention to how you're feeling. Remember that both physical and mental health matter equally. I hope you're feeling better soon! 🏥";
    }

    if (lowerMessage.includes('food') || lowerMessage.includes('eating') || lowerMessage.includes('hungry')) {
      return "Food is one of life's simple pleasures! I hope you're nourishing yourself with things that make you feel good. What's your favorite comfort food? I imagine it would be something warm and cozy! 🍯";
    }

    if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('sunny') || lowerMessage.includes('cold')) {
      return "The weather can really affect our mood, can't it? Whether it's a sunny day that lifts your spirits or a cozy rainy day perfect for snuggling inside, I hope you're finding ways to enjoy whatever nature brings! ☀️";
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello there, wonderful human! It's so lovely to meet you! I'm CuddleBear, and I'm here to chat, listen, and hopefully bring a little comfort to your day. How are you feeling right now? 🧸";
    }

    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
      return "Aww, it was so wonderful chatting with you! Remember that you're amazing just as you are, and I'll be here whenever you need a friendly conversation. Take care of yourself, and I hope to see you again soon! 🤗";
    }

    // Default responses
    const defaultResponses = [
      "That's really interesting! I love learning about your experiences. Tell me more about how that makes you feel! 🌟",
      "Thank you for sharing that with me. Your thoughts and feelings matter so much. What's been on your mind lately? 💭",
      "I'm here to listen and support you in whatever way I can. You seem like such a thoughtful person! 🤍",
      "It sounds like you have a lot going on! Remember to be gentle with yourself. What would help you feel more comfortable right now? 🌸",
      "I appreciate you opening up to me. Conversations like this remind me how wonderful it is to connect with someone. What brings you joy? ✨",
      "You know what? I think you're pretty amazing for taking the time to chat with me today. How can I be most helpful to you? 🌈"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  getConversationHistory(): MockConversationMessage[] {
    return [...this.conversationHistory];
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }

  isDemoMode(): boolean {
    return this.isDemo;
  }
}

export interface MockIoTSensorData {
  timestamp: string;
  temperature?: number;
  humidity?: number;
  lightLevel?: number;
  motionDetected?: boolean;
  deviceId: string;
}

export interface MockEdgeProcessingResult {
  emotionalState: 'happy' | 'sad' | 'excited' | 'calm' | 'stressed';
  confidence: number;
  recommendedAction: string;
}

export class MockIoTEdgeService {
  private isDemo = true;

  async publishSensorData(data: MockIoTSensorData): Promise<void> {
    console.log('📡 AWS IoT Core: Publishing sensor data to topic cuddlebear/sensors/' + data.deviceId, data);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('✅ AWS IoT Core: Message published successfully');
  }

  async processEdgeData(voiceData: string, sensorData?: MockIoTSensorData): Promise<MockEdgeProcessingResult> {
    console.log('🔄 Edge Computing: Processing voice data and sensor fusion...');
    
    const emotionalKeywords = {
      happy: ['great', 'good', 'excellent', 'wonderful', 'amazing', 'love', 'excited', 'fantastic', 'awesome'],
      sad: ['sad', 'down', 'bad', 'terrible', 'awful', 'depressed', 'upset', 'lonely'],
      excited: ['excited', 'thrilled', 'amazing', 'awesome', 'fantastic', 'incredible', 'pumped'],
      calm: ['calm', 'peaceful', 'relaxed', 'quiet', 'serene', 'tranquil', 'content'],
      stressed: ['stressed', 'worried', 'anxious', 'overwhelmed', 'busy', 'tired', 'pressure']
    };

    const lowerCaseText = voiceData.toLowerCase();
    let detectedEmotion: MockEdgeProcessingResult['emotionalState'] = 'calm';
    let maxMatches = 0;

    for (const [emotion, keywords] of Object.entries(emotionalKeywords)) {
      const matches = keywords.filter(keyword => lowerCaseText.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedEmotion = emotion as MockEdgeProcessingResult['emotionalState'];
      }
    }

    // Add some randomness to make it feel more realistic
    let confidence = Math.min(0.9, 0.4 + (maxMatches * 0.15) + (Math.random() * 0.2));

    // Simulate sensor data influence
    if (sensorData?.temperature && sensorData.temperature > 25) {
      if (detectedEmotion === 'stressed') confidence += 0.1;
    }
    if (sensorData?.lightLevel && sensorData.lightLevel < 30) {
      if (detectedEmotion === 'sad' || detectedEmotion === 'calm') confidence += 0.1;
    }

    const recommendedActions = {
      happy: "Your positive energy is wonderful! Let's celebrate this feeling together! 🎉",
      sad: "I'm here for you. Sometimes talking about what's bothering us can help. 🤗",
      excited: "I can feel your excitement! Tell me more about what's got you so energized! ✨",
      calm: "I love this peaceful energy. What's bringing you such tranquility today? 🌿",
      stressed: "Let's take a moment to breathe together. You're handling more than you know. 🧘‍♀️"
    };

    const result: MockEdgeProcessingResult = {
      emotionalState: detectedEmotion,
      confidence: Math.min(confidence, 0.95),
      recommendedAction: recommendedActions[detectedEmotion]
    };

    console.log('🧠 Edge AI: Emotion analysis complete - State:', result.emotionalState, 'Confidence:', Math.round(result.confidence * 100) + '%');
    await this.publishEmotionalData(result);
    return result;
  }

  private async publishEmotionalData(emotionalResult: MockEdgeProcessingResult): Promise<void> {
    console.log('📊 AWS IoT Core: Publishing emotional analysis to topic cuddlebear/emotions/analysis');
    console.log('📈 Emotional State Analytics:', {
      state: emotionalResult.emotionalState,
      confidence: Math.round(emotionalResult.confidence * 100) + '%',
      timestamp: new Date().toISOString(),
      deviceId: 'cuddlebear-web-client'
    });
  }

  simulateSensorData(): MockIoTSensorData {
    const data = {
      timestamp: new Date().toISOString(),
      temperature: Math.round((20 + Math.random() * 10) * 10) / 10,
      humidity: Math.round((40 + Math.random() * 30) * 10) / 10,
      lightLevel: Math.round(Math.random() * 100),
      motionDetected: Math.random() > 0.7,
      deviceId: 'cuddlebear-sensor-demo-001'
    };
    
    console.log('🌡️ IoT Sensors: Environmental data collected -', 
      `Temp: ${data.temperature}°C, Humidity: ${data.humidity}%, Light: ${data.lightLevel}%`);
    return data;
  }

  isDemoMode(): boolean {
    return this.isDemo;
  }
}