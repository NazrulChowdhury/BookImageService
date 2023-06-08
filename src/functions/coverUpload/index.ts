import { handlerPath } from '@libs/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      eventBridge: {
        eventBus: { Ref: 'BookImageEventBus' }, 
        pattern: {
          source: ['book-social-app'],
          'detail-type': ['triggerBookCoverUpload']
        }
      },
    }
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['s3:PutObject'],
      Resource:"arn:aws:s3:::${self:provider.environment.BUCKET_NAME}/*"
    },
  ],
}
