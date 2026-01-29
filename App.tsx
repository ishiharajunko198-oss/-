
import React, { useState } from 'react';
import { UserProfile, FortuneResult } from './types';
import FortuneForm from './components/FortuneForm';
import FortuneDisplay from './components/FortuneDisplay';
import { generateFortune, generateLuckyTalisman } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<'welcome' | 'form' | 'loading' | 'result'>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [fortune, setFortune] = useState<FortuneResult | null>(null);
  const [talismanUrl, setTalismanUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startDivination = () => {
    setStep('form');
  };

  const handleShareApp = async () => {
    const shareData = {
      title: '蛇年财运旺旺占卜',
      text: '快来！这家的边牧大师算财运贼准，我已经领到发财神符了！',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} 链接在这里：${shareData.url}`);
        alert('邀请函已复制到剪贴板，快去发给好兄弟！');
      }
    } catch (err) {
      console.log('Share failed', err);
    }
  };

  const handleSubmit = async (profile: UserProfile) => {
    setUserProfile(profile);
    setStep('loading');
    setError(null);

    try {
      const result = await generateFortune(profile);
      setFortune(result);
      const imageUrl = await generateLuckyTalisman(result.talismanPrompt);
      setTalismanUrl(imageUrl);
      setStep('result');
    } catch (err) {
      console.error(err);
      setError('天机不可泄露，或者是边牧觉得你太帅/美，网线被它嫉妒得咬断了！');
      setStep('form');
    }
  };

  const handleReset = () => {
    setStep('welcome');
    setUserProfile(null);
    setFortune(null);
    setTalismanUrl(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <header className="fixed top-0 left-0 w-full p-6 text-center z-10">
        <h1 className="text-4xl font-festive text-yellow-400 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          恭喜发财 · 边牧理财
        </h1>
      </header>

      <main className="w-full max-w-2xl mt-20 mb-10">
        {step === 'welcome' && (
          <div className="text-center animate-fadeIn space-y-6">
            <div className="relative inline-block animate-bounce-slow">
              <div className="w-56 h-56 bg-gradient-to-br from-yellow-400 to-red-600 rounded-full flex items-center justify-center border-4 border-yellow-200 shadow-[0_0_50px_rgba(251,191,36,0.5)]">
                <div className="text-center">
                  <i className="fas fa-dog text-7xl text-white mb-2"></i>
                  <div className="font-festive text-2xl text-yellow-100">旺财军师</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-red-600 text-yellow-300 px-4 py-1 rounded-full border-2 border-yellow-400 font-bold rotate-12 shadow-lg">
                必火！
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-4xl font-festive font-bold bg-gradient-to-b from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
                蛇年不差钱，全靠脑壳灵
              </h2>
              <p className="text-yellow-100/80 max-w-md mx-auto leading-relaxed">
                别盯着红包看了，快让智商天花板的边牧大师给你算算：今年你是能实现财富自由，还是继续在工位上当高级演员？
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={startDivination}
                className="group relative px-12 py-5 bg-yellow-500 hover:bg-yellow-400 text-red-900 font-black rounded-full transition-all transform hover:scale-110 active:scale-95 shadow-[0_10px_20px_rgba(0,0,0,0.3)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 text-xl">
                  <i className="fas fa-fire"></i> 开启搞钱模式
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>

              <button
                onClick={handleShareApp}
                className="text-yellow-400/80 hover:text-yellow-300 text-sm font-bold flex items-center justify-center gap-2 transition-colors py-2"
              >
                <i className="fas fa-paper-plane"></i> 叫上好兄弟一起算
              </button>
            </div>
          </div>
        )}

        {step === 'form' && (
          <FortuneForm onSubmit={handleSubmit} initialData={userProfile} error={error} />
        )}

        {step === 'loading' && (
          <div className="text-center space-y-8">
            <div className="relative w-32 h-32 mx-auto">
               <div className="absolute inset-0 border-4 border-yellow-500/20 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-t-yellow-400 rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <i className="fas fa-paw text-3xl text-yellow-400 animate-pulse"></i>
               </div>
            </div>
            <div className="space-y-3">
              <p className="text-2xl font-festive text-yellow-300">边牧正在飞速偷看天书...</p>
              <p className="text-sm text-yellow-100/60 italic">正在分析你和财富之间到底隔了多少个哈士奇</p>
            </div>
          </div>
        )}

        {step === 'result' && fortune && (
          <FortuneDisplay 
            fortune={fortune} 
            talismanUrl={talismanUrl} 
            userProfile={userProfile!} 
            onReset={handleReset} 
          />
        )}
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-4 text-center text-xs text-yellow-600/60 bg-black/20 backdrop-blur-sm">
        🏮 警告：本App仅供娱乐，如若大富大贵，记得给边牧买个罐头 🏮
      </footer>
    </div>
  );
};

export default App;
