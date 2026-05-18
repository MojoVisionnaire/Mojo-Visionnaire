export const BOOKS = [
  {
    id: 1,
    title: "Le Jardin des Vertueux",
    arabicTitle: "رياض الصالحين",
    author: "Imam An-Nawawi",
    category: "Hadiths",
    description: "Un chef-d'œuvre de la littérature islamique regroupant des hadiths sur l'éthique, les adorations et les bonnes manières du Musulman.",
    pages: 1456,
    color: "emerald",
    icon: "🌿"
  },
  {
    id: 2,
    title: "La Forteresse du Musulman",
    arabicTitle: "حصن المسلم",
    author: "Sa'id ibn Ali Al-Qahtani",
    category: "Dhikr & Dua",
    description: "Invocations et dhikrs tirés du Coran et de la Sunna pour toutes les occasions de la vie quotidienne.",
    pages: 226,
    color: "blue",
    icon: "🏰"
  },
  {
    id: 3,
    title: "Les Fondements de la Foi",
    arabicTitle: "أصول الإيمان",
    author: "Sheikh Ibn Baz",
    category: "Aqida",
    description: "Une explication claire des piliers de la foi islamique: la croyance en Allah, les anges, les livres, les messagers, le Jour dernier et le destin.",
    pages: 156,
    color: "purple",
    icon: "📖"
  },
  {
    id: 4,
    title: "Le Don Précieux",
    arabicTitle: "تحفة الأطفال",
    author: "Sheikh Sulayman Al-Jamzuri",
    category: "Tajwid",
    description: "Poème classique sur les règles du Tajwid pour la bonne récitation du Coran sacré.",
    pages: 64,
    color: "gold",
    icon: "💎"
  },
  {
    id: 5,
    title: "Les Trois Principes Fondamentaux",
    arabicTitle: "الأصول الثلاثة",
    author: "Sheikh Muhammad ibn Abd Al-Wahhab",
    category: "Aqida",
    description: "Qui est ton Seigneur? Quelle est ta religion? Qui est ton Prophète? Les trois questions fondamentales pour tout Musulman.",
    pages: 98,
    color: "red",
    icon: "📚"
  },
  {
    id: 6,
    title: "Vie du Prophète Muhammad ﷺ",
    arabicTitle: "السيرة النبوية",
    author: "Ibn Hisham",
    category: "Sira",
    description: "La biographie du Prophète Muhammad (ﷺ), sa vie, ses batailles, sa moralité et ses enseignements.",
    pages: 1298,
    color: "emerald",
    icon: "⭐"
  },
  {
    id: 7,
    title: "Le Livre du Tawhid",
    arabicTitle: "كتاب التوحيد",
    author: "Sheikh Muhammad ibn Abd Al-Wahhab",
    category: "Aqida",
    description: "Une œuvre fondamentale sur le monothéisme islamique, l'unicité d'Allah et ce qui le contredit.",
    pages: 312,
    color: "blue",
    icon: "☝️"
  },
  {
    id: 8,
    title: "Le Traité du Ramadan",
    arabicTitle: "رسالة في أحكام الصيام",
    author: "Ibn Uthaymeen",
    category: "Fiqh",
    description: "Tout ce qu'il faut savoir sur le jeûne du Ramadan: ses règles, ses conditions, et comment le mieux vivre.",
    pages: 186,
    color: "purple",
    icon: "🌙"
  },
];

export const BOOK_CATEGORIES = ["Tous", "Hadiths", "Dhikr & Dua", "Aqida", "Tajwid", "Sira", "Fiqh"];

