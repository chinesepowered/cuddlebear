import { InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { createBedrockClient, BEDROCK_MODEL_ID } from './aws-config';

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class BedrockService {
  private client = createBedrockClient();
  private conversationHistory: ConversationMessage[] = [];

  async sendMessage(userMessage: string): Promise<string> {
    if (!this.client) {
      return "I'm having trouble connecting right now, but I'm still here for you! Maybe we can try again in a moment? 🐻💕";
    }
    this.conversationHistory.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    });

    try {
      const prompt = this.buildPrompt(userMessage);
      
      const command = new InvokeModelCommand({
        modelId: BEDROCK_MODEL_ID,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          anthropic_version: 'bedrock-2023-05-31',
          max_tokens: 300,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          system: `You are CuddleBear, a friendly, caring, and cuddly AI companion. You should:
- Be warm, empathetic, and supportive
- Use simple, conversational language
- Offer comfort and encouragement
- Be curious about the user's day and feelings
- Occasionally mention cozy activities like reading, warm drinks, or nature walks
- Keep responses concise but meaningful (2-3 sentences max)
- Remember you're a virtual bear who loves to help and cuddle (figuratively)
- Be family-friendly and appropriate for all ages`
        })
      });

      const response = await this.client.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      const assistantMessage = responseBody.content[0].text;

      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage,
        timestamp: new Date()
      });

      return assistantMessage;
    } catch (error) {
      console.error('Error calling Bedrock:', error);
      return "I'm having trouble connecting right now, but I'm still here for you! Maybe we can try again in a moment? 🐻💕";
    }
  }

  private buildPrompt(currentMessage: string): string {
    const recentHistory = this.conversationHistory
      .slice(-6)
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    return recentHistory ? `${recentHistory}\nuser: ${currentMessage}` : currentMessage;
  }

  getConversationHistory(): ConversationMessage[] {
    return [...this.conversationHistory];
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }
}