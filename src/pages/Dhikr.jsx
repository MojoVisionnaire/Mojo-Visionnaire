import React, { useState, useCallback } from 'react';
import { RotateCcw, Sun, Moon, Star } from 'lucide-react';
import { MORNING_DHIKR, EVENING_DHIKR, PRAYER_DHIKR } from '../data/dhikr';

const TABS = [
  { id: 'morning', label: 'Matin', icon: Sun, data: MORNING_DHIKR, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { id: 'evening', label: 'Soir', icon: Moon, data: EVENING_DHIKR, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 'prayer', label: 'Après Prière', icon: Star, data: PRAYER_DHIKR, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 'counter', label: 'Tasbih', icon: null, data: [], color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

export default function Dhikr() {
  const [tab, setTab] = useState('morning');
  const [completed, setCompleted] = useState({});

  const currentTab = TABS.find(t => t.id === tab);

  function toggleComplete(id) {
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const completedCount = currentTab.data.filter(d => completed[d.id]).length;
  const progress = currentTab.data.length > 0 ? completedCount / currentTab.data.length : 0;

  return (
    <div className="page-container bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 px-5 pt-14 pb-4">
        <h1 className="text-white text-xl font-bold mb-1">Dhikr & Invocations</h1>
        <p className="text-slate-400 text-sm">الذكر والدعاء</p>

        {/* Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
          {TABS.map(({ id, label, icon: Icon, color, bg }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === id
                  ? `${bg} ${color} border border-current/20`
                  : 'bg-white/5 text-slate-400 border border-white/5'
              }`}
            >
              {Icon && <Icon size={14} />}
              {label}
            </button>
          ))}
        </div>

        {/* Progress */}
        {tab !== 'counter' && currentTab.data.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-xs">{completedCount}/{currentTab.data.length} complétés</span>
              {completedCount > 0 && (
                <button
                  onClick={() => setCompleted({})}
                  className="text-slate-500 text-xs flex items-center gap-1 hover:text-slate-300"
                >
                  <RotateCcw size={11} /> Réinitialiser
                </button>
              )}
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-5 py-4 space-y-3">
        {tab === 'counter' ? (
          <TasbihCounter />
        ) : (
          currentTab.data.map((dhikr) => (
            <DhikrCard
              key={dhikr.id}
              dhikr={dhikr}
              isCompleted={!!completed[dhikr.id]}
              onToggle={() => toggleComplete(dhikr.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function DhikrCard({ dhikr, isCompleted, onToggle }) {
  const [count, setCount] = useState(0);
  const target = dhikr.count || 1;
  const done = count >= target;

  function increment() {
    if (count < target) {
      const next = count + 1;
      setCount(next);
      if (next >= target) onToggle();
    }
  }

  return (
    <div
      className={`border rounded-2xl p-4 transition-all duration-300 ${
        isCompleted || done
          ? 'bg-emerald-500/5 border-emerald-500/30'
          : 'bg-white/3 border-white/8'
      }`}
    >
      {/* Arabic */}
      <p className="arabic-verse text-white text-xl leading-relaxed text-right mb-3">
        {dhikr.arabic}
      </p>

      {/* Transliteration */}
      {dhikr.transliteration && (
        <p className="text-emerald-400/70 text-xs italic mb-2">{dhikr.transliteration}</p>
      )}

      {/* French */}
      <p className="text-slate-300 text-sm mb-3">{dhikr.french}</p>

      {/* Benefit */}
      {dhikr.benefit && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 mb-3">
          <p className="text-yellow-400 text-xs">✨ {dhikr.benefit}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-xs">{dhikr.source}</span>
          {target > 1 && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-slate-400'}`}>
              {count}/{target}×
            </span>
          )}
        </div>
        <button
          onClick={increment}
          disabled={done}
          className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all active:scale-95 ${
            done
              ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          {done ? '✓ Fait' : target === 1 ? 'Fait' : `+1`}
        </button>
      </div>
    </div>
  );
}

function TasbihCounter() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [label, setLabel] = useState('سُبْحَانَ اللَّهِ');
  const [animation, setAnimation] = useState(false);

  const PRESETS = [
    { label: 'سُبْحَانَ اللَّهِ', fr: 'Subhanallah', target: 33 },
    { label: 'الْحَمْدُ لِلَّهِ', fr: 'Alhamdulillah', target: 33 },
    { label: 'اللَّهُ أَكْبَرُ', fr: 'Allahu Akbar', target: 33 },
    { label: 'لَا إِلَهَ إِلَّا اللَّهُ', fr: 'La ilaha illallah', target: 100 },
    { label: 'أَسْتَغْفِرُ اللَّهَ', fr: 'Astaghfirullah', target: 100 },
  ];

  function tap() {
    setAnimation(true);
    setTimeout(() => setAnimation(false), 200);
    if (count < target) {
      setCount(c => c + 1);
    }
  }

  const progress = count / target;
  const isDone = count >= target;
  const circumference = 2 * Math.PI * 90;

  return (
    <div className="flex flex-col items-center">
      {/* Presets */}
      <div className="flex flex-wrap gap-2 justify-center mb-8 w-full">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => { setLabel(p.label); setTarget(p.target); setCount(0); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border ${
              label === p.label
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-white/5 text-slate-400 border-white/10'
            }`}
          >
            {p.fr} ({p.target}×)
          </button>
        ))}
      </div>

      {/* Counter Circle */}
      <div className="relative w-64 h-64 mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <circle
            cx="100" cy="100" r="90"
            fill="none"
            stroke={isDone ? '#10b981' : '#065f46'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            className="transition-all duration-300"
          />
        </svg>
        <button
          onClick={tap}
          className={`absolute inset-4 rounded-full flex flex-col items-center justify-center transition-all duration-150 active:scale-95 ${
            isDone
              ? 'bg-emerald-500/20 border-2 border-emerald-500/40'
              : 'bg-slate-800 border-2 border-white/5 hover:bg-slate-700'
          } ${animation ? 'scale-95' : 'scale-100'}`}
        >
          <p className="arabic-verse text-white text-2xl leading-tight text-center px-4">{label}</p>
          <p className={`text-4xl font-bold mt-2 ${isDone ? 'text-emerald-400' : 'text-white'}`}>
            {count}
          </p>
          <p className="text-slate-500 text-sm">/ {target}</p>
        </button>
      </div>

      {isDone && (
        <div className="text-center mb-6 animate-fade-in">
          <p className="text-emerald-400 text-lg font-bold">ما شاء الله</p>
          <p className="text-slate-400 text-sm">Masha Allah! Objectif atteint! 🌿</p>
        </div>
      )}

      <button
        onClick={() => setCount(0)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <RotateCcw size={16} />
        <span className="text-sm">Réinitialiser</span>
      </button>
    </div>
  );
}