export const ARTICLES = [
  {
    id: 1,
    title: "Les 5 Pilliers de l'Islam",
    category: "Fondements",
    readTime: "8 min",
    content: `Les cinq piliers de l'Islam sont les fondements sur lesquels repose la religion islamique. Ils constituent les actes d'adoration obligatoires pour chaque musulman.

**1. La Shahada (Témoignage de foi)**
"Je témoigne qu'il n'y a de divinité qu'Allah et je témoigne que Muhammad est le Messager d'Allah."
C'est l'acte fondateur qui fait entrer dans l'Islam.

**2. La Salat (Prière)**
Cinq prières obligatoires par jour: Fajr, Dhuhr, Asr, Maghrib, Isha. La prière est le pilier de la religion.

**3. La Zakat (Aumône obligatoire)**
Donner 2,5% de sa richesse accumulée aux pauvres et aux nécessiteux chaque année.

**4. Le Sawm (Jeûne du Ramadan)**
Jeûner pendant tout le mois de Ramadan, du lever au coucher du soleil.

**5. Le Hajj (Pèlerinage à La Mecque)**
S'y rendre au moins une fois dans sa vie si on en a les moyens physiques et financiers.`,
    icon: "☪️"
  },
  {
    id: 2,
    title: "Les 6 Piliers de la Foi (Iman)",
    category: "Aqida",
    readTime: "10 min",
    content: `La foi islamique repose sur six piliers fondamentaux mentionnés dans le hadith de Jibril.

**1. La croyance en Allah**
Croire en Son existence, Son unicité (Tawhid), Ses noms et attributs parfaits.

**2. La croyance en les Anges**
Croire qu'Allah a créé des anges à partir de lumière qui L'adorent continuellement.

**3. La croyance en les Livres révélés**
Croire en la Torah, les Psaumes, l'Évangile et le Coran, le dernier et le plus complet.

**4. La croyance en les Prophètes et Messagers**
Croire en tous les prophètes, d'Adam à Muhammad (ﷺ), le dernier d'entre eux.

**5. La croyance au Jour dernier**
Croire en la Résurrection, le Jugement, le Paradis et l'Enfer.

**6. La croyance au Destin (Qadar)**
Croire qu'Allah sait tout ce qui était, est et sera, et que tout se passe par Sa volonté.`,
    icon: "💫"
  },
  {
    id: 3,
    title: "Comment accomplir la Salat",
    category: "Pratique",
    readTime: "15 min",
    content: `La Salat est le pilier central de l'Islam. Voici les étapes de la prière.

**Conditions préalables:**
- Être en état de pureté (Wudhu)
- Couvrir la 'awra (parties intimes)
- Faire face à la Qibla (direction de La Mecque)
- L'intention (Niyya)

**Les étapes de la prière:**
1. Takbirat Al-Ihram: lever les mains et dire "Allahu Akbar"
2. La Fatiha et une autre sourate en position debout
3. Le Ruku': s'incliner en disant "Subhana Rabbiyal Azim"
4. Le I'tidal: se relever en disant "Sami'a Allahu liman hamidah"
5. Le Sujud: se prosterner en disant "Subhana Rabbiyal A'la"
6. S'asseoir entre les deux prosternations
7. Le Tashahhud et les salutations finales

**Les prières et leurs rak'as:**
- Fajr: 2 rak'as
- Dhuhr: 4 rak'as
- Asr: 4 rak'as
- Maghrib: 3 rak'as
- Isha: 4 rak'as`,
    icon: "🕌"
  },
  {
    id: 4,
    title: "Les Vertus du Coran",
    category: "Coran",
    readTime: "7 min",
    content: `Le Coran est la Parole d'Allah révélée au Prophète Muhammad (ﷺ). Sa récitation et son étude sont parmi les meilleures adorations.

**Vertus de la récitation:**
"Récitez le Coran car il viendra le Jour du Jugement comme intercesseur pour ses compagnons." (Muslim)

"La meilleure adoration de ma communauté est la récitation du Coran." (Baihaqi)

**Vertus de l'apprentissage:**
"Le meilleur d'entre vous est celui qui apprend le Coran et l'enseigne." (Bukhari)

**Sourates particulièrement vertueuses:**
- Al-Fatiha: la Mère du Livre
- Al-Baqara: protège de Shaytan
- Al-Kahf: protège de la Fitna
- Al-Mulk: protège du châtiment du tombeau
- Al-Ikhlas: équivaut à un tiers du Coran
- Al-Falaq et An-Nas: les deux protecteurs`,
    icon: "📖"
  },
];
