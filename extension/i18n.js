// UI strings in the languages OGame is played in. Picked to match the game's own UI language.
var OGW_STRINGS = {
  en: { metal: 'Metal', crystal: 'Crystal', deuterium: 'Deuterium', readyIn: 'Resources ready in', enough: 'Enough resources', cant: "Can't accumulate", storageSmall: 'storage too small', storage: 'storage', noProd: 'no production', ready: 'ready', title: 'Resource accumulation', readyAt: 'Ready at' },
  de: { metal: 'Metall', crystal: 'Kristall', deuterium: 'Deuterium', readyIn: 'Ressourcen verfügbar in', enough: 'Genug Ressourcen', cant: 'Nicht erreichbar', storageSmall: 'Speicher zu klein', storage: 'Speicher', noProd: 'keine Produktion', ready: 'bereit', title: 'Ressourcenansammlung', readyAt: 'Bereit um' },
  fr: { metal: 'Métal', crystal: 'Cristal', deuterium: 'Deutérium', readyIn: 'Ressources prêtes dans', enough: 'Ressources suffisantes', cant: 'Impossible à accumuler', storageSmall: 'stockage insuffisant', storage: 'stockage', noProd: 'aucune production', ready: 'prêt', title: 'Accumulation des ressources', readyAt: 'Prêt à' },
  es: { metal: 'Metal', crystal: 'Cristal', deuterium: 'Deuterio', readyIn: 'Recursos listos en', enough: 'Recursos suficientes', cant: 'No se puede acumular', storageSmall: 'almacén demasiado pequeño', storage: 'almacén', noProd: 'sin producción', ready: 'listo', title: 'Acumulación de recursos', readyAt: 'Listo a las' },
  it: { metal: 'Metallo', crystal: 'Cristallo', deuterium: 'Deuterio', readyIn: 'Risorse pronte tra', enough: 'Risorse sufficienti', cant: 'Impossibile accumulare', storageSmall: 'deposito troppo piccolo', storage: 'deposito', noProd: 'nessuna produzione', ready: 'pronto', title: 'Accumulo risorse', readyAt: 'Pronto alle' },
  pl: { metal: 'Metal', crystal: 'Kryształ', deuterium: 'Deuter', readyIn: 'Surowce gotowe za', enough: 'Wystarczy surowców', cant: 'Nie da się uzbierać', storageSmall: 'za mały magazyn', storage: 'magazyn', noProd: 'brak produkcji', ready: 'gotowe', title: 'Gromadzenie surowców', readyAt: 'Gotowe o' },
  pt: { metal: 'Metal', crystal: 'Cristal', deuterium: 'Deutério', readyIn: 'Recursos prontos em', enough: 'Recursos suficientes', cant: 'Impossível acumular', storageSmall: 'armazém pequeno demais', storage: 'armazém', noProd: 'sem produção', ready: 'pronto', title: 'Acumulação de recursos', readyAt: 'Pronto às' },
  ru: { metal: 'Металл', crystal: 'Кристалл', deuterium: 'Дейтерий', readyIn: 'Накопится через', enough: 'Ресурсов хватает', cant: 'Не накопить', storageSmall: 'мало хранилища', storage: 'хранилище', noProd: 'нет добычи', ready: 'есть', title: 'Накопление ресурсов', readyAt: 'Готово к' },
  tr: { metal: 'Metal', crystal: 'Kristal', deuterium: 'Deuterium', readyIn: 'Kaynaklar hazır', enough: 'Kaynaklar yeterli', cant: 'Biriktirilemez', storageSmall: 'depo çok küçük', storage: 'depo', noProd: 'üretim yok', ready: 'hazır', title: 'Kaynak birikimi', readyAt: 'Hazır olma' },
  nl: { metal: 'Metaal', crystal: 'Kristal', deuterium: 'Deuterium', readyIn: 'Grondstoffen klaar over', enough: 'Genoeg grondstoffen', cant: 'Niet te verzamelen', storageSmall: 'opslag te klein', storage: 'opslag', noProd: 'geen productie', ready: 'klaar', title: 'Grondstoffen verzamelen', readyAt: 'Klaar om' },
  cs: { metal: 'Kov', crystal: 'Krystaly', deuterium: 'Deuterium', readyIn: 'Suroviny budou za', enough: 'Dost surovin', cant: 'Nelze nashromáždit', storageSmall: 'příliš malý sklad', storage: 'sklad', noProd: 'žádná produkce', ready: 'hotovo', title: 'Hromadění surovin', readyAt: 'Hotovo v' },
  sk: { metal: 'Kov', crystal: 'Kryštály', deuterium: 'Deutérium', readyIn: 'Suroviny budú o', enough: 'Dosť surovín', cant: 'Nedá sa nazbierať', storageSmall: 'príliš malý sklad', storage: 'sklad', noProd: 'žiadna produkcia', ready: 'hotovo', title: 'Zhromažďovanie surovín', readyAt: 'Hotovo o' },
  hu: { metal: 'Fém', crystal: 'Kristály', deuterium: 'Deutérium', readyIn: 'Nyersanyag kész', enough: 'Elég nyersanyag', cant: 'Nem gyűjthető össze', storageSmall: 'túl kicsi raktár', storage: 'raktár', noProd: 'nincs termelés', ready: 'kész', title: 'Nyersanyag-gyűjtés', readyAt: 'Kész ekkor' },
  ro: { metal: 'Metal', crystal: 'Cristal', deuterium: 'Deuteriu', readyIn: 'Resurse gata în', enough: 'Resurse suficiente', cant: 'Nu se pot acumula', storageSmall: 'depozit prea mic', storage: 'depozit', noProd: 'fără producție', ready: 'gata', title: 'Acumulare resurse', readyAt: 'Gata la' },
  el: { metal: 'Μέταλλο', crystal: 'Κρύσταλλο', deuterium: 'Δευτέριο', readyIn: 'Πόροι έτοιμοι σε', enough: 'Αρκετοί πόροι', cant: 'Δεν συγκεντρώνονται', storageSmall: 'πολύ μικρή αποθήκη', storage: 'αποθήκη', noProd: 'καμία παραγωγή', ready: 'έτοιμο', title: 'Συγκέντρωση πόρων', readyAt: 'Έτοιμο στις' },
  da: { metal: 'Metal', crystal: 'Krystal', deuterium: 'Deuterium', readyIn: 'Ressourcer klar om', enough: 'Nok ressourcer', cant: 'Kan ikke samles', storageSmall: 'lager for lille', storage: 'lager', noProd: 'ingen produktion', ready: 'klar', title: 'Ressourceopsamling', readyAt: 'Klar kl.' },
  sv: { metal: 'Metall', crystal: 'Kristall', deuterium: 'Deuterium', readyIn: 'Resurser klara om', enough: 'Tillräckligt med resurser', cant: 'Kan inte samlas', storageSmall: 'för litet lager', storage: 'lager', noProd: 'ingen produktion', ready: 'klar', title: 'Resursinsamling', readyAt: 'Klar kl.' },
  hr: { metal: 'Metal', crystal: 'Kristal', deuterium: 'Deuterij', readyIn: 'Resursi spremni za', enough: 'Dovoljno resursa', cant: 'Ne može se skupiti', storageSmall: 'premalo skladište', storage: 'skladište', noProd: 'nema proizvodnje', ready: 'spremno', title: 'Skupljanje resursa', readyAt: 'Spremno u' }
};

