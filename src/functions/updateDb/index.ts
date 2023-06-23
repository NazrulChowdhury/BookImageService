
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    MONGO_URI : '${self:provider.environment.MONGO_URI}'
  },
  events: [
    {
      s3: {
        existing: true,
        bucket: { Ref: 'bookCoverImageBucket' } ,//'${self:provider.environment.BUCKET_NAME}'
        event: 's3:ObjectCreated:Put',
      },
    },
  ],

  iamRoleStatements: [
    { // allows itself to be invoked by the bucket
      Effect: 'Allow',
      Action: ['lambda:InvokeFunction'],
      Resource: "arn:aws:s3:::${self:provider.environment.BUCKET_NAME}"
    },
    { // allows itself to access the bucket's head object
      Effect: 'Allow',
      Action: ['s3:GetObject'],
      Resource: "arn:aws:s3:::${self:provider.environment.BUCKET_NAME}/*"
    }
  ]
};
