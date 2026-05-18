import React, { useState } from 'react';
import { Search, ChevronRight, BookOpen, ArrowLeft, Clock, Star } from 'lucide-react';
import { BOOKS, BOOK_CATEGORIES, ARTICLES } from '../data/library';
import { HADITHS, HADITH_COLLECTIONS } from '../data/hadiths';
import { DUAS, DUA_CATEGORIES } from '../data/duas';
import { NAMES_99 } from '../data/names99';

const TABS = [
  { id: 'articles', label: 'Articles', icon: '📄' },
  { id: 'books', label: 'Livres', icon: '📚' },
  { id: 'hadiths', label: 'Hadiths', icon: '💬' },
  { id: 'duas', label: 'Duas', icon: '🤲' },
  { id: 'names', label: '99 Noms', icon: '☪️' },
];

export default function Library() {
  const [tab, setTab] = useState('articles');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  if (selected?.type === 'article') {
    return <ArticleView article={selected.data} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="page-container bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 px-5 pt-14 pb-4">
        <h1 className="text-white text-xl font-bold mb-1">Bibliothèque Islamique</h1>
        <p className="text-slate-400 text-sm">المكتبة الإسلامية</p>

        {/* Search */}
        <div className="relative mt-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
          {TABS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => { setTab(id); setSearch(''); }}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                tab === id
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : 'bg-white/5 text-slate-400 border-white/5'
              }`}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-28">
        {tab === 'articles' && <ArticlesTab search={search} onSelect={a => setSelected({ type: 'article', data: a })} />}
        {tab === 'books' && <BooksTab search={search} />}
        {tab === 'hadiths' && <HadithsTab search={search} />}
        {tab === 'duas' && <DuasTab search={search} />}
        {tab === 'names' && <NamesTab search={search} />}
      </div>
    </div>
  );
}

function ArticlesTab({ search, onSelect }) {
  const filtered = ARTICLES.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="space-y-3 pt-4">
      {filtered.map(article => (
        <button
          key={article.id}
          onClick={() => onSelect(article)}
          className="w-full bg-white/3 border border-white/8 rounded-2xl p-4 text-left hover:bg-white/5 transition-colors group"
        >
          <div className="flex items-start gap-3">
            <span className="text-3xl flex-shrink-0">{article.icon}</span>
            <div className="flex-1">
              <span className="text-emerald-400 text-xs font-medium">{article.category}</span>
              <h3 className="text-white font-semibold mt-0.5">{article.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={12} className="text-slate-500" />
                <span className="text-slate-500 text-xs">{article.readTime} de lecture</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 mt-1" />
          </div>
        </button>
      ))}
    </div>
  );
}

function ArticleView({ article, onBack }) {
  const paragraphs = article.content.split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-lg border-b border-white/5 px-5 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-slate-400 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="text-white font-bold text-sm">{article.title}</p>
          <p className="text-slate-500 text-xs">{article.category} • {article.readTime}</p>
        </div>
      </div>
      <div className="px-5 pt-6 pb-28">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-5xl">{article.icon}</span>
          <h1 className="text-white text-2xl font-bold">{article.title}</h1>
        </div>
        <div className="space-y-4">
          {paragraphs.map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return (
                <h3 key={i} className="text-emerald-400 font-bold text-lg mt-6">
                  {para.replace(/\*\*/g, '')}
                </h3>
              );
            }
            if (para.includes('**')) {
              const parts = para.split(/(\*\*[^*]+\*\*)/g);
              return (
                <p key={i} className="text-slate-300 text-sm leading-relaxed">
                  {parts.map((part, j) =>
                    part.startsWith('**') && part.endsWith('**')
                      ? <strong key={j} className="text-white font-semibold">{part.replace(/\*\*/g, '')}</strong>
                      : part
                  )}
                </p>
              );
            }
            return <p key={i} className="text-slate-300 text-sm leading-relaxed">{para}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

function BooksTab({ search }) {
  const [category, setCategory] = useState('Tous');
  const filtered = BOOKS.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Tous' || b.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="pt-4">
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
        {BOOK_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
              category === cat
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-white/5 text-slate-400 border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3">
        {filtered.map(book => (
          <div key={book.id} className="bg-white/3 border border-white/8 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                {book.icon}
              </div>
              <div className="flex-1">
                <span className="text-emerald-400 text-xs">{book.category}</span>
                <h3 className="text-white font-semibold text-sm mt-0.5">{book.title}</h3>
                <p className="text-slate-400 text-xs">{book.arabicTitle}</p>
                <p className="text-slate-500 text-xs mt-0.5">Par {book.author}</p>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">{book.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HadithsTab({ search }) {
  const [collection, setCollection] = useState(null);
  const filtered = HADITHS.filter(h => {
    const matchSearch = h.french.toLowerCase().includes(search.toLowerCase()) ||
      h.arabic.includes(search);
    const matchColl = !collection || h.collection === collection;
    return matchSearch && matchColl;
  });

  return (
    <div className="pt-4">
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setCollection(null)}
          className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
            !collection ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-white/5 text-slate-400 border-white/5'
          }`}
        >
          Tous
        </button>
        {HADITH_COLLECTIONS.map(c => (
          <button
            key={c.id}
            onClick={() => setCollection(c.id)}
            className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
              collection === c.id ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-white/5 text-slate-400 border-white/5'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map(hadith => (
          <div key={hadith.id} className="bg-white/3 border border-white/8 rounded-2xl p-4">
            <p className="arabic-verse text-white text-lg leading-relaxed text-right mb-3">{hadith.arabic}</p>
            <p className="text-slate-300 text-sm italic mb-2">"{hadith.french}"</p>
            <div className="flex items-center justify-between">
              <p className="text-slate-500 text-xs">{hadith.narrator}</p>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-500/20">
                {HADITH_COLLECTIONS.find(c => c.id === hadith.collection)?.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DuasTab({ search }) {
  const [category, setCategory] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const filtered = DUAS.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.french.toLowerCase().includes(search.toLowerCase());
    const matchCat = !category || d.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="pt-4">
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setCategory(null)}
          className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
            !category ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-white/5 text-slate-400 border-white/5'
          }`}
        >
          Toutes
        </button>
        {DUA_CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
              category === c.id ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-white/5 text-slate-400 border-white/5'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map(dua => (
          <div
            key={dua.id}
            className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === dua.id ? null : dua.id)}
              className="w-full p-4 text-left flex items-center justify-between"
            >
              <div>
                <p className="text-white font-medium text-sm">{dua.title}</p>
                <p className="text-slate-500 text-xs mt-0.5">{dua.source}</p>
              </div>
              <ChevronRight
                size={16}
                className={`text-slate-500 transition-transform ${expanded === dua.id ? 'rotate-90' : ''}`}
              />
            </button>
            {expanded === dua.id && (
              <div className="px-4 pb-4 pt-0 border-t border-white/5">
                <p className="arabic-verse text-white text-xl leading-loose text-right my-3">{dua.arabic}</p>
                {dua.transliteration && (
                  <p className="text-purple-400/70 text-xs italic mb-2">{dua.transliteration}</p>
                )}
                <p className="text-slate-300 text-sm">{dua.french}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function NamesTab({ search }) {
  const filtered = NAMES_99.filter(n =>
    n.french.toLowerCase().includes(search.toLowerCase()) ||
    n.transliteration.toLowerCase().includes(search.toLowerCase()) ||
    n.arabic.includes(search) ||
    String(n.number).includes(search)
  );

  return (
    <div className="pt-4">
      <p className="text-slate-400 text-sm mb-4 text-center">
        وَلِلَّهِ الأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا
      </p>
      <p className="text-slate-500 text-xs mb-4 text-center italic">
        "Allah possède les plus beaux noms, invoquez-Le par ces noms." (7:180)
      </p>
      <div className="grid grid-cols-2 gap-2">
        {filtered.map(name => (
          <div
            key={name.number}
            className="bg-white/3 border border-white/8 rounded-xl p-3 text-center"
          >
            <span className="text-emerald-400 text-xs font-bold">{name.number}.</span>
            <p className="arabic-verse text-white text-xl mt-1 mb-1">{name.arabic}</p>
            <p className="text-emerald-300 text-xs font-medium">{name.transliteration}</p>
            <p className="text-slate-400 text-xs mt-0.5">{name.french}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
