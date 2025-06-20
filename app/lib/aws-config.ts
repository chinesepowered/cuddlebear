import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';

export const AWS_REGION = process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1';
export const COGNITO_IDENTITY_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID || '';

export const createBedrockClient = () => {
  if (typeof window === 'undefined') {
    // Return a mock client during SSR
    return null;
  }
  
  if (!COGNITO_IDENTITY_POOL_ID) {
    throw new Error('COGNITO_IDENTITY_POOL_ID is required');
  }

  const credentials = fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: AWS_REGION }),
    identityPoolId: COGNITO_IDENTITY_POOL_ID,
  });

  return new BedrockRuntimeClient({
    region: AWS_REGION,
    credentials,
  });
};

export const BEDROCK_MODEL_ID = 'anthropic.claude-3-haiku-20240307-v1:0';