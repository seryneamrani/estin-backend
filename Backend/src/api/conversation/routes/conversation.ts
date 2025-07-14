/**
 * conversation router
 */
export default {
  routes: [
    {
      method: "POST",
      path: "/conversations",
      handler: "conversation.create",
      config: { auth: false }
    },
    {
      method: "GET",
      path: "/conversation/:id",
      handler: "conversation.findOne",
      config: { auth: false }
    },
    {
      method: "GET",
      path: "/conversations",
      handler: "conversation.find",
      config: { auth: false }
    },
    {
      method: "POST",
      path: "/conversation/:id",
      handler: "conversation.ask",
      config: { auth: false }
    },
    // ✅ Nouvelle route : messages liés à une conversation
    {
      method: "GET",
      path: "/conversations/:id/messages",
      handler: "conversation.findMessages",
      config: { auth: false }
    }
  ]
};
