
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateNotaContent = async (subject: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Buatkan draft isi Nota Dinas dalam Bahasa Indonesia yang sangat formal untuk perihal: "${subject}". 
    Draft harus terdiri dari minimal 3 paragraf: Pembuka, Inti/Penjelasan, dan Penutup. 
    Kembalikan hanya teks isi suratnya saja tanpa header atau footer.`,
  });
  return response.text || '';
};

export const generateSuratTugasDetails = async (purpose: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Buatkan poin-poin formal untuk "Menimbang" dan "Dasar" dalam Surat Tugas dengan tujuan: "${purpose}". 
    Gunakan format JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          menimbang: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Alasan-alasan dikeluarkannya surat tugas"
          },
          dasar: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Peraturan atau rujukan hukum dasar penugasan"
          }
        },
        required: ["menimbang", "dasar"]
      }
    }
  });
  
  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return { menimbang: [], dasar: [] };
  }
};
