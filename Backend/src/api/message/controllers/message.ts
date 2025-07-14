import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::conversation.conversation', ({ strapi }) => ({

  async create(ctx) {
    try {
      const result = await strapi
        .service('api::conversation.conversation')
        .createConversation();

      ctx.send({
        id: result.id,
        title: result.title || "Title was null",
        success: true
      });
    } catch (error) {
      ctx.throw(500, 'Failed to create conversation: ' + error);
    }
  },

  async ask(ctx) {
    try {
      const { prompt } = ctx.request.body;
      const conversationId = ctx.params.id;

      // 1. Appel modèle IA
      const model_response = await strapi
        .service('api::conversation.conversation')
        .getModelResponse(prompt);

      // 2. Enregistrer le message de l'utilisateur
      await strapi.entityService.create('api::message.message', {
        data: {
          role: 'user',
          content: prompt,
          timestamp: new Date(),
          conversation: conversationId
        }
      });

      // 3. Enregistrer la réponse de l'IA
      await strapi.entityService.create('api::message.message', {
        data: {
          role: 'assistant',
          content: model_response,
          timestamp: new Date(),
          conversation: conversationId
        }
      });

      // 4. Envoyer la réponse au frontend
      ctx.send({ response: model_response });

    } catch (error) {
      ctx.throw(500, 'Failed to ask the model: ' + error);
    }
  },

  // ✅ NOUVELLE MÉTHODE pour récupérer les messages d'une conversation
  async findMessages(ctx) {
    const { id } = ctx.params;

    try {
      const messages = await strapi.service('api::message.message').getMessagesByConversation(id);
      ctx.send(messages);
    } catch (error) {
      ctx.throw(500, 'Failed to get messages: ' + error);
    }
  }

}));
