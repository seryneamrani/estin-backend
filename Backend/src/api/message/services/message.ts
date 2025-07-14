/**
 * message service
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::message.message', ({ strapi }) => ({

  async saveMessage({ role, content, conversationId }) {
    if (!role || !content || !conversationId) {
      throw new Error('Missing required fields (role, content, conversationId)');
    }

    // 1. Création simple du message (sans relation)
    const message = await strapi.entityService.create('api::message.message', {
      data: {
        role,
        content,
        timestamp: new Date(),
        conversation: conversationId
      }
    });

    // 2. Rechargement du message avec la relation conversation
    const fullMessage = await strapi.entityService.findOne('api::message.message', message.id, {
      populate: ['conversation']
    });

    // ✅ 3. Retour avec relation conversation
    return {
      id: fullMessage.id,
      role: fullMessage.role,
      content: fullMessage.content,
      timestamp: fullMessage.timestamp,
      // @ts-ignore
      conversation: fullMessage.conversation
    };
  },

  // ✅ AJOUT : récupérer tous les messages d’une conversation donnée
  async getMessagesByConversation(conversationId) {
    if (!conversationId) throw new Error('Missing conversation ID');

    const messages = await strapi.entityService.findMany('api::message.message', {
      filters: {
        conversation: { id: conversationId }
      },
      sort: ['timestamp:asc']
    });

    return messages;
  }

}));
