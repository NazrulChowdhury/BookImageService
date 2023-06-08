export const BookImageEventBus = {
    Type: 'AWS::Events::EventBus',
    Properties: {
      Name: "${self:provider.environment.EVENT_BUS_NAME}"
    }
}