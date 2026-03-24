
import React, { useState, useEffect, useCallback } from 'react';
import { HCM_MODULES } from './constants';
import { DataVisualizer } from './components/Visuals';
import { getModuleInsights } from './services/gemini';
import { ModuleCategory } from './types';

const App: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  const currentModule = HCM_MODULES[currentIdx];

  const fetchInsight = useCallback(async () => {
    setLoadingAi(true);
    setAiInsight('');
    const insight = await getModuleInsights(currentModule.title);
    setAiInsight(insight);
    setLoadingAi(false);
  }, [currentModule.title]);

  useEffect(() => {
    fetchInsight();
  }, [currentIdx, fetchInsight]);

  const nextSlide = () => setCurrentIdx(prev => (prev + 1) % HCM_MODULES.length);
  const prevSlide = () => setCurrentIdx(prev => (prev - 1 + HCM_MODULES.length) % HCM_MODULES.length);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Header - Fixed Height */}
      <header className="px-8 py-4 bg-white border-b border-slate-200 flex justify-between items-center shrink-0 z-20">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-orange-600 rounded flex items-center justify-center font-bold text-white text-xl">O</div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-800">Oracle Fusion HCM</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Showcase App</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-xs font-medium">
          <span className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <span className="text-slate-600">核心/服务</span>
          </span>
          <span className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="text-slate-600">人才/绩效</span>
          </span>
          <div className="bg-slate-100 px-3 py-1 rounded-full text-slate-500 font-bold">
            {currentIdx + 1} / {HCM_MODULES.length}
          </div>
        </div>
      </header>

      {/* Main Slide Area - Scrollable */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden bg-slate-50/50">
        <div className="min-h-full flex flex-col items-center justify-start p-6 md:p-12 pb-32">
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            
            {/* Left Side: Content */}
            <div className="space-y-6 md:space-y-8 py-4 animate-in slide-in-from-left duration-700">
              <div>
                <span className={`inline-block px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-3 ${currentModule.category === ModuleCategory.ORANGE ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                  {currentModule.subtitle}
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                  {currentModule.title}
                </h2>
              </div>

              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
                {currentModule.description}
              </p>

              <div className="space-y-3">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">核心业务价值</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentModule.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm text-slate-700">
                      <svg className={`w-4 h-4 mt-0.5 shrink-0 ${currentModule.category === ModuleCategory.ORANGE ? 'text-orange-500' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Insight Section */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative overflow-hidden group">
                 <div className="flex items-center space-x-2 mb-2">
                   <div className="bg-indigo-500 w-1.5 h-1.5 rounded-full"></div>
                   <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AI 战略建议</h4>
                 </div>
                 {loadingAi ? (
                   <div className="space-y-2">
                     <div className="h-2 bg-slate-100 rounded w-full animate-pulse"></div>
                     <div className="h-2 bg-slate-100 rounded w-4/5 animate-pulse"></div>
                   </div>
                 ) : (
                   <p className="text-slate-800 italic leading-relaxed text-sm">
                     "{aiInsight}"
                   </p>
                 )}
              </div>
            </div>

            {/* Right Side: Visualization Container */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 p-6 md:p-10 border border-slate-100 animate-in zoom-in duration-500 sticky top-4">
              <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center justify-between border-b border-slate-50 pb-4">
                <span>业务流可视化与数据模型</span>
                <span className="text-[10px] text-slate-400 font-normal">Oracle HCM Cloud v24</span>
              </h3>
              <div className="min-h-[300px] flex items-center justify-center">
                <DataVisualizer module={currentModule} />
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center space-x-4">
                 <div className="flex -space-x-2 overflow-hidden">
                   {[1,2,3].map(i => (
                     <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white grayscale" src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
                   ))}
                 </div>
                 <div className="text-[10px] text-slate-400">
                   <p className="font-semibold text-slate-500">全球 500 强企业一致选择</p>
                   <p>实时分析 & 合规性保障</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Navigation Controls - Positioned relative to main viewport */}
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center space-x-6 z-30 pointer-events-none">
           <button 
             onClick={prevSlide}
             className="w-12 h-12 rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-xl flex items-center justify-center hover:bg-white transition-all active:scale-95 group pointer-events-auto"
           >
             <svg className="w-5 h-5 text-slate-600 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
             </svg>
           </button>

           <div className="flex space-x-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-slate-200 shadow-lg pointer-events-auto">
             {HCM_MODULES.map((_, i) => (
               <div 
                 key={i} 
                 onClick={() => setCurrentIdx(i)}
                 className={`cursor-pointer transition-all h-1.5 rounded-full ${currentIdx === i ? 'w-6 bg-slate-800' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`} 
               />
             ))}
           </div>

           <button 
             onClick={nextSlide}
             className="w-12 h-12 rounded-full bg-slate-900 text-white shadow-xl flex items-center justify-center hover:bg-slate-800 transition-all active:scale-95 group pointer-events-auto"
           >
             <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
             </svg>
           </button>
        </div>
      </main>

      {/* Footer Mini Map - Fixed Height */}
      <footer className="bg-white p-3 border-t border-slate-200 overflow-x-auto whitespace-nowrap scrollbar-hide shrink-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex space-x-3 px-2">
          {HCM_MODULES.map((mod, idx) => (
            <button
              key={mod.id}
              onClick={() => setCurrentIdx(idx)}
              className={`px-4 py-2 rounded-xl text-xs transition-all border shrink-0 ${currentIdx === idx ? 'bg-slate-900 border-slate-900 shadow-md font-bold text-white' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
            >
              {mod.title}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default App;
