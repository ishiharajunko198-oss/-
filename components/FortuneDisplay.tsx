
import React from 'react';
import { FortuneResult, UserProfile } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface Props {
  fortune: FortuneResult;
  talismanUrl: string | null;
  userProfile: UserProfile;
  onReset: () => void;
}

const FortuneDisplay: React.FC<Props> = ({ fortune, talismanUrl, userProfile, onReset }) => {
  const chartData = [
    { subject: '横财命', A: fortune.wealthLuck, fullMark: 100 },
    { subject: '演员修养', A: fortune.careerLuck, fullMark: 100 },
    { subject: '颜值即正义', A: fortune.overallLuck, fullMark: 100 },
    { subject: '边牧智商', A: 99, fullMark: 100 },
    { subject: '麻将手气', A: 88, fullMark: 100 },
  ];

  const handleShare = async () => {
    const text = `【边牧大师快报】我今天的财运高达${fortune.wealthLuck}%！大师点评：“${fortune.summary}”。你也快来看看今年的发财神符长啥样！`;
    const shareData = {
      title: '蛇年财运报告',
      text: text,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${text} \n点击测测：${shareData.url}`);
        alert('发财报告已复制！快去群里凡尔赛一下～');
      }
    } catch (err) {
      console.log('Share error:', err);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full max-h-[85vh] overflow-y-auto custom-scrollbar px-2">
      {/* Red Envelope Style Header */}
      <div className="red-envelope p-6 rounded-[40px] relative overflow-hidden border-4 border-yellow-500 shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
          <i className="fas fa-dog text-9xl text-white"></i>
        </div>
        
        <div className="flex justify-between items-start mb-6 border-b-2 border-yellow-500/30 pb-4">
          <div>
            <h3 className="text-3xl font-festive text-yellow-400">边牧大师的《今日不差钱》指南</h3>
            <p className="text-xs text-yellow-100/60 uppercase tracking-widest font-bold">Oracle for Rich Humans Only</p>
          </div>
          <div className="text-center">
            <span className="bg-yellow-500 text-red-900 px-4 py-1 rounded-full text-xs font-black shadow-lg">
              {userProfile.zodiac}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
          <div className="h-60 w-full bg-red-900/20 rounded-3xl p-2 border border-yellow-500/10">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="#fbbf2433" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#fbbf24', fontSize: 11, fontWeight: 'bold' }} />
                <Radar name="Luck" dataKey="A" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <div>
              <div className="text-6xl font-black text-yellow-400 drop-shadow-lg">{fortune.wealthLuck}%</div>
              <div className="text-sm font-bold text-yellow-200 mt-1 uppercase tracking-widest">
                今日红火度 (小心烫手)
              </div>
            </div>
            <p className="text-white font-medium italic leading-relaxed text-xl font-festive drop-shadow-sm">
              “{fortune.summary}”
            </p>
          </div>
        </div>

        <div className="p-4 bg-yellow-400/10 border-2 border-dashed border-yellow-500/40 rounded-2xl">
          <h4 className="text-yellow-400 text-sm font-black mb-2 flex items-center uppercase italic">
            <i className="fas fa-brain mr-2 text-red-500"></i> 边牧叼回来的赚钱逻辑
          </h4>
          <p className="text-yellow-100/90 text-sm leading-relaxed font-medium">
            {fortune.economicLogic}
          </p>
        </div>
      </div>

      {/* Detail Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-800 to-red-950 p-6 rounded-[35px] border-2 border-yellow-600/50 shadow-xl">
          <h4 className="text-yellow-400 font-black mb-4 text-sm flex items-center tracking-tighter uppercase">
            <i className="fas fa-rocket mr-2"></i> 边牧看好的“肥肉”板块
          </h4>
          <div className="space-y-4">
            {fortune.recommendedSectors.map((s, i) => (
              <div key={i} className="bg-red-900/30 p-3 rounded-2xl border border-yellow-500/10 hover:border-yellow-500/40 transition-all">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-yellow-100 font-bold text-sm">{s.name}</span>
                  <div className="text-yellow-400 text-xs">
                    {[...Array(s.potential)].map((_, idx) => <i key={idx} className="fas fa-bone mr-0.5"></i>)}
                  </div>
                </div>
                <p className="text-[10px] text-yellow-100/50 line-clamp-2">{s.reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-800 to-red-950 p-6 rounded-[35px] border-2 border-yellow-600/50 shadow-xl">
          <h4 className="text-yellow-400 font-black mb-4 text-sm flex items-center uppercase">
            <i className="fas fa-lightbulb mr-2"></i> 边牧的“脱贫”悄悄话
          </h4>
          <div className="space-y-5">
            <p className="text-sm text-yellow-100/80 bg-red-900/40 p-4 rounded-2xl italic leading-relaxed font-medium">
              {fortune.luckyAdvice}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-red-900/60 rounded-2xl border border-yellow-500/20 shadow-inner">
                <div className="text-[10px] text-yellow-500/60 font-bold mb-1 uppercase">穿这颜色能吸金</div>
                <div className="text-sm font-black text-white" style={{ color: fortune.luckyColor }}>{fortune.luckyColor}</div>
              </div>
              <div className="text-center p-3 bg-red-900/60 rounded-2xl border border-yellow-500/20 shadow-inner">
                <div className="text-[10px] text-yellow-500/60 font-bold mb-1 uppercase">往这儿走有惊喜</div>
                <div className="text-sm font-black text-yellow-400">{fortune.luckyDirection}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Talisman Section */}
      <div className="bg-red-950 p-6 rounded-[40px] border-4 border-yellow-500 shadow-2xl relative">
        <div className="absolute -top-3 -right-3 bg-yellow-400 text-red-800 px-3 py-1 rounded-full text-[10px] font-black uppercase rotate-12 border-2 border-red-800">New Year Edition</div>
        <h4 className="text-yellow-400 font-festive text-2xl mb-4 text-center">
          🏮 你的专属“边牧守财”大红符 🏮
        </h4>
        <div className="aspect-square w-full rounded-3xl overflow-hidden bg-black/40 relative max-w-sm mx-auto border-2 border-yellow-500 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
          {talismanUrl ? (
            <img src={talismanUrl} alt="Lucky Talisman" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs text-yellow-500 font-bold animate-pulse">边牧正在给你画符，别催...</span>
            </div>
          )}
        </div>
        <p className="mt-6 text-xs text-yellow-100/40 text-center leading-relaxed italic px-4">
          提示：这张符不仅避邪，还能避开“割韭菜”的镰刀。存好它，今年你就是最聪明的“边牧人类”。
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 py-5 bg-yellow-500 hover:bg-yellow-400 text-red-900 font-black rounded-3xl transition-all shadow-xl active:translate-y-1 text-lg"
        >
          不满意？再算一卦！
        </button>
        <button
          onClick={handleShare}
          className="px-8 py-5 bg-red-600 hover:bg-red-500 text-white font-black rounded-3xl border-2 border-yellow-500 shadow-xl"
        >
          <i className="fas fa-share-nodes"></i>
        </button>
      </div>
    </div>
  );
};

export default FortuneDisplay;
