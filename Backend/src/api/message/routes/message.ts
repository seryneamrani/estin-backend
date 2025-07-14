/**
 * message router
 */
export default {
  routes: [
    {
      method: 'GET',
      path: '/messages',
      handler: 'message.find',
      config: { auth: false }
    },
    {
      method: 'GET',
      path: '/messages/:id',
      handler: 'message.findOne',
      config: { auth: false }
    },
    {
      method: 'POST',
      path: '/messages',
      handler: 'message.create',
      config: { auth: false }
    },
    {
      method: 'PUT',
      path: '/messages/:id',
      handler: 'message.update',
      config: { auth: false }
    },
    {
      method: 'DELETE',
      path: '/messages/:id',
      handler: 'message.delete',
      config: { auth: false }
    }
  ]
};
