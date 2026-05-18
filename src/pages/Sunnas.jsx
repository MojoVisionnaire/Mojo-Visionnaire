import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { SUNNAS, SUNNA_CATEGORIES } from '../data/sunnas';

export default function Sunnas() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem('islamplus_sunnas') || '[]'); } catch { return []; }
  });
  const [expanded, setExpanded] = useState(null);

  const filtered = selectedCategory === 'Tous'
    ? SUNNAS
    : SUNNAS.filter(s => s.category === selectedCategory);

  function toggleComplete(id) {
    const next = completed.includes(id)
      ? completed.filter(c => c !== id)
      : [...completed, id];
    setCompleted(next);
    localStorage.setItem('islamplus_sunnas', JSON.stringify(next));
  }

  const completedCount = completed.length;
  const total = SUNNAS.length;

  return (
    <div className="page-container bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-amber-900/30 to-slate-950 px-5 pt-safe pb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">☀️</span>
          <div>
            <h1 className="text-white text-xl font-bold">Sunnas du Prophète ﷺ</h1>
            <p className="text-slate-400 text-xs">السنة النبوية</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-amber-400 text-sm font-medium">{completedCount}/{total} adoptées</span>
            <span className="text-slate-400 text-xs">{Math.round(completedCount / total * 100)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${completedCount / total * 100}%` }}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-1">
          {['Tous', ...SUNNA_CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                selectedCategory === cat
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  : 'bg-white/5 text-slate-400 border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sunnas List */}
      <div className="px-5 py-4 space-y-2">
        {filtered.map((sunna) => {
          const isDone = completed.includes(sunna.id);
          const isExpanded = expanded === sunna.id;

          return (
            <div
              key={sunna.id}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                isDone ? 'bg-emerald-500/5 border-emerald-500/25' : 'bg-white/3 border-white/8'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleComplete(sunna.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-0.5 ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-slate-600 hover:border-emerald-500'
                    }`}
                  >
                    {isDone && <Check size={12} className="text-white" strokeWidth={3} />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full mr-2 ${
                          sunna.importance === 'haute'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {sunna.importance === 'haute' ? '★ Importante' : 'Recommandée'}
                        </span>
                        <span className="text-slate-500 text-xs">{sunna.category}</span>
                      </div>
                      <button
                        onClick={() => setExpanded(isExpanded ? null : sunna.id)}
                        className="text-slate-500 hover:text-slate-300 flex-shrink-0"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>

                    <p className={`font-medium mt-1 ${isDone ? 'text-emerald-300' : 'text-white'}`}>
                      {sunna.title}
                    </p>

                    {isExpanded && (
                      <div className="mt-3 space-y-3 animate-fade-in">
                        <p className="text-slate-300 text-sm leading-relaxed">{sunna.description}</p>
                        {sunna.arabic && (
                          <div className="bg-white/5 rounded-xl p-3">
                            <p className="arabic-verse text-white text-lg text-right leading-relaxed">{sunna.arabic}</p>
                          </div>
                        )}
                        <p className="text-slate-500 text-xs flex items-center gap-1.5">
                          <Star size={10} className="text-yellow-400" />
                          Source: {sunna.source}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer quote */}
      <div className="mx-5 mb-28 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-center">
        <p className="arabic-verse text-white text-xl mb-2">وَمَا آتَاكُمُ الرَّسُولُ فَخُذُوهُ</p>
        <p className="text-amber-400/80 text-sm italic">"Ce que le Messager vous donne, prenez-le."</p>
        <p className="text-slate-500 text-xs mt-1">Coran 59:7</p>
      </div>
    </div>
  );
}
