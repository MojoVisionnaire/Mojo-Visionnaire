import React, { useState } from 'react';
import { Search, ChevronRight, BookOpen, ArrowLeft, Star, Share2 } from 'lucide-react';
import { SURAH_LIST, SURAH_CONTENT } from '../data/surahs';

export default function Quran() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('islamplus_bookmarks') || '[]'); } catch { return []; }
  });

  const filtered = SURAH_LIST.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.arabic.includes(search) ||
    s.meaning.toLowerCase().includes(search.toLowerCase()) ||
    String(s.id).includes(search)
  );

  function toggleBookmark(id) {
    const next = bookmarks.includes(id)
      ? bookmarks.filter(b => b !== id)
      : [...bookmarks, id];
    setBookmarks(next);
    localStorage.setItem('islamplus_bookmarks', JSON.stringify(next));
  }

  if (selected) {
    return (
      <SurahView
        surah={selected}
        isBookmarked={bookmarks.includes(selected.id)}
        onToggleBookmark={() => toggleBookmark(selected.id)}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <div className="page-container bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-emerald-900/40 to-slate-950 px-5 pt-14 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
            <BookOpen size={20} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">Le Saint Coran</h1>
            <p className="text-slate-400 text-xs">القرآن الكريم</p>
          </div>
        </div>
        <p className="text-slate-400 text-sm">114 Sourates • Traduction française</p>

        {/* Search */}
        <div className="relative mt-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher une sourate..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Quick access */}
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
          {[1, 36, 18, 55, 67, 112, 97].map(id => {
            const s = SURAH_LIST.find(s => s.id === id);
            return (
              <button
                key={id}
                onClick={() => setSelected(s)}
                className="flex-shrink-0 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5 text-emerald-400 text-xs font-medium"
              >
                {s?.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookmarks */}
      {bookmarks.length > 0 && !search && (
        <div className="px-5 mb-4">
          <p className="text-slate-400 text-xs font-medium mb-2 flex items-center gap-1.5">
            <Star size={12} className="text-yellow-400" fill="currentColor" />
            Mes favoris
          </p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {bookmarks.map(id => {
              const s = SURAH_LIST.find(s => s.id === id);
              return (
                <button
                  key={id}
                  onClick={() => setSelected(s)}
                  className="flex-shrink-0 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-1.5 text-yellow-400 text-xs"
                >
                  {s?.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Surah List */}
      <div className="px-5">
        {!search && <p className="text-slate-500 text-xs mb-3">TOUTES LES SOURATES</p>}
        <div className="space-y-1">
          {filtered.map((surah) => (
            <button
              key={surah.id}
              onClick={() => setSelected(surah)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors group"
            >
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-400 text-sm font-bold">{surah.id}</span>
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium text-sm">{surah.name}</span>
                  {bookmarks.includes(surah.id) && <Star size={10} className="text-yellow-400" fill="currentColor" />}
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <span>{surah.meaning}</span>
                  <span>•</span>
                  <span>{surah.verses} versets</span>
                  <span>•</span>
                  <span>{surah.revelation}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="arabic-verse text-slate-400 text-base">{surah.arabic}</span>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SurahView({ surah, isBookmarked, onToggleBookmark, onBack }) {
  const content = SURAH_CONTENT[surah.id];
  const [showFrench, setShowFrench] = useState(true);
  const [fontSize, setFontSize] = useState('text-2xl');

  const fontSizes = ['text-xl', 'text-2xl', 'text-3xl'];
  const fontSizeLabels = ['A', 'A', 'A'];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-lg border-b border-white/5 px-5 py-4">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="text-center">
            <p className="text-white font-bold">{surah.name}</p>
            <p className="text-slate-400 text-xs">{surah.arabic} • {surah.verses} versets</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleBookmark}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
            >
              <Star size={18} className={isBookmarked ? 'text-yellow-400 fill-yellow-400' : 'text-slate-500'} />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            {fontSizes.map((size, i) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${fontSize === size ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                style={{ fontSize: `${14 + i * 2}px` }}
              >
                A
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFrench(!showFrench)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${showFrench ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-400'}`}
          >
            Traduction FR
          </button>
        </div>
      </div>

      {/* Bismillah */}
      {surah.id !== 1 && surah.id !== 9 && (
        <div className="px-5 py-6 text-center border-b border-white/5">
          <p className="arabic-verse text-white text-3xl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          {showFrench && <p className="text-slate-400 text-sm mt-2 italic">Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux.</p>}
        </div>
      )}

      {/* Header Card */}
      <div className="mx-5 mt-4 mb-6 bg-gradient-to-br from-emerald-900/40 to-slate-900/40 border border-emerald-500/20 rounded-2xl p-4 text-center">
        <p className="arabic-verse text-white text-4xl mb-2">{surah.arabic}</p>
        <p className="text-emerald-400 font-medium">{surah.name}</p>
        <p className="text-slate-400 text-sm">{surah.meaning}</p>
        <div className="flex items-center justify-center gap-3 mt-2 text-xs text-slate-500">
          <span>{surah.verses} versets</span>
          <span>•</span>
          <span>{surah.revelation}</span>
          <span>•</span>
          <span>Sourate {surah.id}</span>
        </div>
      </div>

      {/* Verses */}
      <div className="px-5 pb-28 space-y-4">
        {content ? (
          content.verses.map((verse) => (
            <div
              key={verse.number}
              className="bg-white/3 border border-white/5 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                  <span className="text-emerald-400 text-xs font-bold">{verse.number}</span>
                </div>
              </div>
              <p className={`arabic-verse text-white mb-4 leading-loose text-right ${fontSize}`}>
                {verse.arabic}
              </p>
              {showFrench && (
                <p className="text-slate-300 text-sm leading-relaxed border-t border-white/5 pt-3">
                  {verse.french}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📖</div>
            <p className="text-white text-lg font-medium mb-2">Contenu complet bientôt disponible</p>
            <p className="text-slate-400 text-sm">
              La sourate {surah.name} ({surah.arabic}) sera disponible dans une prochaine mise à jour.
            </p>
            <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-left">
              <p className="text-emerald-400 text-sm font-medium mb-1">📱 En attendant</p>
              <p className="text-slate-400 text-xs">
                Cette sourate contient {surah.verses} versets. Consultez la sourate Al-Fatiha, Al-Kahf, Ya-Sin, Ar-Rahman, Al-Mulk, Al-Ikhlas, Al-Falaq, An-Nas et Al-Qadr disponibles intégralement.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
