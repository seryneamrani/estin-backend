/**
 * conversation controller
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::conversation.conversation', ({ strapi }) => ({

  // ✅ Créer une nouvelle conversation
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
      strapi.log.error("❌ [Controller] Erreur création conversation :", error);
      ctx.throw(500, 'Failed to create conversation: ' + error.message);
    }
  },

  // ✅ Envoyer une question au modèle et stocker les messages
  async ask(ctx) {
    try {
      const prompt = ctx.request.body.prompt;
      const conversationId = ctx.params.id;

      if (!prompt) {
        ctx.throw(400, "Le champ 'prompt' est requis.");
      }

      const model_response = await strapi
        .service('api::conversation.conversation')
        .getModelResponse(prompt);

      if (!model_response || typeof model_response !== 'string') {
        strapi.log.error("⚠️ Réponse du modèle vide ou invalide :", model_response);
        ctx.throw(500, "Réponse du modèle vide ou invalide");
      }

      // Enregistrer le message utilisateur
      await strapi.entityService.create('api::message.message', {
        data: {
          role: 'user',
          content: prompt,
          timestamp: new Date(),
          conversation: conversationId
        }
      });

      // Enregistrer la réponse du modèle
      await strapi.entityService.create('api::message.message', {
        data: {
          role: 'assistant',
          content: model_response,
          timestamp: new Date(),
          conversation: conversationId
        }
      });

      ctx.send({ response: model_response });
    } catch (error) {
      strapi.log.error("❌ [Controller] Erreur dans ask():", error);
      ctx.throw(500, 'Failed to ask the model: ' + error.message);
    }
  },

  // ✅ Récupérer les messages d'une conversation
  async findMessages(ctx) {
    const { id } = ctx.params;

    try {
      const messages = await strapi
        .service('api::message.message')
        .getMessagesByConversation(id);

      ctx.send(messages);
    } catch (error) {
      strapi.log.error("❌ [Controller] Erreur findMessages:", error);
      ctx.throw(500, 'Failed to get messages: ' + error.message);
    }
  }

}));
