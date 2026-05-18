import React, { useState, useEffect } from 'react';
import { MapPin, Bell, ChevronRight, Star, Moon, Sun, Sunrise, Sunset } from 'lucide-react';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import IslamicPattern from '../components/IslamicPattern';
import { HADITHS } from '../data/hadiths';
import { MORNING_DHIKR } from '../data/dhikr';

const DAILY_VERSES = [
  { arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", french: "Quiconque craint Allah, Il lui trouvera une issue.", ref: "Coran 65:2" },
  { arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", french: "Certes, avec la difficulté vient la facilité.", ref: "Coran 94:6" },
  { arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ", french: "Ne désespérez pas de la miséricorde d'Allah.", ref: "Coran 12:87" },
  { arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", french: "Allah nous suffit, et Il est le meilleur Garant.", ref: "Coran 3:173" },
  { arabic: "وَبَشِّرِ الصَّابِرِينَ", french: "Et annonce la bonne nouvelle aux endurants.", ref: "Coran 2:155" },
  { arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", french: "Certes, Allah est avec les endurants.", ref: "Coran 2:153" },
  { arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", french: "Car avec la difficulté vient la facilité.", ref: "Coran 94:5" },
];

const ISLAMIC_MONTHS = ['Muharram', 'Safar', 'Rabi Al-Awwal', 'Rabi Ath-Thani', 'Jumada Al-Ula', 'Jumada Ath-Thaniya', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhul Qa\'da', 'Dhul Hijja'];

function getIslamicDate() {
  const now = new Date();
  const jd = Math.floor((now.getTime() / 86400000) + 2440587.5);
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const month = Math.floor((24 * l3) / 709);
  const day = l3 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { day, month: month - 1, year };
}

const DAYS_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

const PRAYER_ICONS = {
  fajr: { icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-500/10', label: 'Fajr', arabic: 'الفجر' },
  sunrise: { icon: Sunrise, color: 'text-orange-400', bg: 'bg-orange-500/10', label: 'Chourouk', arabic: 'الشروق' },
  dhuhr: { icon: Sun, color: 'text-yellow-400', bg: 'bg-yellow-500/10', label: 'Dhuhr', arabic: 'الظهر' },
  asr: { icon: Sun, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Asr', arabic: 'العصر' },
  maghrib: { icon: Sunset, color: 'text-rose-400', bg: 'bg-rose-500/10', label: 'Maghrib', arabic: 'المغرب' },
  isha: { icon: Moon, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Isha', arabic: 'العشاء' },
};

export default function Home({ onNavigate }) {
  const { times, loading, nextPrayer } = usePrayerTimes();
  const [now, setNow] = useState(new Date());
  const [verseIdx] = useState(() => new Date().getDate() % DAILY_VERSES.length);
  const [hadithIdx] = useState(() => new Date().getDate() % HADITHS.length);
  const islamicDate = getIslamicDate();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const verse = DAILY_VERSES[verseIdx];
  const hadith = HADITHS[hadithIdx];

  return (
    <div className="page-container gradient-emerald pattern-bg">
      {/* Header */}
      <div className="relative overflow-hidden">
        <IslamicPattern />
        <div className="relative z-10 px-5 pt-14 pb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-1">
                <span>☪</span>
                <span>Islam+</span>
              </div>
              <h1 className="text-2xl font-bold text-white">
                {DAYS_FR[now.getDay()]}, {now.getDate()} {MONTHS_FR[now.getMonth()]}
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {islamicDate.day} {ISLAMIC_MONTHS[islamicDate.month]} {islamicDate.year} H
              </p>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Bell size={18} className="text-slate-400" />
            </button>
          </div>

          {/* Next Prayer */}
          {nextPrayer && (
            <div className="bg-emerald-600/20 border border-emerald-500/30 rounded-2xl p-4">
              <p className="text-emerald-400 text-xs font-medium mb-1">Prochaine prière</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white text-xl font-bold">{nextPrayer.name}</span>
                  <span className="text-emerald-300 text-sm ml-2 font-arabic">{nextPrayer.arabic}</span>
                </div>
                <span className="text-emerald-300 text-2xl font-bold">{nextPrayer.time}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Prayer Times Grid */}
      <div className="px-5 mb-6">
        <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-emerald-500 rounded-full inline-block" />
          Horaires du jour
        </h2>
        {loading ? (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : times ? (
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(PRAYER_ICONS).map(([key, { icon: Icon, color, bg, label, arabic }]) => (
              <div key={key} className={`${bg} border border-white/5 rounded-xl p-3 ${nextPrayer?.name === label ? 'ring-1 ring-emerald-500/50' : ''}`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={14} className={color} />
                  <span className="text-slate-400 text-xs">{label}</span>
                </div>
                <p className="text-white font-bold text-base">{times[key] || '—'}</p>
                <p className={`text-xs font-arabic ${color}`}>{arabic}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Daily Verse */}
      <div className="px-5 mb-6">
        <div className="card-gold p-5 relative overflow-hidden">
          <div className="absolute top-3 right-3 text-yellow-500/30 text-5xl font-arabic">❝</div>
          <p className="text-yellow-400 text-xs font-medium mb-3 flex items-center gap-1.5">
            <Star size={12} fill="currentColor" />
            Verset du jour
          </p>
          <p className="arabic-verse text-white text-2xl mb-3 leading-relaxed text-right">{verse.arabic}</p>
          <p className="text-slate-300 text-sm italic mb-2">"{verse.french}"</p>
          <p className="text-yellow-500/70 text-xs">{verse.ref}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mb-6">
        <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-emerald-500 rounded-full inline-block" />
          Accès rapide
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <QuickCard
            icon="📿"
            title="Dhikr du matin"
            subtitle={`${MORNING_DHIKR.length} invocations`}
            color="from-emerald-600/20 to-emerald-800/20"
            border="border-emerald-500/20"
            onClick={() => onNavigate('dhikr')}
          />
          <QuickCard
            icon="📖"
            title="Al-Fatiha"
            subtitle="7 versets"
            color="from-blue-600/20 to-blue-800/20"
            border="border-blue-500/20"
            onClick={() => onNavigate('quran')}
          />
          <QuickCard
            icon="☀️"
            title="Sunnas du jour"
            subtitle="Vivre la Sunnah"
            color="from-amber-600/20 to-amber-800/20"
            border="border-amber-500/20"
            onClick={() => onNavigate('sunnas')}
          />
          <QuickCard
            icon="🤲"
            title="Duas"
            subtitle="15 invocations"
            color="from-purple-600/20 to-purple-800/20"
            border="border-purple-500/20"
            onClick={() => onNavigate('duas')}
          />
        </div>
      </div>

      {/* Hadith du jour */}
      <div className="px-5 mb-6">
        <div className="card-glass p-5">
          <p className="text-emerald-400 text-xs font-medium mb-3 flex items-center gap-1.5">
            <span>💬</span>
            Hadith du jour
          </p>
          <p className="arabic-verse text-white text-lg mb-3 leading-relaxed text-right">{hadith.arabic}</p>
          <p className="text-slate-300 text-sm italic mb-2">"{hadith.french}"</p>
          <p className="text-slate-500 text-xs">Narré par {hadith.narrator}</p>
          <button
            className="mt-3 text-emerald-400 text-xs flex items-center gap-1 hover:text-emerald-300 transition-colors"
            onClick={() => onNavigate('hadiths')}
          >
            Voir plus de hadiths <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 99 Names shortcut */}
      <div className="px-5 mb-6">
        <button
          onClick={() => onNavigate('names99')}
          className="w-full card-glass p-4 flex items-center justify-between group hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-xl">
              ☪️
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Les 99 Noms d'Allah</p>
              <p className="text-slate-400 text-xs">Connaître Allah à travers Ses attributs</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
        </button>
      </div>
    </div>
  );
}

function QuickCard({ icon, title, subtitle, color, border, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-br ${color} border ${border} rounded-2xl p-4 text-left active:scale-95 transition-all duration-200`}
    >
      <span className="text-2xl mb-2 block">{icon}</span>
      <p className="text-white font-semibold text-sm">{title}</p>
      <p className="text-slate-400 text-xs mt-0.5">{subtitle}</p>
    </button>
  );
}
