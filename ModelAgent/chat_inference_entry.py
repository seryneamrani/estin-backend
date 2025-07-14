from fastapi import FastAPI, Request
import uvicorn
from chat_inference import generate_estin_response

app = FastAPI()

@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    prompt = data.get("text")

    print("📥 Prompt reçu :", prompt)

    if not prompt:
        print("❌ Erreur : prompt manquant")
        return {"error": "Missing text"}

    try:
        response = generate_estin_response(prompt)
        print("🤖 Réponse générée :", response)

        if not response:
            print("⚠️ Avertissement : réponse vide")
            return {"error": "Empty response from model"}

        return {"response": response}

    except Exception as e:
        print("❌ Exception lors de la génération :", str(e))
        return {"error": "Model inference failed", "details": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7860)
