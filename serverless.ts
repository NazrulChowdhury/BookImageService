import type { AWS } from '@serverless/typescript'
import coverUpload from '@functions/coverUpload'
import { BookImageEventBus } from '@functions/resources/eventBridgeResource'
import { bookCoverImageBucketPolicy, bookCoverImageBucket } from '@functions/resources/bucketResource'
import { config } from 'dotenv'

config();

const serverlessConfiguration: AWS = {
  service: 'bookimageservice',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-iam-roles-per-function'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: "${opt:stage, 'prod'}",
    region : 'eu-west-2',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment : "${self:custom.environment}" as any,
  },
  // import the function via paths
  functions: { 
    coverUpload 
  },
  resources:{ 
    Resources: { 
      BookImageEventBus,
      bookCoverImageBucket,
      bookCoverImageBucketPolicy
    }
  },
  package: { 
    individually: true 
  },
  custom: {
    environment : {
      STAGE: "${self:provider.stage}",
      BUCKET_NAME : "${env:BUCKET_NAME}",
      AWS_ACCOUNT_ID:"${env:AWS_ACCOUNT_ID}",
      ORIGIN_URL: "${env:ORIGIN_URL}", // allow origin cors url
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration
