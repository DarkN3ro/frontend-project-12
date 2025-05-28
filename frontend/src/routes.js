export const apiPath = '/api/v1'
export const apiRoutes = {
  loginPath: () => 'login',
  signupPath: () => 'signup',
  channelsPath: () => 'channels',
  channelPath: id => ['channels', id].join('/'),
  messagesPath: () => 'messages',
}