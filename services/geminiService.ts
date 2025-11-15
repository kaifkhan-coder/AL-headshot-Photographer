
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
};

const extractImageFromResponse = (response: any): string => {
    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }
    throw new Error("No image data found in the Gemini response.");
};


export const generateHeadshot = async (base64Image: string, mimeType: string, stylePrompt: string): Promise<string> => {
    const imagePart = fileToGenerativePart(base64Image, mimeType);
    const textPart = { text: stylePrompt };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [imagePart, textPart],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    return extractImageFromResponse(response);
};

export const editImage = async (base64Image: string, mimeType: string, editPrompt: string): Promise<string> => {
    const imagePart = fileToGenerativePart(base64Image, mimeType);
    const textPart = { text: editPrompt };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [imagePart, textPart],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    return extractImageFromResponse(response);
};
