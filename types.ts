
export enum Zodiac {
  ARIES = '白羊座',
  TAURUS = '金牛座',
  GEMINI = '双子座',
  CANCER = '巨蟹座',
  LEO = '狮子座',
  VIRGO = '处女座',
  LIBRA = '天秤座',
  SCORPIO = '天蝎座',
  SAGITTARIUS = '射手座',
  CAPRICORN = '摩羯座',
  AQUARIUS = '水瓶座',
  PISCES = '双鱼座'
}

export interface UserProfile {
  zodiac: Zodiac;
  currentMood: string;
  financialGoal: string;
  recentThoughts: string;
  dailyEvents: string; // 今日具体事项
  globalAnswers: {
    techView: string; // 科技/AI观
    energyView: string; // 能源/资源观
    macroView: string; // 宏观/消费观
  };
}

export interface Sector {
  name: string;
  reason: string;
  potential: number; // 1-5
}

export interface FortuneResult {
  wealthLuck: number;
  overallLuck: number;
  careerLuck: number;
  summary: string;
  wealthInsight: string;
  economicLogic: string; // 新增：经济逻辑判断
  recommendedSectors: Sector[]; // 新增：潜力板块
  luckyAdvice: string;
  luckyColor: string;
  luckyNumber: string;
  luckyDirection: string;
  talismanPrompt: string;
}
