
def detect_topic(prompt: str):
    prompt = prompt.lower()
    detected = []

    if any(w in prompt for w in ["c'est quoi", "présente", "estin", "définition", "où se trouve", "localisation"]):
        detected.append("context")

    if any(w in prompt for w in ["admission", "intégrer", "dossier", "bac"]):
        detected.append("admission")

    if any(w in prompt for w in ["formation", "parcours", "programme", "module", "matière"]):
        detected.append("formations")

    if any(w in prompt for w in ["club", "clubs", "bytecraft", "school of ai", "ldc"]):
        detected.append("clubs")

    if any(w in prompt for w in ["stage", "stages", "entreprise", "convention"]):
        detected.append("stages")

    if any(w in prompt for w in ["événement", "événements", "cosi", "journée", "datathon", "coderally"]):
        detected.append("événements")

    if any(w in prompt for w in ["partenariat", "partenariats", "université", "coopération"]):
        detected.append("partenariats")

    if any(w in prompt for w in ["débouché", "débouchés", "travailler", "métiers", "emploi"]):
        detected.append("débouchés")

    if any(w in prompt for w in ["cours", "année académique", "semestre", "tronc commun", "structure"]):
        detected.append("programme")

    if any(w in prompt for w in ["résidence", "logement", "chambre", "foyer"]):
        detected.append("résidence")

    if any(w in prompt for w in ["transport", "bus", "ligne", "trajet"]):
        detected.append("transport")

    return detected or ["formations"]
