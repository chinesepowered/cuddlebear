# AWS Setup Guide for CuddleBear AI

## Prerequisites
- AWS Account with appropriate permissions
- Node.js 18+ installed
- pnpm package manager

## Step 1: AWS Bedrock Setup

### 1.1 Enable Bedrock Model Access
1. Open the AWS Console and navigate to **Amazon Bedrock**
2. Go to **Model access** in the left sidebar
3. Click **Modify model access**
4. Enable access to **Anthropic Claude 3 Haiku**
5. Click **Next** and **Submit**
6. Wait for approval (usually immediate for Claude models)

### 1.2 Verify Model Access
```bash
aws bedrock list-foundation-models --region us-east-1
```

## Step 2: Cognito Identity Pool Setup

### 2.1 Create Identity Pool
1. Navigate to **Amazon Cognito** in AWS Console
2. Click **Create identity pool**
3. Choose **Federated Identities**
4. Configuration:
   - **Identity pool name**: `cuddlebear-identity-pool`
   - **Enable unauthenticated identities**: ✅ Yes
   - **Authentication providers**: None (for demo)

### 2.2 Configure IAM Roles
The wizard will create two roles. Edit the **Unauthenticated role**:

1. Go to **IAM Console** → **Roles**
2. Find the unauthenticated role (e.g., `Cognito_cuddlebearUnauth_Role`)
3. Attach the following inline policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "bedrock:InvokeModel"
            ],
            "Resource": [
                "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-haiku-20240307-v1:0"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "iot:Publish",
                "iot:Subscribe",
                "iot:Connect",
                "iot:Receive"
            ],
            "Resource": [
                "arn:aws:iot:us-east-1:*:topic/cuddlebear/*",
                "arn:aws:iot:us-east-1:*:client/cuddlebear-*"
            ]
        }
    ]
}
```

### 2.3 Note Identity Pool ID
Copy the Identity Pool ID from the Cognito console (format: `us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

## Step 3: IoT Core Setup (Optional)

### 3.1 Create IoT Policy
1. Navigate to **AWS IoT Core**
2. Go to **Secure** → **Policies**
3. Create policy named `CuddleBearPolicy`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iot:Publish",
        "iot:Subscribe",
        "iot:Connect",
        "iot:Receive"
      ],
      "Resource": [
        "arn:aws:iot:us-east-1:*:topic/cuddlebear/*",
        "arn:aws:iot:us-east-1:*:client/cuddlebear-*",
        "arn:aws:iot:us-east-1:*:topicfilter/cuddlebear/*"
      ]
    }
  ]
}
```

### 3.2 Get IoT Endpoint
```bash
aws iot describe-endpoint --endpoint-type iot:Data-ATS --region us-east-1
```

## Step 4: Environment Configuration

### 4.1 Create Environment File
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 4.2 Update Environment Variables
```bash
# AWS Configuration
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID=us-east-1:your-pool-id-here

# Optional: For enhanced IoT functionality
NEXT_PUBLIC_IOT_ENDPOINT=your-iot-endpoint.amazonaws.com
```

## Step 5: Test the Setup

### 5.1 Install Dependencies
```bash
pnpm install
```

### 5.2 Run Development Server
```bash
pnpm dev
```

### 5.3 Test Voice Interaction
1. Open browser to http://localhost:3000
2. Click the microphone button
3. Grant microphone permissions when prompted
4. Speak to the CuddleBear
5. Verify AI responses are working

## Step 6: Production Deployment

### 6.1 Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### 6.2 Configure Environment Variables in Vercel
1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add your AWS configuration variables

## Troubleshooting

### Common Issues

#### 1. "Access Denied" Error
- Verify Bedrock model access is enabled
- Check IAM role permissions
- Ensure Cognito Identity Pool allows unauthenticated access

#### 2. "Identity Pool Not Found"
- Double-check the Identity Pool ID in environment variables
- Ensure the pool exists in the correct AWS region

#### 3. Voice Recognition Not Working
- Grant microphone permissions in browser
- Use HTTPS in production (required for Web Speech API)
- Test in Chrome/Edge (best speech recognition support)

#### 4. No AI Responses
- Check browser console for errors
- Verify network connectivity
- Test AWS credentials with AWS CLI

### Testing Commands

#### Test Bedrock Access
```bash
aws bedrock-runtime invoke-model \
  --model-id anthropic.claude-3-haiku-20240307-v1:0 \
  --content-type application/json \
  --accept application/json \
  --body '{"anthropic_version": "bedrock-2023-05-31", "max_tokens": 100, "messages": [{"role": "user", "content": "Hello!"}]}' \
  response.json && cat response.json
```

#### Test IoT Core
```bash
aws iot publish \
  --topic cuddlebear/test \
  --message '{"test": "message"}' \
  --region us-east-1
```

## Security Considerations

### Production Recommendations
1. **Use Authenticated Identities**: Replace unauthenticated access with proper user authentication
2. **Restrict Permissions**: Limit IAM permissions to minimum required
3. **Enable CloudTrail**: Monitor API usage
4. **Use VPC Endpoints**: For enhanced security
5. **Implement Rate Limiting**: Prevent abuse

### Cost Optimization
1. **Monitor Usage**: Set up billing alerts
2. **Use Appropriate Models**: Claude Haiku for cost-effectiveness
3. **Implement Caching**: Reduce redundant API calls
4. **Set Token Limits**: Control response length

## Support

For issues with this setup:
1. Check the troubleshooting section above
2. Review AWS documentation for specific services
3. Check the project's GitHub issues
4. Contact AWS support for service-specific problems

Remember to keep your AWS credentials secure and never commit them to version control!