import { useState, useEffect } from 'react';

function toRad(d) { return d * Math.PI / 180; }
function toDeg(r) { return r * 180 / Math.PI; }

function calcPrayerTimes(lat, lng, date) {
  const jd = julianDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const D = jd - 2451545.0;
  const g = (357.529 + 0.98560028 * D) % 360;
  const q = (280.459 + 0.98564736 * D) % 360;
  const L = (q + 1.915 * Math.sin(toRad(g)) + 0.020 * Math.sin(toRad(2 * g))) % 360;
  const e = 23.439 - 0.00000036 * D;
  const RA = toDeg(Math.atan2(Math.cos(toRad(e)) * Math.sin(toRad(L)), Math.cos(toRad(L)))) / 15;
  const decl = toDeg(Math.asin(Math.sin(toRad(e)) * Math.sin(toRad(L))));
  const EqT = q / 15 - ((RA + 24) % 24);
  const noon = 12 - lng / 15 - EqT;

  function hourAngle(angle) {
    const h = Math.acos(
      (Math.sin(toRad(angle)) - Math.sin(toRad(lat)) * Math.sin(toRad(decl))) /
      (Math.cos(toRad(lat)) * Math.cos(toRad(decl)))
    );
    return toDeg(h) / 15;
  }

  const asrH = toDeg(Math.atan(1 / (1 + Math.tan(toRad(Math.abs(lat - decl)))))) ;
  const asrAngle = toDeg(Math.acos(
    (Math.sin(toRad(90 - asrH)) - Math.sin(toRad(lat)) * Math.sin(toRad(decl))) /
    (Math.cos(toRad(lat)) * Math.cos(toRad(decl)))
  )) / 15;

  const fajr = noon - hourAngle(-18);
  const sunrise = noon - hourAngle(-0.833);
  const dhuhr = noon + 0.0667;
  const asr = noon + asrAngle;
  const maghrib = noon + hourAngle(-0.833);
  const isha = noon + hourAngle(-17);

  function fmt(h) {
    const total = ((h % 24) + 24) % 24;
    const hh = Math.floor(total);
    const mm = Math.floor((total - hh) * 60);
    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
  }

  return { fajr: fmt(fajr), sunrise: fmt(sunrise), dhuhr: fmt(dhuhr), asr: fmt(asr), maghrib: fmt(maghrib), isha: fmt(isha) };
}

function julianDate(y, m, d) {
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
}

export function usePrayerTimes() {
  const [times, setTimes] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextPrayer, setNextPrayer] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('islamplus_location');
    if (stored) {
      const loc = JSON.parse(stored);
      setLocation(loc);
      computeTimes(loc.lat, loc.lng);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          localStorage.setItem('islamplus_location', JSON.stringify(loc));
          setLocation(loc);
          computeTimes(loc.lat, loc.lng);
        },
        () => {
          const defaultLoc = { lat: 48.8566, lng: 2.3522 };
          setLocation(defaultLoc);
          computeTimes(defaultLoc.lat, defaultLoc.lng);
        }
      );
    } else {
      const defaultLoc = { lat: 48.8566, lng: 2.3522 };
      setLocation(defaultLoc);
      computeTimes(defaultLoc.lat, defaultLoc.lng);
    }
  }, []);

  function computeTimes(lat, lng) {
    const t = calcPrayerTimes(lat, lng, new Date());
    setTimes(t);
    setLoading(false);
    findNextPrayer(t);
  }

  function findNextPrayer(t) {
    const now = new Date();
    const curr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const prayers = [
      { name: 'Fajr', arabic: 'الفجر', time: t.fajr },
      { name: 'Dhuhr', arabic: 'الظهر', time: t.dhuhr },
      { name: 'Asr', arabic: 'العصر', time: t.asr },
      { name: 'Maghrib', arabic: 'المغرب', time: t.maghrib },
      { name: 'Isha', arabic: 'العشاء', time: t.isha },
    ];
    const next = prayers.find(p => p.time > curr) || prayers[0];
    setNextPrayer(next);
  }

  return { times, location, loading, nextPrayer };
}
