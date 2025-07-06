# chat_inference_entry.py
from fastapi import FastAPI, Request
import uvicorn
from chat_inference import generate_estin_response

app = FastAPI()

@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    prompt = data.get("text")
    if not prompt:
        return {"error": "Missing text"}
    response = generate_estin_response(prompt)
    return {"response": response}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7860)
