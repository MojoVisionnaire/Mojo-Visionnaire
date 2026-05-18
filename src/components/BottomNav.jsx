import React from 'react';
import { BookOpen, Home, Star, Sun, Library, Heart } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Accueil', icon: Home },
  { id: 'quran', label: 'Coran', icon: BookOpen },
  { id: 'dhikr', label: 'Dhikr', icon: Star },
  { id: 'sunnas', label: 'Sunnas', icon: Sun },
  { id: 'library', label: 'Biblio', icon: Library },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 px-2 pb-safe">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`nav-item ${active === id ? 'active' : ''}`}
          >
            <Icon size={22} strokeWidth={active === id ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
