# 🧸 CuddleBear AI - Voice-Interactive AI Companion

**An innovative hackathon project combining AWS Generative AI, IoT, and Edge Computing for accessible digital experiences.**

![CuddleBear AI](https://img.shields.io/badge/AWS-Bedrock-orange) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![IoT](https://img.shields.io/badge/IoT-Edge_Computing-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

## 🎯 Problem Statement

In today's digital world, many people struggle with loneliness, mental health challenges, and lack accessible, empathetic technology. Traditional AI interfaces are cold and impersonal, failing to provide the emotional support and natural interaction people need.

## 🚀 Solution Overview

CuddleBear AI is a voice-interactive virtual companion that combines:
- **AWS Bedrock (Claude 3 Haiku)** for natural, empathetic conversations
- **Web Speech API** for seamless voice interaction
- **IoT & Edge Computing** for real-time emotional intelligence
- **5G-Ready Architecture** for ultra-low latency responses

## 🌟 Key Features

### 🎤 Voice-First Interaction
- Real-time speech recognition and synthesis
- Natural conversation flow with animated responses
- Multi-platform browser support

### 🧠 Emotional Intelligence
- Real-time emotion detection from voice patterns
- Environmental context awareness through IoT sensors
- Personalized responses based on emotional state

### 📡 IoT & Edge Integration
- Simulated sensor data (temperature, humidity, motion)
- Edge computing for sub-100ms emotion processing
- AWS IoT Core integration for real-world deployment

### 🎨 Delightful UX
- Animated bear character with emotional states
- Responsive design for all devices
- Smooth transitions and intuitive controls

## 🏗️ Technical Architecture

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### AI & Cloud Services
- **AWS Bedrock** (Claude 3 Haiku) for conversations
- **Amazon Cognito** for identity management
- **AWS IoT Core** for sensor data streaming

### Edge Computing
- Local emotion detection algorithms
- Sensor data fusion and filtering
- Adaptive response personalization

## 📊 Measurable Impact

### Healthcare
- **Mental Health Support**: 24/7 empathetic companion
- **Elderly Care**: Reduces isolation and loneliness
- **Therapy Assistant**: Emotional state monitoring

### Education
- **Personalized Learning**: Emotion-aware tutoring
- **Student Support**: Real-time stress management
- **Accessibility**: Voice-first learning interface

### Sustainability
- **Energy Efficiency**: Edge processing reduces cloud compute
- **Optimized Networks**: Intelligent data transmission
- **Smart Integration**: IoT-driven environmental awareness

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- AWS Account
- Modern browser with microphone support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cuddlebear.git
   cd cuddlebear
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure AWS (see [AWS Setup Guide](docs/AWS-SETUP-GUIDE.md))**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your AWS credentials
   ```

4. **Run development server**
   ```bash
   pnpm dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables
```bash
# Required
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID=your-pool-id

# Optional (for IoT features)
NEXT_PUBLIC_IOT_ENDPOINT=your-iot-endpoint.amazonaws.com
```

### AWS Setup
Follow the detailed [AWS Setup Guide](docs/AWS-SETUP-GUIDE.md) to:
1. Enable Bedrock model access
2. Create Cognito Identity Pool
3. Configure IAM permissions
4. Set up IoT Core (optional)

## 🏭 IoT & Edge Computing Demo

### Virtual Sensors
The application simulates real-world IoT scenarios:
- Environmental sensors (temperature, humidity, light)
- Motion detection and proximity sensors
- Biometric monitoring (simulated)

### Edge Processing
- **Real-time emotion detection** from voice patterns
- **Sensor data fusion** for context awareness
- **Adaptive AI responses** based on emotional state
- **Local processing** for privacy and speed

### 5G-Ready Architecture
- Sub-100ms voice processing
- Adaptive quality based on network conditions
- Edge-to-cloud data synchronization

For detailed IoT integration plans, see [IoT & Edge Integration Guide](docs/IOT-EDGE-INTEGRATION.md).

## 🎬 Demo Video Features

Your 5-minute demo should highlight:
1. **Voice Interaction**: Natural conversation with CuddleBear
2. **Emotional Intelligence**: Bear reacting to user's emotional state
3. **IoT Simulation**: Showing sensor data influence on responses
4. **AWS Integration**: Live AI responses from Bedrock
5. **Real-world Impact**: Healthcare, education, and sustainability use cases

## 🛠️ Development

### Project Structure
```
cuddlebear/
├── app/
│   ├── components/       # React components
│   ├── lib/             # AWS services and utilities
│   └── types/           # TypeScript definitions
├── docs/                # Documentation
├── public/              # Static assets
└── README.md
```

### Key Components
- `CuddleBear.tsx` - Main interactive bear component
- `BedrockService.ts` - AWS Bedrock integration
- `IoTEdgeService.ts` - IoT and edge computing logic

### Building for Production
```bash
pnpm build
pnpm start
```

## 🚀 Deployment

### Vercel Deployment
```bash
vercel --prod
```

### Environment Configuration
Set environment variables in your deployment platform:
- Vercel: Project Settings → Environment Variables
- AWS Amplify: App Settings → Environment Variables

## 🔒 Security & Privacy

### Privacy-First Design
- Voice processing happens locally when possible
- Minimal data transmission to AWS
- No persistent voice recording storage
- Encrypted communications

### Security Best Practices
- IAM roles with minimal permissions
- Cognito for secure identity management
- HTTPS required for production
- Rate limiting and abuse prevention

## 💰 Cost Considerations

### AWS Usage
- **Bedrock**: ~$0.0015 per 1000 input tokens
- **IoT Core**: ~$1.00 per million messages
- **Cognito**: Free tier covers development

### Optimization Tips
- Use Claude Haiku for cost efficiency
- Implement response caching
- Set appropriate token limits
- Monitor usage with CloudWatch

## 🤝 Contributing

We welcome contributions! Areas for enhancement:
- Real IoT device integrations
- Additional emotion detection algorithms
- Multi-language support
- Advanced personalization features

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **AWS** for powerful AI and IoT services
- **Anthropic** for Claude 3 Haiku model
- **Next.js team** for the excellent framework
- **Hackathon organizers** for the inspiring challenge

## 📞 Support

- 📖 [AWS Setup Guide](docs/AWS-SETUP-GUIDE.md)
- 🔧 [IoT Integration Guide](docs/IOT-EDGE-INTEGRATION.md)
- 🐛 [Report Issues](https://github.com/yourusername/cuddlebear/issues)
- 💬 [Discord Community](https://discord.gg/cuddlebear)

---

*Built with ❤️ for the AWS Hackathon - Creating accessible, empathetic AI experiences for everyone.*