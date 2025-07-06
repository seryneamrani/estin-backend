import sys
import os
import json
import torch
import importlib.util
from peft import PeftModel, PeftConfig
from transformers import AutoTokenizer, AutoModelForCausalLM

# 📁 Chemins de base
BASE_DIR = os.path.dirname(__file__)
MODEL_DIR = os.path.join(BASE_DIR, "trained_model", "trained_model")

# 🧠 Détection GPU ou CPU
device = "cuda" if torch.cuda.is_available() else "cpu"

# ✅ Import propre de injection_utils.py
injection_utils_path = os.path.join(MODEL_DIR, "injection_utils.py")
spec = importlib.util.spec_from_file_location("injection_utils", injection_utils_path)
injection_utils = importlib.util.module_from_spec(spec)
spec.loader.exec_module(injection_utils)

detect_topic = injection_utils.detect_topic

# 📦 Charger la config PEFT
config = PeftConfig.from_pretrained(MODEL_DIR)

# 🔄 Charger le modèle de base
base_model = AutoModelForCausalLM.from_pretrained(config.base_model_name_or_path)

# 🔌 Appliquer LoRA (PEFT)
model = PeftModel.from_pretrained(base_model, MODEL_DIR).to(device)

# 🧠 Tokenizer
tokenizer = AutoTokenizer.from_pretrained(config.base_model_name_or_path, use_fast=True)

# 📚 Faits contextuels
with open(os.path.join(MODEL_DIR, "context_facts.json"), encoding="utf-8") as f:
    context_facts = json.load(f)

# 🤖 Fonction principale
def generate_estin_response(prompt):
    topics = detect_topic(prompt)
    facts = "\n".join([context_facts[t] for t in topics])

    full_prompt = f"""### Instruction:
Tu es un assistant expert de l'ESTIN (École Supérieure en Sciences et Technologies de l'Informatique et du Numérique) à Amizour, Béjaïa.
Réponds clairement et uniquement à partir des faits suivants :
{facts}

Maintenant, réponds à :
Question : {prompt.strip()}
💬 Réponse :"""

    inputs = tokenizer(full_prompt, return_tensors="pt").to(device)
    outputs = model.generate(**inputs, max_new_tokens=300, temperature=0.7)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return response.split("💬 Réponse :")[-1].strip()
