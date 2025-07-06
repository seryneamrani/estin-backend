/**
 * conversation service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::conversation.conversation', ({ strapi }) => ({
    async createConversation(title = null) {
        const conversation = await strapi.service('api::conversation.conversation').create({
            data: { title }
        });
        return {
            id: conversation.documentId,  // Strapi's auto-generated ID
            title: conversation.title
        };
    }
}));
