import { handlerPath } from '@libs/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      eventBridge: {
        pattern: {
          source: ['book-social-app'],
          'detail-type': ['bookImageEvent'],
          detail: {
            bookId: ['$input.params(\'bookId\')'],
            imageLink: ['$input.params(\'imageLink\')'],
            documentId: ['$input.params(\'documentId\')']
          }
        },
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
