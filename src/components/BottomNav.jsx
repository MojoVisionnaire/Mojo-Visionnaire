import React from 'react';
import { BookOpen, Home, Star, Sun, Library } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Accueil', icon: Home },
  { id: 'quran', label: 'Coran', icon: BookOpen },
  { id: 'dhikr', label: 'Dhikr', icon: Star },
  { id: 'sunnas', label: 'Sunnas', icon: Sun },
  { id: 'library', label: 'Biblio', icon: Library },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/97 backdrop-blur-xl border-t border-white/10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto px-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`nav-item ${active === id ? 'active' : ''}`}
            style={{ minWidth: 56, minHeight: 56 }}
          >
            <Icon size={22} strokeWidth={active === id ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
