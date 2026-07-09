const API_KEY = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1alpha/models?key=${API_KEY}`;

fetch(url)
    .then(res => res.json())
    .then(data => {
        if (!data.models) {
            console.log("No models returned", data);
            return;
        }
        const bidiModels = data.models.filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('bidiGenerateContent'));
        console.log("v1alpha Supported models for bidiGenerateContent:");
        bidiModels.forEach(m => console.log(m.name));
    })
    .catch(err => console.error(err));
