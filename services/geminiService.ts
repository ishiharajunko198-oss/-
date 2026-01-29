
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, FortuneResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateFortune(profile: UserProfile): Promise<FortuneResult> {
  const prompt = `
    你是一位融合了“新年毒舌占卜师”与“智商200边牧”性格的 AI 财富大师。
    现在是农历蛇年。你的性格：极其聪明、说话带刺但心怀红包、幽默俏皮、喜欢用互联网梗、极度崇拜边牧。
    请根据以下输入，为用户提供一份今日财运报告。

    【用户信息】
    - 星座: ${profile.zodiac}
    - 此时此刻的心情: ${profile.currentMood} (请在返回的 summary 中先针对心情来一句现代风格的犀利点评)
    - 脑子里的想法: ${profile.recentThoughts}
    - 今日头等大事: ${profile.dailyEvents}
    
    【全球格局观点 (用户的直觉)】
    - 科技/AI观: ${profile.globalAnswers.techView}
    - 钱包动向: ${profile.globalAnswers.energyView}
    - 消费信心: ${profile.globalAnswers.macroView}

    【任务目标】
    1. 运用“边牧级”的逻辑思维，分析这种心态和当前的经济周期。
    2. 结合新年氛围，给出财运、事业、综合评分。
    3. 提供 2-3 个潜力板块，推荐理由要“毒舌”且“精准”（例如：推荐新能源，可以说“因为边牧都知道未来是电动的，而你还想烧煤”）。
    4. 对今日大事给出“锦囊妙计”。
    5. 语气要像个在春晚上演脱口秀的智库专家。

    输出必须为 JSON 格式。
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          wealthLuck: { type: Type.NUMBER },
          overallLuck: { type: Type.NUMBER },
          careerLuck: { type: Type.NUMBER },
          summary: { type: Type.STRING, description: "富有新年气息、幽默、带点毒舌的点评和总结" },
          wealthInsight: { type: Type.STRING },
          economicLogic: { type: Type.STRING, description: "基于边牧智慧和全球逻辑的犀利洞察" },
          recommendedSectors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                reason: { type: Type.STRING },
                potential: { type: Type.NUMBER }
              },
              required: ["name", "reason", "potential"]
            }
          },
          luckyAdvice: { type: Type.STRING, description: "俏皮、现代且实用的行动建议" },
          luckyColor: { type: Type.STRING },
          luckyNumber: { type: Type.STRING },
          luckyDirection: { type: Type.STRING },
          talismanPrompt: { type: Type.STRING, description: "描述一个穿着极其时髦红袄的边牧，戴着墨镜，手拿一杯奶茶和金元宝，背景是赛博朋克风格的新年灯笼" },
        },
        required: ["wealthLuck", "overallLuck", "careerLuck", "summary", "wealthInsight", "economicLogic", "recommendedSectors", "luckyAdvice", "luckyNumber", "luckyDirection", "talismanPrompt"],
      }
    }
  });

  return JSON.parse(response.text.trim());
}

export async function generateLuckyTalisman(description: string): Promise<string> {
  const prompt = `A stylish, funny, and high-tech Chinese New Year prosperity mascot. 
    The main character is a smart Border Collie wearing a trendy red satin puffer jacket with gold zippers and cool sunglasses. 
    The dog is winking and holding a holographic gold ingot. 
    Background: Cyberpunk-style traditional Chinese lanterns, neon signs saying 'RICH' and 'LUCKY', vibrant fireworks, and lucky clouds. 
    Style: Professional 3D cartoon (like Zootopia style), high saturation reds and golds, 8k, cinematic pop art lighting. Details: ${description}.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: { aspectRatio: "1:1" }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Talisman generation failed.");
}
