
import React, { useState } from 'react';
import { UserProfile, Zodiac } from '../types';

interface Props {
  onSubmit: (profile: UserProfile) => void;
  initialData: UserProfile | null;
  error: string | null;
}

const FortuneForm: React.FC<Props> = ({ onSubmit, initialData, error }) => {
  const [zodiac, setZodiac] = useState<Zodiac>(initialData?.zodiac || Zodiac.ARIES);
  const [mood, setMood] = useState(initialData?.currentMood || '平静');
  const [goal, setGoal] = useState(initialData?.financialGoal || '');
  const [thoughts, setThoughts] = useState(initialData?.recentThoughts || '');
  const [dailyEvents, setDailyEvents] = useState(initialData?.dailyEvents || '');
  
  const [techView, setTechView] = useState(initialData?.globalAnswers?.techView || '乐观');
  const [energyView, setEnergyView] = useState(initialData?.globalAnswers?.energyView || '平稳');
  const [macroView, setMacroView] = useState(initialData?.globalAnswers?.macroView || '观望');

  const moods = ['元气满满', '人间清醒', '野心勃勃', '只想躺平', '急需暴富', '信心爆棚'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      zodiac,
      currentMood: mood,
      financialGoal: goal,
      recentThoughts: thoughts,
      dailyEvents,
      globalAnswers: { techView, energyView, macroView }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="red-envelope p-6 md:p-8 rounded-[40px] space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-slideUp max-h-[75vh] overflow-y-auto custom-scrollbar border-4 border-yellow-500">
      {error && (
        <div className="p-4 bg-yellow-400/20 border border-yellow-400 rounded-xl text-yellow-200 text-sm font-bold">
          <i className="fas fa-exclamation-circle mr-2"></i> {error}
        </div>
      )}

      <div className="text-center space-y-1">
        <h2 className="text-2xl font-festive text-yellow-400">暴富申请表 (边牧在线审核)</h2>
        <p className="text-xs text-yellow-100/60 italic">边牧大师提示：诚实点，财富才不会躲着你走</p>
      </div>

      <section className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-yellow-500 mb-2 uppercase tracking-widest">你是哪种“招财喵”？</label>
          <div className="grid grid-cols-4 gap-2">
            {Object.values(Zodiac).map((z) => (
              <button
                key={z}
                type="button"
                onClick={() => setZodiac(z)}
                className={`py-2 text-xs rounded-lg border-2 transition-all font-bold ${
                  zodiac === z 
                    ? 'bg-yellow-500 border-white text-red-800 shadow-[0_0_15px_rgba(251,191,36,0.6)]' 
                    : 'bg-black/20 border-yellow-500/30 text-yellow-500/70 hover:bg-yellow-500/10'
                }`}
              >
                {z}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-yellow-500 mb-2 uppercase">今天打算去哪儿“捡金子”？</label>
          <input
            type="text"
            value={dailyEvents}
            onChange={(e) => setDailyEvents(e.target.value)}
            placeholder="比如：去甲方爸爸那里优雅地收租"
            className="w-full bg-red-900/40 border-2 border-yellow-600/50 rounded-2xl px-4 py-3 text-white placeholder:text-yellow-100/30 focus:outline-none focus:border-yellow-400"
          />
        </div>
      </section>

      <section className="space-y-4 bg-black/20 p-5 rounded-3xl border border-yellow-500/20">
        <h3 className="text-yellow-400 font-festive text-lg flex items-center gap-2">
          <i className="fas fa-globe"></i> 预判大富翁格局
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] text-yellow-200/50 mb-2 font-bold uppercase">1. AI 到底是你的 ATM 还是碎钞机？</label>
            <div className="flex gap-2">
              {['发财工具', '骗钱玩意', '还得练练'].map(v => (
                <button key={v} type="button" onClick={() => setTechView(v)} className={`flex-1 py-2 text-xs rounded-xl border-2 font-bold ${techView === v ? 'bg-yellow-500 border-white text-red-800' : 'bg-red-900/40 border-yellow-600/30 text-yellow-500'}`}>{v}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-yellow-200/50 mb-2 font-bold uppercase">2. 钱包最近想“出海”还是“出柜”？</label>
            <div className="flex gap-2">
              {['买遍全球', '只进不出', '随便花花'].map(v => (
                <button key={v} type="button" onClick={() => setEnergyView(v)} className={`flex-1 py-2 text-xs rounded-xl border-2 font-bold ${energyView === v ? 'bg-yellow-500 border-white text-red-800' : 'bg-red-900/40 border-yellow-600/30 text-yellow-500'}`}>{v}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <label className="block text-xs font-bold text-yellow-500 uppercase">老实交代，最近在打什么发财主意？</label>
        <textarea
          rows={2}
          value={thoughts}
          onChange={(e) => setThoughts(e.target.value)}
          placeholder="边牧已经看透你的小九九了，快写下来，我帮你参谋参谋..."
          className="w-full bg-red-900/40 border-2 border-yellow-600/50 rounded-2xl px-4 py-3 text-white placeholder:text-yellow-100/30 focus:outline-none focus:border-yellow-400 resize-none"
        />
      </section>

      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-b from-yellow-300 to-yellow-600 text-red-900 font-black text-lg rounded-2xl shadow-[0_5px_0_#92400e] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-3"
      >
        <i className="fas fa-bolt"></i>
        <span>我看行，快算！</span>
      </button>
    </form>
  );
};

export default FortuneForm;
