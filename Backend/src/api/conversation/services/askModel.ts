// TODO: Fix me
// export default ({ strapi }) => ({
//     async getModelResponse(prompt) {
//         try {
//             const response = await fetch('http://localhost:7360/predict', {
//                 method: 'POST',
//                 body: prompt
//             });

//             return (await response.json())?.text || null;
//         } catch (error) {
//             strapi.log.error('Model request failed:', error);
//             throw new Error('AI model service unavailable');
//         }
//     }
// });