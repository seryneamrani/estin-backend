import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::conversation.conversation', ({ strapi }) => ({

  async createConversation(title = "Title") {
    const conversation = await strapi.entityService.create('api::conversation.conversation', {
      data: { Title: title }
    });

    return {
      id: conversation.id,
      title: conversation.Title
    };
  },

  async getModelResponse(prompt: string): Promise<string> {
    try {
      const response = await fetch('http://127.0.0.1:7860/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: prompt })
      });

      // ✅ Typage explicite ici
      const data = await response.json() as { response: string };

      if (!data || typeof data.response !== 'string' || data.response.trim() === "") {
        strapi.log.error('⚠️ [Model] Réponse invalide ou vide :', data);
        throw new Error('Empty or invalid model response');
      }

      strapi.log.info(`🧠 [Model] Réponse : ${data.response}`);

      return data.response;
    } catch (error) {
      strapi.log.error('❌ [Model] Échec de l’appel au modèle :', error);
      throw new Error('AI model service unavailable');
    }
  }

}));
