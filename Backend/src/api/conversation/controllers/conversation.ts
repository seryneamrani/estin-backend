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
                title: result.title || "Title was null",
                success: true
            });
        } catch (error) {
            ctx.throw(500, 'Failed to create conversation: ' + error);
        }
    },

    async ask(ctx) {
        try {
            const prompt = ctx.request.body.prompt
            const model_response = await strapi.service('api::conversation.conversation').getModelResponse(prompt);
            ctx.send({ response: model_response });
        } catch (error) {
            ctx.throw(500, 'Failed to ask the model: ' + error);
        }
        // Create a new message in collection `Message`
        // { "prompt": "content-prompt"}
        // message.Prompt = ctx.request.body.prompt
        // response = askModel.getModelResponse(prompt)
        // message.Response = response
        // calling message service in strapi
        // ctx.send({response: response})
    }
}));
