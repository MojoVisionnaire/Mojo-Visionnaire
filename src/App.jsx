import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Quran from './pages/Quran';
import Dhikr from './pages/Dhikr';
import Sunnas from './pages/Sunnas';
import Library from './pages/Library';

const PAGES = {
  home: Home,
  quran: Quran,
  dhikr: Dhikr,
  sunnas: Sunnas,
  library: Library,
};

export default function App() {
  const [page, setPage] = useState('home');

  const Page = PAGES[page] || Home;

  return (
    <div className="max-w-md mx-auto min-h-screen relative">
      <div className="animate-fade-in">
        <Page onNavigate={setPage} />
      </div>
      <BottomNav active={page} onChange={setPage} />
    </div>
  );
}
