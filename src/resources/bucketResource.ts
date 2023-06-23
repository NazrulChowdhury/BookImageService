export const bookCoverImageBucket = {
    Type: 'AWS::S3::Bucket',
    Properties: {
      BucketName: "${self:provider.environment.BUCKET_NAME}",
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedOrigins: [
                "${self:provider.environment.ORIGIN_URL}"
            ],
            AllowedHeaders: ['*'],
            AllowedMethods: ['GET'],
          },
        ],
      },
      // this was for making bucket public, redundant now. 
      // PublicAccessBlockConfiguration: {
      //   BlockPublicAcls: false,
      //   BlockPublicPolicy: false,
      //   IgnorePublicAcls: false,
      //   RestrictPublicBuckets: false,
      // },
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'AES256',
            },
          },
        ],
      },
    },
  }

export const bookCoverImageBucketPolicy = {
  Type: 'AWS::S3::BucketPolicy',
  Properties: {
    Bucket: { Ref: 'bookCoverImageBucket' },
    PolicyDocument: {
      Statement: [
        // {
        //   Sid: 'AllowLambdaAccess',
        //   Effect: 'Allow',
        //   Principal: {
        //     AWS: {
        //       'Fn::Sub': 'arn:aws:iam::${AWS::AccountId}:role/${self:service}-${self:provider.stage}-coverUpload-${self:provider.region}-lambdaRole'
        //     }
        //   },
        //   Action: ['s3:PutObject'],
        //   Resource: { 'Fn::Join': ['', ['arn:aws:s3:::', { Ref: 'bookCoverImageBucket' }, '/*']] },
        // },
        {
          Sid: "AllowCloudFrontServicePrincipal",
          Effect: "Allow",
          Principal: {
              "Service": "cloudfront.amazonaws.com"
          },
          Action: "s3:GetObject",
          Resource: { 'Fn::Join': ['', ['arn:aws:s3:::', { Ref: 'bookCoverImageBucket' }, '/*']] },
          Condition: {
            StringEquals: {
              "AWS:SourceArn": "arn:aws:cloudfront::299215296128:distribution/E1RU8DGCQ3UHF2"
            }
          }
        }
      ],
    },
  },
}


