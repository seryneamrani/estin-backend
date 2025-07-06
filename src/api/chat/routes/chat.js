'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/chat/ask',
      handler: 'chat.ask',
      config: {
        policies: [],
        auth: false
      }
    }
  ]
};
