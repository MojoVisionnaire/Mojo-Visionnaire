export const HADITH_COLLECTIONS = [
  {
    id: "bukhari",
    name: "Sahih Al-Bukhari",
    arabic: "صحيح البخاري",
    description: "La collection la plus authentique de hadiths, compilée par l'imam Al-Bukhari",
    color: "emerald"
  },
  {
    id: "muslim",
    name: "Sahih Muslim",
    arabic: "صحيح مسلم",
    description: "Deuxième collection la plus authentique, compilée par l'imam Muslim",
    color: "blue"
  },
  {
    id: "tirmidhi",
    name: "Jami' At-Tirmidhi",
    arabic: "جامع الترمذي",
    description: "Collection importante compilée par l'imam At-Tirmidhi",
    color: "purple"
  },
  {
    id: "nawawi",
    name: "40 Hadiths An-Nawawi",
    arabic: "الأربعون النووية",
    description: "Les 40 hadiths fondamentaux compilés par l'imam An-Nawawi",
    color: "gold"
  }
];

export const HADITHS = [
  {
    id: 1,
    collection: "bukhari",
    number: "1",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    french: "Les actions ne valent que par les intentions, et chaque homme n'obtiendra que ce qu'il aura eu l'intention de faire.",
    narrator: "Omar ibn Al-Khattab (qu'Allah soit satisfait de lui)",
    category: "Intentions"
  },
  {
    id: 2,
    collection: "bukhari",
    number: "8",
    arabic: "بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ",
    french: "L'Islam est fondé sur cinq piliers: témoigner qu'il n'y a de divinité qu'Allah et que Muhammad est Son Messager, accomplir la prière, acquitter la zakat, faire le pèlerinage et jeûner le Ramadan.",
    narrator: "Ibn Omar (qu'Allah soit satisfait d'eux)",
    category: "Pilliers de l'Islam"
  },
  {
    id: 3,
    collection: "muslim",
    number: "2553",
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    french: "Le Musulman est celui dont les autres Musulmans sont préservés de sa langue et de sa main.",
    narrator: "Abdullah ibn Amr (qu'Allah soit satisfait d'eux)",
    category: "Comportement"
  },
  {
    id: 4,
    collection: "bukhari",
    number: "6018",
    arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    french: "Aucun de vous ne croit vraiment tant qu'il n'aime pas pour son frère ce qu'il aime pour lui-même.",
    narrator: "Anas ibn Malik (qu'Allah soit satisfait de lui)",
    category: "Foi"
  },
  {
    id: 5,
    collection: "nawawi",
    number: "1",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
    french: "Les actes ne valent que par les intentions.",
    narrator: "Omar ibn Al-Khattab (qu'Allah soit satisfait de lui)",
    category: "Intentions"
  },
  {
    id: 6,
    collection: "nawawi",
    number: "2",
    arabic: "الإِسْلاَمُ أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
    french: "L'Islam, c'est de témoigner qu'il n'y a de divinité qu'Allah et que Muhammad est Son messager, d'accomplir la prière, de donner la zakat, de jeûner le Ramadan et d'effectuer le pèlerinage à la Maison si tu en as la capacité.",
    narrator: "Omar ibn Al-Khattab (qu'Allah soit satisfait de lui)",
    category: "Pilliers de l'Islam"
  },
  {
    id: 7,
    collection: "tirmidhi",
    number: "1987",
    arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ",
    french: "Crains Allah où que tu sois; fais suivre la mauvaise action d'une bonne, elle l'effacera; et traite les gens avec de bonnes moeurs.",
    narrator: "Mouadh ibn Jabal (qu'Allah soit satisfait de lui)",
    category: "Piété"
  },
  {
    id: 8,
    collection: "muslim",
    number: "2699",
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    french: "Quiconque emprunte un chemin à la recherche du savoir, Allah lui facilite par cela un chemin vers le Paradis.",
    narrator: "Abu Hourayra (qu'Allah soit satisfait de lui)",
    category: "Savoir"
  },
  {
    id: 9,
    collection: "bukhari",
    number: "6057",
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    french: "Que celui qui croit en Allah et au Jour dernier dise une bonne chose ou se taise.",
    narrator: "Abu Hourayra (qu'Allah soit satisfait de lui)",
    category: "Parole"
  },
  {
    id: 10,
    collection: "nawawi",
    number: "17",
    arabic: "إِنَّ اللَّهَ كَتَبَ الإِحْسَانَ عَلَى كُلِّ شَيْءٍ",
    french: "En vérité, Allah a prescrit l'excellence (ihsân) en toute chose.",
    narrator: "Shaddad ibn Aws (qu'Allah soit satisfait de lui)",
    category: "Excellence"
  },
  {
    id: 11,
    collection: "bukhari",
    number: "5765",
    arabic: "لاَ ضَرَرَ وَلاَ ضِرَارَ",
    french: "Pas de dommage ni de réciprocité dans le dommage.",
    narrator: "Ibn Abbas (qu'Allah soit satisfait d'eux)",
    category: "Règles générales"
  },
  {
    id: 12,
    collection: "muslim",
    number: "1631",
    arabic: "إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ مِنْ صَدَقَةٍ جَارِيَةٍ وَعِلْمٍ يُنْتَفَعُ بِهِ وَوَلَدٍ صَالِحٍ يَدْعُو لَهُ",
    french: "Quand l'être humain meurt, ses actes s'interrompent sauf pour trois choses: une aumône continue (sadaqa jâriya), un savoir dont on profite, et un enfant pieux qui prie pour lui.",
    narrator: "Abu Hourayra (qu'Allah soit satisfait de lui)",
    category: "Sadaqa Jariya"
  },
  {
    id: 13,
    collection: "bukhari",
    number: "2442",
    arabic: "الْمُسْلِمُ أَخُو الْمُسْلِمِ لاَ يَظْلِمُهُ وَلاَ يُسْلِمُهُ",
    french: "Le Musulman est le frère du Musulman: il ne lui fait pas de tort et ne l'abandonne pas.",
    narrator: "Ibn Omar (qu'Allah soit satisfait d'eux)",
    category: "Fraternité"
  },
  {
    id: 14,
    collection: "tirmidhi",
    number: "2516",
    arabic: "مَا مِنْ شَيْءٍ أَثْقَلُ فِي مِيزَانِ الْمُؤْمِنِ يَوْمَ الْقِيَامَةِ مِنْ حُسْنِ الْخُلُقِ",
    french: "Rien n'est plus lourd dans la balance du croyant au Jour du Jugement que la bonne moralité.",
    narrator: "Abu Ad-Darda (qu'Allah soit satisfait de lui)",
    category: "Moralité"
  },
  {
    id: 15,
    collection: "muslim",
    number: "55",
    arabic: "الدِّينُ النَّصِيحَةُ",
    french: "La religion, c'est la sincérité (nasiha).",
    narrator: "Tamim Ad-Dari (qu'Allah soit satisfait de lui)",
    category: "Religion"
  }
];