// OGame server/country codes that differ from the language code.
var OGW_LANG_ALIASES = { us: 'en', uk: 'en', br: 'pt', ar: 'es', mx: 'es', cz: 'cs', gr: 'el', dk: 'da', se: 'sv', ba: 'hr', yu: 'hr' };

// Native names for the language picker in the popup.
var OGW_LANG_NAMES = { en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', it: 'Italiano', pl: 'Polski', pt: 'Português', ru: 'Русский', tr: 'Türkçe', nl: 'Nederlands', cs: 'Čeština', sk: 'Slovenčina', hu: 'Magyar', ro: 'Română', el: 'Ελληνικά', da: 'Dansk', sv: 'Svenska', hr: 'Hrvatski' };

// override: language chosen by the user ('auto' or empty = detect).
function ogwDetectLang(override) {
  if (override && OGW_STRINGS[override]) return override;
  var candidates = [];
  var meta = document.querySelector('meta[name="ogame-language"]');
  if (meta) candidates.push(meta.getAttribute('content'));
  var m = location.hostname.match(/^s\d+-([a-z]{2})\./);
  if (m) candidates.push(m[1]);
  candidates.push(document.documentElement.lang, navigator.language);
  for (var i = 0; i < candidates.length; i++) {
    var c = String(candidates[i] || '').toLowerCase().slice(0, 2);
    c = OGW_LANG_ALIASES[c] || c;
    if (OGW_STRINGS[c]) return c;
  }
  return 'en';
}
