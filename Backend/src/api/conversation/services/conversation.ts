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
            title: conversation.Title
        };
    },
    async getModelResponse(prompt) {
        try {
            return (await (await fetch('http://localhost:7360/predict', {
                method: 'POST',
                body: prompt
            })).json()) || null;
        } catch (error) {
            strapi.log.error('Model request failed:', error);
            throw new Error('AI model service unavailable');
        }
    }
}));
