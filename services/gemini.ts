
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getModuleInsights(moduleName: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `你是Oracle HCM专家。请针对模块 "${moduleName}" 提供一段简短且具有吸引力的专业介绍，面向潜在的大客户，字数控制在100字以内，重点突出该模块对业务的价值。`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "";
  }
}
