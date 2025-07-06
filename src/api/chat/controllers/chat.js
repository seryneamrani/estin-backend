'use strict';

const axios = require('axios');

module.exports = {
  async ask(ctx) {
    const { prompt, userId } = ctx.request.body;

    if (!prompt || !userId) {
      return ctx.badRequest("⛔ Missing prompt or userId");
    }

    try {
      // ✅ Appel au modèle LLM via endpoint
      const llmResponse = await axios.post('http://localhost:7860', {

        text: prompt
      });

      const answer = llmResponse.data.response || llmResponse.data.answer || "";

      // ✅ Création du message utilisateur
      const userMessage = await strapi.entityService.create('api::message.message', {
        data: {
          role: 'user',
          text: prompt
        }
      });

      // ✅ Création du message du bot
      const botMessage = await strapi.entityService.create('api::message.message', {
        data: {
          role: 'assistant',
          text: answer
        }
      });

      // ✅ Création de la conversation
      const conversation = await strapi.entityService.create('api::conversation.conversation', {
        data: {
          userId,
          messages: [userMessage.id, botMessage.id]
        }
      });

      return ctx.send({
        answer,
        conversationId: conversation.id
      });

    } catch (error) {
      console.error("❌ Erreur LLM:", error.message);
      return ctx.internalServerError("Erreur lors de l'appel au LLM");
    }
  }
};
