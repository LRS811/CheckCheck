
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { ModuleInfo } from '../types';

const COLORS = ['#0C4A6E', '#0369A1', '#0284C7', '#0EA5E9', '#38BDF8'];

export const DataVisualizer: React.FC<{ module: ModuleInfo }> = ({ module }) => {
  if (module.visualType === 'lifecycle') {
    return (
      <div className="w-full space-y-4">
        <div className="flex justify-between items-center mb-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10" />
          {module.chartData?.map((node, i) => (
            <div key={i} className="flex flex-col items-center bg-white px-2">
              <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center mb-2 shadow-md">
                 <span className="text-xs font-bold">{node.label[0]}</span>
              </div>
              <span className="text-xs font-bold text-slate-600">{node.label}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {module.chartData?.map((group, i) => (
            <div key={i} className="flex flex-col space-y-1">
               <div className="bg-slate-800 text-white text-[10px] py-1 px-2 text-center font-bold mb-2">
                 {group.label}
               </div>
               <div className="border border-slate-200 p-2 rounded min-h-[160px] bg-slate-50">
                 {group.items.map((item: string, j: number) => (
                   <div key={j} className="text-[10px] text-slate-600 mb-1 leading-tight flex items-start">
                     <span className="mr-1">•</span>{item}
                   </div>
                 ))}
               </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (module.visualType === 'performance-flow') {
    return (
      <div className="w-full flex space-x-2 h-full items-stretch">
        {module.chartData?.map((stage, i) => (
          <div key={i} className="flex-1 flex flex-col">
            <div className="bg-cyan-100 text-cyan-900 text-xs font-bold py-2 text-center border-b border-cyan-200">
              {stage.stage}
            </div>
            <div className="flex-1 bg-cyan-50/50 p-3 space-y-3 border-x border-cyan-100">
              {stage.steps.map((step: string, j: number) => (
                <div key={j} className="bg-slate-800 text-white text-[10px] p-2 text-center rounded shadow-sm">
                  {step}
                </div>
              ))}
            </div>
            {i < (module.chartData?.length || 0) - 1 && (
               <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 text-slate-300">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" /></svg>
               </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (module.visualType === 'brand-dual') {
    return (
      <div className="w-full grid grid-cols-2 gap-6">
        {module.chartData?.map((side, i) => (
          <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative">
             <div className="w-16 h-16 rounded-full bg-slate-800 text-white flex items-center justify-center mx-auto mb-4 font-bold text-sm text-center px-2">
               {side.type}
             </div>
             <p className="text-[10px] text-blue-600 text-center italic mb-4">
               {side.desc}
             </p>
             <div className="space-y-2">
               {side.items.map((item: string, j: number) => (
                 <div key={j} className="text-[10px] text-slate-700 bg-white p-2 border border-slate-200 rounded flex items-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                   {item}
                 </div>
               ))}
             </div>
          </div>
        ))}
      </div>
    );
  }

  if (module.visualType === 'process') {
    return (
      <div className="flex flex-col space-y-4 w-full">
        {module.chartData?.map((step, idx) => (
          <div key={idx} className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg ${module.category === 'ORANGE' ? 'bg-orange-600' : 'bg-blue-600'}`}>
              {idx + 1}
            </div>
            <div className="flex-1 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
              <h4 className="font-bold text-slate-800 text-sm">{step.step}</h4>
              <p className="text-xs text-slate-500">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (module.visualType === 'table') {
    return (
      <div className="overflow-hidden border border-slate-200 rounded-xl w-full shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-white uppercase tracking-wider">核心领域</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-white uppercase tracking-wider">业务规则</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-white uppercase tracking-wider">数据维护</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {module.chartData?.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-[11px] font-bold text-slate-900">{row.type}</td>
                <td className="px-4 py-3 text-[11px] text-slate-600 leading-tight">{row.rule}</td>
                <td className="px-4 py-3 text-[11px] text-blue-600 font-semibold">{row.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {module.keyFeatures.map((f, i) => (
        <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className={`w-3 h-3 mb-3 rounded-full ${module.category === 'ORANGE' ? 'bg-orange-500' : 'bg-blue-500'}`} />
          <p className="text-xs font-bold text-slate-800">{f}</p>
        </div>
      ))}
    </div>
  );
};
