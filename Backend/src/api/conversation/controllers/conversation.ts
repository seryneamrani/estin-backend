/**
 * conversation controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::conversation.conversation', ({ strapi }) => ({
    async create(ctx) {
        try {
            const result = await strapi
                .service('api::conversation.conversation')
                .createConversation();

            ctx.send({
                id: result.id,
                success: true
            });
        } catch (error) {
            ctx.throw(500, 'Failed to create conversation: ' + error);
        }
    },

    async ask(ctx) {

    }
}));
