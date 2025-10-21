// services/geminiService.ts
import { GoogleGenAI, GenerateContentResponse, Tool, Content } from "@google/genai";
import { Message, Source, ExecutedCode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

interface QueryOptions {
  message: string;
  history: Message[];
  model: string;
  googleSearch: boolean;
  codeInterpreter: boolean;
}

interface QueryResult {
  text: string;
  sources: Source[];
  executedCode: ExecutedCode[];
  images: string[];
}

const buildHistory = (history: Message[]): Content[] => {
  return history.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.text }],
  }));
};

export const runQuery = async ({
  message,
  history,
  model,
  googleSearch,
  codeInterpreter,
}: QueryOptions): Promise<QueryResult> => {
  
  const tools: Tool[] = [];
  if (googleSearch) {
    tools.push({ googleSearch: {} });
  }
  if (codeInterpreter) {
    tools.push({ codeExecution: {} });
  }
  
  const hasTools = tools.length > 0;

  try {
    const chatHistory = buildHistory(history);
    const contents: Content[] = [...chatHistory, { role: 'user', parts: [{ text: message }] }];

    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents,
        config: {
            tools: hasTools ? tools : undefined,
        },
    });

    // FIX: Use the 'text' property from the response object for simpler text extraction, as per guidelines.
    const text = response.text;
    const executedCode: ExecutedCode[] = [];
    const images: string[] = [];
    
    // Process parts to extract executable code and images, as 'response.text' only contains text parts.
    response.candidates?.[0]?.content?.parts?.forEach(part => {
        if (part.executableCode) {
            executedCode.push({
                language: part.executableCode.language,
                code: part.executableCode.code,
            });
        }
        // FIX: Extract image data from the response parts and convert to a data URI.
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
            const imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            images.push(imageUrl);
        }
    });

    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const sources: Source[] = [];
    
    if (groundingMetadata?.groundingChunks) {
      for (const chunk of groundingMetadata.groundingChunks) {
        if (chunk.web && chunk.web.uri) {
          sources.push({ uri: chunk.web.uri, title: chunk.web.title });
        }
      }
    }

    return { text, sources, executedCode, images };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return { text: `Error: ${error.message}`, sources: [], executedCode: [], images: [] };
    }
    return { text: "An unknown error occurred.", sources: [], executedCode: [], images: [] };
  }
};
