import torch
import json
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel, PeftConfig
import os
import importlib.util

# 📁 Chemin vers le modèle fine-tuné
BASE_DIR = os.path.dirname(__file__)
MODEL_DIR = os.path.join(BASE_DIR, "trained_model", "trained_model")

# 📥 Charger detect_topic depuis injection_utils.py
injection_utils_path = os.path.join(MODEL_DIR, "injection_utils.py")
spec = importlib.util.spec_from_file_location("injection_utils", injection_utils_path)
injection_utils = importlib.util.module_from_spec(spec)
spec.loader.exec_module(injection_utils)
detect_topic = injection_utils.detect_topic

# 📖 Charger les faits
with open(os.path.join(MODEL_DIR, "context_facts.json"), encoding="utf-8") as f:
    context_facts = json.load(f)

# 🔧 Charger config LoRA
config = PeftConfig.from_pretrained(MODEL_DIR)
base_model = AutoModelForCausalLM.from_pretrained(config.base_model_name_or_path)

# 🧠 Appliquer le modèle fine-tuné LoRA
model = PeftModel.from_pretrained(base_model, MODEL_DIR)
tokenizer = AutoTokenizer.from_pretrained(config.base_model_name_or_path, use_fast=True)

# 📌 Utiliser CPU si pas de CUDA
device = "cuda" if torch.cuda.is_available() else "cpu"
model = model.to(device)

# 🔮 Fonction de test
def generate_estin_response(prompt):
    topics = detect_topic(prompt)
    facts = "\n".join([context_facts[t] for t in topics])
    
    full_prompt = f"""### Instruction:
Tu es un assistant expert de l'ESTIN.
Réponds uniquement à partir des faits suivants :
{facts}

Question : {prompt.strip()}
💬 Réponse :"""

    inputs = tokenizer(full_prompt, return_tensors="pt").to(device)
    outputs = model.generate(**inputs, max_new_tokens=300, temperature=0.7)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response.split("💬 Réponse :")[-1].strip()

# 🧪 Test rapide
if __name__ == "__main__":
    question = "Où se situe la résidence ?"
    reponse = generate_estin_response(question)
    print("Réponse générée :\n", reponse)
