/* =========================================================
   Расходы — личное приложение учёта финансов
   Работает как сайт (Safari / экран «Домой») и как Telegram Mini App.
   Хранение: память телефона (+ Telegram CloudStorage внутри Telegram)
   ========================================================= */

const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  try { tg.setHeaderColor('#0d0e10'); tg.setBackgroundColor('#0d0e10'); tg.setBottomBarColor?.('#0d0e10'); } catch (e) {}
}
const haptic = {
  tap: () => tg?.HapticFeedback?.impactOccurred('light'),
  select: () => tg?.HapticFeedback?.selectionChanged(),
  ok: () => tg?.HapticFeedback?.notificationOccurred('success'),
  err: () => tg?.HapticFeedback?.notificationOccurred('error'),
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ---------- Иконки ---------- */
const ICONS = {
  cart: '<circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L20 8H6"/>',
  cup: '<path d="M4 9h13v4a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3v3M12 3v3"/>',
  bus: '<rect x="5" y="3" width="14" height="15" rx="2"/><path d="M5 11h14M8 18v3M16 18v3"/>',
  home: '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>',
  repeat: '<path d="M4 12a8 8 0 0 1 14-5.3L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5.3L4 15"/><path d="M4 20v-5h5"/>',
  spark: '<path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  dots: '<circle cx="6" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18" cy="12" r="1"/>',
  shirt: '<path d="M8.5 4L4 7l2 4 2-1v10h8V10l2 1 2-4-4.5-3a3.5 3.5 0 0 1-7 0z"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  book: '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/>',
  gift: '<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12"/><path d="M12 8C10 4 6.5 4 6.5 6.2S9.5 8 12 8c2.5 0 5.5.4 5.5-1.8S14 4 12 8z"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  tech: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  plane: '<path d="M21 4L3 11l7 3 3 7z"/><path d="M10 14l4-4"/>',
  tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
  chart: '<path d="M3 20h18M6 16v-5M11 16V6M16 16v-8M20 16v-3"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r=".6"/><circle cx="4.5" cy="12" r=".6"/><circle cx="4.5" cy="18" r=".6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21 20a6 6 0 0 0-4-5.6"/>',
  vault: '<rect x="3" y="4" width="18" height="15" rx="2.5"/><circle cx="12" cy="11.5" r="3.5"/><path d="M12 8v1M7 19v1.5M17 19v1.5"/>',
  wallet: '<path d="M4 7a2 2 0 0 1 2-2h11v4"/><rect x="3.5" y="7" width="17" height="13" rx="2.5"/><path d="M16 13.5h2"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 10h18M7 15h4"/>',
  cash: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v4M18 10v4"/>',
  swap: '<path d="M4 8h14l-3.5-3.5M20 16H6l3.5 3.5"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".9"/>',
  bolt: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
  sheet: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M4 15h16M10 3v18"/>',
  trash: '<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v5M14 11v5"/>',
  x: '<path d="M7 7l10 10M17 7L7 17"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chevL: '<path d="M15 6l-6 6 6 6"/>',
  chevR: '<path d="M9 6l6 6-6 6"/>',
  up: '<path d="M7 14l5-5 5 5"/>',
  down: '<path d="M7 10l5 5 5-5"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  note: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
};
const icon = (name, size = 20) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.tag}</svg>`;

/* ---------- Категории ---------- */
// основные траты — видны сразу в сетке «+»
const CATEGORIES = [
  { id: 'food',      name: 'Продукты',  color: '#c9b98f', icon: 'cart' },
  { id: 'cafe',      name: 'Кафе',      color: '#b48fa8', icon: 'cup' },
  { id: 'transport', name: 'Транспорт', color: '#8aa6c1', icon: 'bus' },
  { id: 'home',      name: 'Дом',       color: '#8fb996', icon: 'home' },
  { id: 'subs',      name: 'Подписки',  color: '#9a8fc9', icon: 'repeat' },
  { id: 'fun',       name: 'Досуг',     color: '#d98c74', icon: 'spark' },
  { id: 'health',    name: 'Здоровье',  color: '#7fb5b0', icon: 'heart' },
];
// дополнительные — внутри «Другое» (сюда же добавляются свои)
const EXTRA = [
  { id: 'clothes', name: 'Одежда',  color: '#a3a7c9', icon: 'shirt' },
  { id: 'phone',   name: 'Связь',   color: '#8fb0a6', icon: 'phone' },
  { id: 'study',   name: 'Учёба',   color: '#b9a37c', icon: 'book' },
  { id: 'gifts',   name: 'Подарки', color: '#c99595', icon: 'gift' },
  { id: 'beauty',  name: 'Уход',    color: '#c4a0b8', icon: 'drop' },
  { id: 'tech',    name: 'Техника', color: '#8b9db0', icon: 'tech' },
  { id: 'travel',  name: 'Поездки', color: '#9fb88a', icon: 'plane' },
  { id: 'other',   name: 'Прочее',  color: '#7a8088', icon: 'dots' },
];
const CUSTOM_COLORS = ['#b7a77f', '#8fa3b8', '#a891b5', '#93b39a', '#c29a86', '#87aeb0'];
let CAT = {};
const rebuildCat = () => CAT = Object.fromEntries([...CATEGORIES, ...EXTRA].map(c => [c.id, c]));
rebuildCat();
const isExtra = id => EXTRA.some(c => c.id === id);

// доходы
const INCOME_CATS = [
  { id: 'salary',   name: 'Зарплата',   color: '#8fb996', icon: 'wallet' },
  { id: 'stipend',  name: 'Стипендия',  color: '#7fb5b0', icon: 'book' },
  { id: 'side',     name: 'Подработка', color: '#9fb88a', icon: 'tech' },
  { id: 'gift_in',  name: 'Подарок',    color: '#c9b98f', icon: 'gift' },
  { id: 'refund',   name: 'Возврат',    color: '#8aa6c1', icon: 'repeat' },
  { id: 'in_other', name: 'Другое',     color: '#7a8088', icon: 'dots' },
];
const ICAT = Object.fromEntries(INCOME_CATS.map(c => [c.id, c]));
const TRANSFER_STYLE = { name: 'Перевод', color: '#878d96', icon: 'swap' };

const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const MONTHS_SHORT = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];
const MONTHS_GEN = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MONTHS_DAT = ['январю','февралю','марту','апрелю','маю','июню','июлю','августу','сентябрю','октябрю','ноябрю','декабрю'];
const MONTHS_PREP = ['январе','феврале','марте','апреле','мае','июне','июле','августе','сентябре','октябре','ноябре','декабре'];
const WEEKDAYS = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];

/* ---------- Утилиты ---------- */
const fmtNum = n => Math.round(n).toLocaleString('ru-RU');
const fmt = n => fmtNum(n) + ' ₽';
const fmtInput = n => n ? Math.round(Math.abs(n)).toLocaleString('ru-RU') : '';
const pad = n => String(n).padStart(2, '0');
const isoDate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const uid = () => Math.random().toString(36).slice(2, 10);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sum = (list, f = x => x.amount) => list.reduce((a, x) => a + f(x), 0);
function plural(n, forms) {
  n = Math.abs(n) % 100; const n1 = n % 10;
  if (n > 10 && n < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}
const pctText = p => p < 1 ? '<1%' : Math.round(p) + '%';
const daysIn = (y, m) => new Date(y, m + 1, 0).getDate();

const today = new Date(); today.setHours(0, 0, 0, 0);
const daysAgo = n => new Date(today.getTime() - n * 864e5);
const sameDay = (a, b) => isoDate(a) === isoDate(b);
const shortDate = d => `${d.getDate()} ${MONTHS_GEN[d.getMonth()]}`;
const curMonthNum = () => today.getFullYear() * 12 + today.getMonth();
function dayLabel(d) {
  if (sameDay(d, today)) return 'Сегодня';
  if (sameDay(d, daysAgo(1))) return 'Вчера';
  return `${shortDate(d)}, ${WEEKDAYS[d.getDay()]}`;
}

/* ---------- Данные ---------- */
const ACC_TYPES = [
  { id: 'card',    name: 'Карта',      icon: 'card' },
  { id: 'cash',    name: 'Наличные',   icon: 'cash' },
  { id: 'savings', name: 'Накопления', icon: 'vault' },
];
const ACC_TYPE = Object.fromEntries(ACC_TYPES.map(t => [t.id, t]));
const ACC_COLORS = ['#c9b98f', '#8fb996', '#8aa6c1', '#9a8fc9', '#b48fa8', '#7fb5b0', '#d98c74'];

// операции хранятся по месяцам: e2026_11 — траты, i2026_11 — доходы, t2026_11 — переводы
const ops = { exp: {}, inc: {}, tr: {} };
const PREFIX = { exp: 'e', inc: 'i', tr: 't' };
const okey = (kind, y, m) => `${PREFIX[kind]}${y}_${pad(m + 1)}`;
function opList(kind, y, m) {
  const k = okey(kind, y, m);
  return ops[kind][k] || (ops[kind][k] = []);
}
const getExpenses = (y, m) => opList('exp', y, m);
const getIncomes = (y, m) => opList('inc', y, m);
const getTransfers = (y, m) => opList('tr', y, m);
const allOps = () => [...Object.values(ops.exp), ...Object.values(ops.inc), ...Object.values(ops.tr)].flat();
const findOp = id => allOps().find(x => x.id === id);

const debts = [];             // dir: 'in' — мне должны, 'out' — я должен; acc — счёт (необязательно)
const accounts = [];
const recurring = [];         // регулярные платежи: { id, day, amount, cat, acc, note, last: '2026_11' }
const limits = {};            // лимиты на месяц: { cafe: 5000 }
let goal = null;              // цель: { name, target, acc }
const ACC = id => accounts.find(a => a.id === id);
const monthTag = (y, m) => `${y}_${pad(m + 1)}`;

/* ---------- Хранилище: сначала телефон, потом облако Telegram ----------
   Каждое изменение сразу пишется в память телефона (localStorage) — это мгновенно
   и работает без связи. Внутри Telegram затем отправляется в CloudStorage; если связь
   плохая — досылаем позже. У CloudStorage лимит 4096 символов на значение, поэтому
   большие значения режем на куски key_0, key_1 …; их количество хранится в "index". */
const LS = {
  get: k => { try { return localStorage.getItem('fin_' + k) ?? ''; } catch (e) { return ''; } },
  set: (k, v) => { try { localStorage.setItem('fin_' + k, v); } catch (e) {} },
  del: k => { try { localStorage.removeItem('fin_' + k); } catch (e) {} },
};
const cloud = (() => {
  const cs = tg?.CloudStorage && tg.isVersionAtLeast?.('6.9') ? tg.CloudStorage : null;
  if (!cs) return null;
  const call = fn => new Promise((res, rej) => {
    const t = setTimeout(() => rej(new Error('timeout')), 8000);
    fn((err, val) => { clearTimeout(t); err ? rej(err) : res(val); });
  });
  return {
    async get(keys) {
      const out = {};
      for (let i = 0; i < keys.length; i += 50) Object.assign(out, await call(cb => cs.getItems(keys.slice(i, i + 50), cb)));
      return out;
    },
    set: (k, v) => call(cb => cs.setItem(k, v, cb)),
    remove: keys => call(cb => cs.removeItems(keys, cb)),
  };
})();

const CHUNK = 4000;
let chunkIndex = {};
let saveChain = Promise.resolve();
const keysOf = idx => {
  const out = [];
  for (const [k, n] of Object.entries(idx)) if (k !== '_t') for (let i = 0; i < n; i++) out.push(`${k}_${i}`);
  return out;
};
const parseJSON = s => { try { return s ? JSON.parse(s) : null; } catch (e) { return null; } };

let offlineShown = false;
function markOffline() {
  LS.set('pending', '1');
  if (!offlineShown) { offlineShown = true; toast('Нет связи с Telegram — сохранено на телефоне'); }
}
async function pushAll() {
  for (const k of keysOf(chunkIndex)) await cloud.set(k, LS.get(k));
  await cloud.set('index', JSON.stringify(chunkIndex));
  LS.del('pending');
  if (offlineShown) { offlineShown = false; toast('Синхронизировано'); }
}
async function writeBig(key, value) {
  const parts = [];
  for (let i = 0; i < value.length; i += CHUNK) parts.push(value.slice(i, i + CHUNK));
  if (!parts.length) parts.push('');
  const old = chunkIndex[key] || 0;
  chunkIndex[key] = parts.length;
  chunkIndex._t = Date.now();

  parts.forEach((p, i) => LS.set(`${key}_${i}`, p));
  for (let i = parts.length; i < old; i++) LS.del(`${key}_${i}`);
  LS.set('index', JSON.stringify(chunkIndex));

  if (!cloud) return;
  try {
    if (LS.get('pending')) return await pushAll();
    for (let i = 0; i < parts.length; i++) await cloud.set(`${key}_${i}`, parts[i]);
    if (old > parts.length) {
      const extra = [];
      for (let i = parts.length; i < old; i++) extra.push(`${key}_${i}`);
      await cloud.remove(extra);
    }
    await cloud.set('index', JSON.stringify(chunkIndex));
  } catch (err) {
    console.error(err);
    markOffline();
  }
}
function persist(key, value) {
  saveChain = saveChain.then(() => writeBig(key, value)).catch(err => console.error(err));
  return saveChain;
}

// компактные форматы — чтобы влезало больше
const saveAccounts = () => persist('accounts', JSON.stringify(accounts.map(a => [a.id, a.name, a.type, a.color, a.balance])));
const saveDebts = () => persist('debts', JSON.stringify(debts.map(d => [d.id, d.name, d.amount, d.note, isoDate(d.date), d.closed ? 1 : 0, d.ts || 0, d.dir || 'in', d.acc || ''])));
const saveCats = () => persist('cats', JSON.stringify([...CATEGORIES, ...EXTRA].filter(c => c.custom).map(c => [c.id, c.name, c.color])));
const saveCatOrder = () => persist('catorder', JSON.stringify({ main: CATEGORIES.map(c => c.id), extra: EXTRA.map(c => c.id) }));
const saveRecurring = () => persist('recurring', JSON.stringify(recurring.map(r => [r.id, r.day, r.amount, r.cat, r.acc || '', r.note, r.last])));
const saveLimits = () => persist('limits', JSON.stringify(limits));
const saveGoal = () => persist('goal', JSON.stringify(goal ? [goal.name, goal.target, goal.acc || ''] : []));
function saveOps(kind, y, m) {
  const k = okey(kind, y, m);
  const list = ops[kind][k] || [];
  const rows = kind === 'tr'
    ? list.map(e => [e.id, e.date.getDate(), e.amount, e.from || '', e.to || '', e.note, e.ts || 0])
    : list.map(e => [e.id, e.date.getDate(), e.amount, e.cat, e.acc || '', e.note, e.ts || 0]);
  return persist(k, JSON.stringify(rows));
}

async function load() {
  const localIdx = parseJSON(LS.get('index'));
  const pending = !!LS.get('pending');
  let raw = null, cloudOk = false, cloudIdx = null;

  if (cloud) {
    try {
      cloudIdx = parseJSON((await cloud.get(['index'])).index);
      cloudOk = true;
    } catch (e) { console.error(e); }
  }
  const localNewer = localIdx && (pending || (localIdx._t || 0) > (cloudIdx?._t || 0));

  if (cloudOk && cloudIdx && !localNewer) {
    try {
      chunkIndex = cloudIdx;
      raw = await cloud.get(keysOf(chunkIndex));
      Object.entries(raw).forEach(([k, v]) => LS.set(k, v));
      LS.set('index', JSON.stringify(chunkIndex));
    } catch (e) { console.error(e); raw = null; }
  }
  if (!raw && localIdx) {
    chunkIndex = localIdx;
    raw = Object.fromEntries(keysOf(chunkIndex).map(k => [k, LS.get(k)]));
    if (cloudOk) saveChain = saveChain.then(pushAll).catch(() => markOffline());
    else if (cloud) markOffline();
  }
  if (!raw) { chunkIndex = {}; raw = {}; if (cloud && !cloudOk) toast('Нет связи с Telegram'); }

  const read = k => {
    let str = '';
    for (let i = 0; i < (chunkIndex[k] || 0); i++) str += raw[`${k}_${i}`] || '';
    return parseJSON(str) || [];
  };
  const ymd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

  read('cats').forEach(([id, name, color]) => EXTRA.splice(EXTRA.length - 1, 0, { id, name, color, icon: 'tag', custom: true }));
  // свой порядок категорий (какие в сетке, какие в «Другое»)
  const order = read('catorder');
  if (order && Array.isArray(order.main)) {
    const pool = Object.fromEntries([...CATEGORIES, ...EXTRA].map(c => [c.id, c]));
    const main = order.main.map(id => pool[id]).filter(Boolean);
    if (main.length === CATEGORIES.length) {
      const used = new Set(main.map(c => c.id));
      const extra = (order.extra || []).map(id => pool[id]).filter(c => c && !used.has(c.id));
      Object.values(pool).forEach(c => { if (!used.has(c.id) && !extra.includes(c)) extra.push(c); });
      CATEGORIES.splice(0, CATEGORIES.length, ...main);
      EXTRA.splice(0, EXTRA.length, ...extra);
    }
  }
  rebuildCat();
  read('accounts').forEach(([id, name, type, color, balance]) => accounts.push({ id, name, type, color, balance }));
  read('debts').forEach(([id, name, amount, note, date, closed, ts, dir, acc]) =>
    debts.push({ id, name, amount, note, date: ymd(date), closed: !!closed, ts, dir: dir || 'in', acc: acc || null }));
  for (const kind of ['exp', 'inc', 'tr']) {
    const re = new RegExp(`^${PREFIX[kind]}\\d{4}_\\d{2}$`);
    Object.keys(chunkIndex).filter(k => re.test(k)).forEach(k => {
      const y = +k.slice(1, 5), m = +k.slice(6) - 1;
      ops[kind][k] = read(k).map(r => kind === 'tr'
        ? { id: r[0], kind, date: new Date(y, m, r[1]), amount: r[2], from: r[3] || null, to: r[4] || null, note: r[5], ts: r[6] }
        : { id: r[0], kind, date: new Date(y, m, r[1]), amount: r[2],
            cat: kind === 'exp' ? (CAT[r[3]] ? r[3] : 'other') : (ICAT[r[3]] ? r[3] : 'in_other'),
            acc: r[4] || null, note: r[5], ts: r[6] });
    });
  }
  read('recurring').forEach(([id, day, amount, cat, acc, note, last]) => recurring.push({ id, day, amount, cat, acc: acc || null, note, last }));
  const lim = read('limits');
  if (lim && !Array.isArray(lim)) Object.assign(limits, lim);
  const g = read('goal');
  if (Array.isArray(g) && g.length) goal = { name: g[0], target: g[1], acc: g[2] || null };
}

/* ---------- Операции ---------- */
// влияние операции на балансы счетов: sign = 1 — применить, -1 — откатить
function applyOp(op, sign) {
  if (op.kind === 'tr') {
    const f = ACC(op.from), t = ACC(op.to);
    if (f) f.balance -= sign * op.amount;
    if (t) t.balance += sign * op.amount;
  } else {
    const a = ACC(op.acc);
    if (a) a.balance += sign * (op.kind === 'inc' ? op.amount : -op.amount);
  }
}
function defaultNote(kind, cat) {
  return kind === 'exp' ? CAT[cat]?.name : kind === 'inc' ? ICAT[cat]?.name : 'Перевод';
}
function addOp(kind, data, keep = {}) {
  const op = { ...data, kind, id: keep.id || uid(), ts: keep.ts || Date.now() };
  if (!op.note) op.note = defaultNote(kind, op.cat);
  const y = op.date.getFullYear(), m = op.date.getMonth();
  opList(kind, y, m).push(op);
  applyOp(op, 1);
  saveOps(kind, y, m);
  saveAccounts();
  return op;
}
function removeOp(op) {
  const y = op.date.getFullYear(), m = op.date.getMonth();
  const list = opList(op.kind, y, m);
  const i = list.indexOf(op);
  if (i >= 0) list.splice(i, 1);
  applyOp(op, -1);
  saveOps(op.kind, y, m);
  saveAccounts();
}
function deleteOp(id) {
  const op = findOp(id);
  if (!op) return;
  removeOp(op);
  renderAll();
  haptic.tap();
  toast('Удалено', 'Вернуть', () => { addOp(op.kind, op, { id: op.id, ts: op.ts }); renderAll(); });
}
function confirmBox(text, onYes) {
  if (tg?.showConfirm && tg.isVersionAtLeast?.('6.2')) tg.showConfirm(text, ok => ok && onYes());
  else if (window.confirm(text)) onYes();
}

// предупреждение о лимите после траты
function limitNotice(cat, date) {
  const lim = limits[cat];
  if (!lim) return '';
  const spent = sum(getExpenses(date.getFullYear(), date.getMonth()).filter(e => e.cat === cat));
  const name = CAT[cat].name;
  if (spent > lim) return `Лимит «${name}» превышен на ${fmt(spent - lim)}`;
  if (spent >= lim * .85) return `«${name}»: осталось ${fmt(lim - spent)} из ${fmt(lim)}`;
  return '';
}

// регулярные платежи: при запуске досоздаём пропущенные
function processRecurring() {
  let added = 0;
  for (const r of recurring) {
    let [ly, lm] = r.last.split('_').map(Number); lm -= 1;
    for (let guard = 0; guard < 24; guard++) {
      const n = new Date(ly, lm + 1, 1);
      const y = n.getFullYear(), m = n.getMonth();
      if (y * 12 + m > curMonthNum()) break;
      const day = Math.min(r.day, daysIn(y, m));
      if (y * 12 + m === curMonthNum() && today.getDate() < day) break;
      addOp('exp', { amount: r.amount, cat: CAT[r.cat] ? r.cat : 'other', acc: ACC(r.acc) ? r.acc : null, note: r.note, date: new Date(y, m, day) });
      r.last = monthTag(y, m);
      ly = y; lm = m; added++;
    }
  }
  if (added) { saveRecurring(); toast(`Добавлено регулярных платежей: ${added}`); }
}

/* ---------- Состояние ---------- */
const state = {
  tab: 'overview',
  month: new Date(today.getFullYear(), today.getMonth(), 1),
  filter: 'all',
  mode: 'expense',
  cat: 'food',
  incCat: 'salary',
  moreOpen: false,
  acc: null,
  accType: 'card',
  accEdit: false,
  debtDir: 'in',
  debtView: 'in',
  debtAcc: null,
  editAcc: null,
  editOp: null,
  trFrom: null,
  trTo: null,
  limitCat: 'cafe',
  swapFrom: null,     // категория, которую переставляем
  goalAcc: null,
};
const isCurrentMonth = () => state.month.getFullYear() === today.getFullYear() && state.month.getMonth() === today.getMonth();

/* ---------- Общие куски разметки ---------- */
function catIco(c, size = 18) {
  return `<div class="cat-ico" style="color:${c.color};background:${c.color}1f">${icon(c.icon, size)}</div>`;
}
const opStyle = op => op.kind === 'tr' ? TRANSFER_STYLE : op.kind === 'inc' ? ICAT[op.cat] : (CAT[op.cat] || CAT.other);
const accName = id => ACC(id)?.name || '—';
function txHTML(op, withDate) {
  const c = opStyle(op);
  const isTr = op.kind === 'tr';
  const title = isTr && op.note === 'Перевод' ? `${accName(op.from)} → ${accName(op.to)}` : op.note;
  const sub = isTr ? (op.note === 'Перевод' ? 'Перевод' : `${accName(op.from)} → ${accName(op.to)}`) : c.name;
  const amt = isTr ? fmt(op.amount) : `${op.kind === 'inc' ? '+' : '−'}${fmt(op.amount)}`;
  return `<div class="tx tappable" data-action="tx" data-id="${op.id}">
    ${catIco(c)}
    <div class="tx-main">
      <div class="tx-title">${esc(title)}</div>
      <div class="tx-sub">${esc(sub)}${withDate ? ' · ' + shortDate(op.date) : ''}</div>
    </div>
    <div class="tx-amt num ${op.kind === 'inc' ? 'pos' : isTr ? 'muted' : ''}">${amt}</div>
  </div>`;
}
const sortDesc = list => [...list].sort((a, b) => (b.date - a.date) || ((b.ts ?? 0) - (a.ts ?? 0)));
function byCategory(list) {
  const m = {};
  list.forEach(e => m[e.cat] = (m[e.cat] || 0) + e.amount);
  return Object.entries(m).sort((a, b) => b[1] - a[1]);
}
const SM = () => [state.month.getFullYear(), state.month.getMonth()];
const monthList = () => getExpenses(...SM());
const monthIncome = () => getIncomes(...SM());
const monthTransfers = () => getTransfers(...SM());

/* ---------- Обзор ---------- */
function renderOverview() {
  const [y, m] = SM();
  const list = monthList();
  const total = sum(list);
  const pm = (m + 11) % 12, py = m === 0 ? y - 1 : y;
  const prevTotal = sum(getExpenses(py, pm));

  $('#ovTotal').textContent = fmt(total);
  if (prevTotal > 0 && total > 0) {
    const pct = Math.round((total - prevTotal) / prevTotal * 100);
    const less = pct <= 0;
    $('#ovDelta').innerHTML = `<span class="${less ? 'pos' : 'neg'}">${icon(less ? 'down' : 'up', 14)}${Math.abs(pct)}%</span> ${less ? 'меньше' : 'больше'}, чем в ${MONTHS_PREP[pm]}`;
  } else {
    $('#ovDelta').textContent = '';
  }

  const inc = sum(monthIncome());
  const net = inc - total;
  $('#ovFlow').innerHTML = `
    <div><span>Доходы</span><b class="num pos">+${fmt(inc)}</b></div>
    <div><span>Итог месяца</span><b class="num ${net >= 0 ? 'pos' : 'neg'}">${net >= 0 ? '+' : '−'}${fmt(Math.abs(net))}</b></div>`;


  // категории
  const cats = byCategory(list);
  $('#ovStack').hidden = !cats.length;
  $('#ovStack').innerHTML = cats.map(([id, v]) => `<div style="flex-grow:${v};background:${CAT[id].color}"></div>`).join('');
  const rows = cats.slice(0, 4).map(([id, v]) => ({ name: CAT[id].name, color: CAT[id].color, v }));
  const rest = cats.slice(4);
  if (rest.length) rows.push({ name: `Остальное · ${rest.length}`, color: '#565c64', v: sum(rest, r => r[1]) });
  $('#ovCats').innerHTML = rows.length ? rows.map(r => `
    <li>
      <i class="dot" style="background:${r.color}"></i>
      <span>${esc(r.name)}</span>
      <span class="cr-pct num">${pctText(r.v / total * 100)}</span>
      <span class="cr-amt num">${fmt(r.v)}</span>
    </li>`).join('') : `<div class="empty">Нажми + и добавь первую трату</div>`;

  renderLimits();
  renderMonths();

  // мини-карточки
  const owedMe = sum(debts.filter(d => !d.closed && d.dir !== 'out'));
  const iOwe = sum(debts.filter(d => !d.closed && d.dir === 'out'));
  $('#ovDebts').textContent = fmt(owedMe);
  $('#ovDebtsSub').innerHTML = iOwe ? `Я должен <span class="neg">${fmt(iOwe)}</span>` : 'Я никому не должен';
  $('#ovMoney').textContent = fmt(sum(accounts, a => a.balance));
  $('#ovMoneySub').textContent = `${accounts.length} ${plural(accounts.length, ['счёт', 'счёта', 'счетов'])}`;

  renderRecurring();

  const recent = sortDesc([...list, ...monthIncome(), ...monthTransfers()]).slice(0, 4);
  $('#ovRecent').innerHTML = recent.length ? recent.map(e => txHTML(e, true)).join('') : `<div class="empty">Пусто</div>`;
}

function renderLimits() {
  const [y, m] = SM();
  const entries = Object.entries(limits).filter(([id]) => CAT[id]);
  $('#ovLimitsCard').hidden = !entries.length;
  $('#ovLimits').innerHTML = entries.map(([id, lim]) => {
    const spent = sum(getExpenses(y, m).filter(e => e.cat === id));
    const p = spent / lim;
    const cls = p > 1 ? 'over' : p >= .85 ? 'warn' : '';
    const left = lim - spent;
    return `<button class="limit-row ${cls}" data-action="limit" data-cat="${id}">
      <div class="lr-top">
        <span><i class="dot" style="background:${CAT[id].color}"></i>${esc(CAT[id].name)}</span>
        <span class="num"><b>${fmtNum(spent)}</b> / ${fmt(lim)}</span>
      </div>
      <div class="track"><div class="fill" style="width:${Math.min(p, 1) * 100}%;background:${p > 1 ? 'var(--neg)' : CAT[id].color}"></div></div>
      <div class="lr-sub">${left >= 0 ? `осталось ${fmt(left)}` : `перерасход ${fmt(-left)}`}</div>
    </button>`;
  }).join('');
}

function renderMonths() {
  const cols = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(state.month.getFullYear(), state.month.getMonth() - i, 1);
    const y = d.getFullYear(), m = d.getMonth();
    cols.push({ y, m, exp: sum(getExpenses(y, m)), inc: sum(getIncomes(y, m)) });
  }
  const max = Math.max(1, ...cols.map(c => Math.max(c.exp, c.inc)));
  $('#ovMonths').innerHTML = cols.map((c, i) => `
    <button class="mcol ${i === 5 ? 'sel' : ''}" data-action="goto-month" data-y="${c.y}" data-m="${c.m}">
      <div class="mval num">${c.exp ? Math.round(c.exp / 1000) + 'к' : ''}</div>
      <div class="mbars">
        <i class="mexp" style="height:${c.exp / max * 100}%"></i>
        <i class="minc" style="height:${c.inc / max * 100}%"></i>
      </div>
      <span>${MONTHS_SHORT[c.m]}</span>
    </button>`).join('');
}

function renderRecurring() {
  $('#ovRecurCard').hidden = !recurring.length;
  const now = monthTag(today.getFullYear(), today.getMonth());
  $('#ovRecur').innerHTML = recurring.map(r => {
    const c = CAT[r.cat] || CAT.other;
    const next = r.last === now
      ? new Date(today.getFullYear(), today.getMonth() + 1, 1)
      : new Date(today.getFullYear(), today.getMonth(), 1);
    next.setDate(Math.min(r.day, daysIn(next.getFullYear(), next.getMonth())));
    return `<div class="tx">
      ${catIco(c)}
      <div class="tx-main">
        <div class="tx-title">${esc(r.note)}</div>
        <div class="tx-sub">каждое ${r.day}-е · следующий ${shortDate(next)}${ACC(r.acc) ? ' · ' + esc(accName(r.acc)) : ''}</div>
      </div>
      <div class="tx-amt num">−${fmt(r.amount)}</div>
      <button class="mini-x" data-action="del-recur" data-id="${r.id}" aria-label="Удалить">${icon('x', 14)}</button>
    </div>`;
  }).join('');
}

/* ---------- Траты ---------- */
function renderExpenses() {
  const all = monthList();
  const incList = monthIncome();
  const trList = monthTransfers();
  const cats = byCategory(all);
  const special = ['all', 'income', 'transfer'];
  if (state.filter === 'income' && !incList.length) state.filter = 'all';
  if (state.filter === 'transfer' && !trList.length) state.filter = 'all';
  if (!special.includes(state.filter) && !cats.some(([id]) => id === state.filter)) state.filter = 'all';
  const f = state.filter;
  const isInc = f === 'income', isTr = f === 'transfer';

  // круговая диаграмма
  const dCats = isInc ? byCategory(incList) : isTr ? [] : cats;
  const dMap = isInc ? ICAT : CAT;
  const dTotal = isInc ? sum(incList) : sum(all);
  const R = 40, C = 2 * Math.PI * R, gap = dCats.length > 1 ? 1.6 : 0;
  let acc = 0;
  const segs = dCats.map(([id, v]) => {
    const len = v / dTotal * C;
    const on = f === 'all' || isInc || f === id;
    const s = `<circle cx="50" cy="50" r="${R}" fill="none" stroke="${dMap[id].color}" stroke-width="${f === id ? 11 : 9}"
      opacity="${on ? 1 : .18}" stroke-dasharray="${Math.max(len - gap, .01)} ${C}" stroke-dashoffset="${-acc}"/>`;
    acc += len;
    return s;
  }).join('');
  $('#exDonut').innerHTML = `<circle cx="50" cy="50" r="${R}" fill="none" stroke="#23272c" stroke-width="9"/>` + segs;

  let list;
  if (f === 'all') list = sortDesc([...all, ...incList, ...trList]);
  else if (isInc) list = sortDesc(incList);
  else if (isTr) list = sortDesc(trList);
  else list = sortDesc(all.filter(e => e.cat === f));

  if (f === 'all') {
    $('#exTotal').textContent = fmt(sum(all));
    $('#exCount').textContent = '';
  } else if (isInc) {
    $('#exTotal').innerHTML = `<span class="pos">+${fmt(dTotal)}</span>`;
    $('#exCount').textContent = 'доходы';
  } else if (isTr) {
    $('#exTotal').textContent = fmt(sum(trList));
    $('#exCount').textContent = 'переводы';
  } else {
    const shown = sum(list);
    $('#exTotal').textContent = fmt(shown);
    $('#exCount').textContent = `${CAT[f].name} · ${pctText(shown / sum(all) * 100)}`;
  }

  // лимит выбранной категории
  const limEl = $('#exLimit');
  if (!special.includes(f)) {
    const lim = limits[f];
    const spent = sum(list);
    limEl.hidden = false;
    limEl.innerHTML = lim
      ? `<span>Лимит ${fmt(lim)} · <b class="${spent > lim ? 'neg' : ''}">${spent > lim ? 'перерасход ' + fmt(spent - lim) : 'осталось ' + fmt(lim - spent)}</b></span>
         <button class="link" data-action="limit" data-cat="${f}">Изменить</button>`
      : `<span class="muted">Лимит не задан</span><button class="link" data-action="limit" data-cat="${f}">Задать лимит</button>`;
  } else limEl.hidden = true;

  $('#exChips').innerHTML =
    `<button class="chip ${f === 'all' ? 'active' : ''}" data-action="filter" data-cat="all">Все</button>` +
    (incList.length ? `<button class="chip ${isInc ? 'active' : ''}" data-action="filter" data-cat="income"><i style="background:var(--pos)"></i>Доходы</button>` : '') +
    (trList.length ? `<button class="chip ${isTr ? 'active' : ''}" data-action="filter" data-cat="transfer"><i style="background:var(--muted)"></i>Переводы</button>` : '') +
    cats.map(([id]) => `<button class="chip ${f === id ? 'active' : ''}" data-action="filter" data-cat="${id}"><i style="background:${CAT[id].color}"></i>${esc(CAT[id].name)}</button>`).join('');

  const groups = [];
  list.forEach(e => {
    const k = isoDate(e.date);
    let g = groups[groups.length - 1];
    if (!g || g.k !== k) groups.push(g = { k, date: e.date, items: [] });
    g.items.push(e);
  });
  const dayTotals = items => {
    const out = sum(items.filter(e => e.kind === 'exp')), inn = sum(items.filter(e => e.kind === 'inc'));
    return [inn ? `<span class="pos">+${fmt(inn)}</span>` : '', out ? `−${fmt(out)}` : ''].filter(Boolean).join('&nbsp;&nbsp;');
  };
  $('#exList').innerHTML = groups.length ? groups.map(g => `
    <div class="group">
      <div class="group-head"><span>${dayLabel(g.date)}</span><span class="num">${dayTotals(g.items)}</span></div>
      <div class="card list-card">${g.items.map(e => txHTML(e, false)).join('')}</div>
    </div>`).join('') : `<div class="empty">В этом месяце операций нет</div>`;
}

/* ---------- Долги ---------- */
function debtHTML(d) {
  const out = d.dir === 'out';
  const acc = ACC(d.acc);
  return `<div class="tx ${d.closed ? 'settled' : ''}">
    <div class="avatar ${out ? 'out' : ''}">${esc(d.name.trim()[0] || '?').toUpperCase()}</div>
    <div class="tx-main">
      <div class="tx-title">${esc(d.name)}</div>
      <div class="tx-sub">${d.note ? esc(d.note) + ' · ' : ''}${shortDate(d.date)}${acc ? ' · ' + esc(acc.name) : ''}</div>
    </div>
    <div class="debt-side">
      <div class="tx-amt num">${fmt(d.amount)}</div>
      ${d.closed
        ? `<button class="settle ghost" data-action="settle" data-id="${d.id}">вернуть в список</button>`
        : `<button class="settle" data-action="settle" data-id="${d.id}">${icon('check', 13)}${out ? 'Отдал' : 'Вернул'}</button>`}
    </div>
  </div>`;
}
function renderDebts() {
  const view = state.debtView;
  const mine = debts.filter(d => (d.dir || 'in') === view);
  const open = sortDesc(mine.filter(d => !d.closed));
  const closed = sortDesc(mine.filter(d => d.closed));
  const owedMe = sum(debts.filter(d => !d.closed && d.dir !== 'out'));
  const iOwe = sum(debts.filter(d => !d.closed && d.dir === 'out'));

  $$('#dbSeg button').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  $('#dbSegIn').textContent = owedMe ? fmt(owedMe) : '';
  $('#dbSegOut').textContent = iOwe ? fmt(iOwe) : '';
  $('#dbEyebrow').textContent = view === 'in' ? 'Мне должны' : 'Я должен';
  $('#dbTotal').textContent = fmt(sum(open));
  $('#dbTotal').classList.toggle('neg', view === 'out' && open.length > 0);
  $('#dbSub').textContent = open.length
    ? (view === 'in'
        ? `у ${open.length} ${plural(open.length, ['человека', 'человек', 'человек'])}`
        : `${open.length} ${plural(open.length, ['человеку', 'людям', 'людям'])}`)
    : (view === 'in' ? 'Все долги закрыты' : 'Ты никому не должен');
  $('#dbActive').innerHTML = open.length ? open.map(debtHTML).join('')
    : `<div class="empty">${view === 'in' ? 'Никто ничего не должен' : 'Долгов нет'}</div>`;
  $('#dbClosedLabel').textContent = view === 'in' ? 'Вернули' : 'Отдал';
  $('#dbClosedWrap').hidden = !closed.length;
  $('#dbClosed').innerHTML = closed.map(debtHTML).join('');
}
// закрыть/открыть долг; если указан счёт — деньги возвращаются на него
function toggleDebt(d) {
  d.closed = !d.closed;
  const acc = ACC(d.acc);
  if (acc) {
    const sign = d.closed ? 1 : -1;
    acc.balance += sign * (d.dir === 'out' ? -d.amount : d.amount);
    saveAccounts();
  }
  saveDebts();
}

/* ---------- Счета ---------- */
function renderAccounts() {
  if (!accounts.length) state.accEdit = false;
  const total = sum(accounts, a => a.balance);
  $('#acTotal').textContent = fmt(total);
  $('#acSub').textContent = accounts.length
    ? `на ${accounts.length} ${plural(accounts.length, ['счёте', 'счетах', 'счетах'])}`
    : 'Добавь первый счёт';
  const editBtn = $('#acEditBtn');
  editBtn.hidden = !accounts.length;
  editBtn.textContent = state.accEdit ? 'Готово' : 'Изменить';
  editBtn.classList.toggle('on', state.accEdit);

  const positive = accounts.filter(a => a.balance > 0);
  $('#acStack').hidden = !positive.length;
  $('#acStack').innerHTML = positive.map(a => `<div style="flex-grow:${a.balance};background:${a.color}"></div>`).join('');

  $('#acList').innerHTML = accounts.length ? accounts.map(a => {
    const t = ACC_TYPE[a.type];
    const share = total > 0 && a.balance > 0 ? Math.round(a.balance / total * 100) : 0;
    return `<div class="tx ${state.accEdit ? '' : 'tappable'}" ${state.accEdit ? '' : `data-action="open-acc" data-id="${a.id}"`}>
      <div class="cat-ico" style="color:${a.color};background:${a.color}1f">${icon(t.icon, 18)}</div>
      <div class="tx-main">
        <div class="tx-title">${esc(a.name)}</div>
        <div class="tx-sub">${t.name}</div>
      </div>
      <div>
        <div class="tx-amt num ${a.balance < 0 ? 'minus' : ''}">${a.balance < 0 ? '−' : ''}${fmt(Math.abs(a.balance))}</div>
        ${state.accEdit ? '' : `<div class="acc-share num">${share ? share + '%' : ''}</div>`}
      </div>
      ${state.accEdit ? `<button class="del-btn" data-action="del-acc" data-id="${a.id}" aria-label="Удалить">${icon('trash', 18)}</button>` : ''}
    </div>`;
  }).join('') : `<div class="empty">Счетов пока нет</div>`;

  renderGoal();
}
function deleteAccount(id) {
  const i = accounts.findIndex(a => a.id === id);
  if (i < 0) return;
  const [removed] = accounts.splice(i, 1);
  if (state.acc === id) state.acc = accounts[0]?.id;
  saveAccounts();
  renderAll();
  haptic.tap();
  toast(`«${removed.name}» удалён`, 'Вернуть', () => {
    accounts.splice(Math.min(i, accounts.length), 0, removed);
    saveAccounts();
    renderAll();
  });
}

// цель накоплений
function goalInflow(accId) {
  // среднее чистое пополнение счёта за 3 последних полных месяца
  let total = 0;
  for (let i = 1; i <= 3; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const y = d.getFullYear(), m = d.getMonth();
    total += sum(getIncomes(y, m).filter(o => o.acc === accId));
    total -= sum(getExpenses(y, m).filter(o => o.acc === accId));
    total += sum(getTransfers(y, m).filter(o => o.to === accId));
    total -= sum(getTransfers(y, m).filter(o => o.from === accId));
  }
  return total / 3;
}
function renderGoal() {
  const el = $('#acGoal');
  if (!goal) {
    el.innerHTML = `<button class="goal-empty" data-action="goal">${icon('target', 18)}<span>Поставить цель накоплений</span></button>`;
    return;
  }
  const acc = ACC(goal.acc);
  const saved = Math.max(acc?.balance || 0, 0);
  const p = Math.min(saved / goal.target, 1);
  let forecast;
  if (saved >= goal.target) forecast = '<span class="pos">Цель достигнута</span>';
  else if (!acc) forecast = 'Привяжи счёт — появится прогресс';
  else {
    const avg = goalInflow(acc.id);
    if (avg > 0) {
      const months = Math.ceil((goal.target - saved) / avg);
      const t = new Date(today.getFullYear(), today.getMonth() + months, 1);
      forecast = `≈ ${fmt(avg)} в месяц → накопишь к ${MONTHS_DAT[t.getMonth()]} ${t.getFullYear()}`;
    } else forecast = 'Пополняй счёт — появится прогноз';
  }
  el.innerHTML = `<button class="card goal-card" data-action="goal">
    <div class="goal-top">
      ${catIco({ color: '#c9b98f', icon: 'target' })}
      <div class="tx-main">
        <div class="tx-title">${esc(goal.name)}</div>
        <div class="tx-sub">${acc ? esc(acc.name) : 'счёт не выбран'}</div>
      </div>
      <div class="goal-pct num">${(p * 100).toFixed(p < .1 ? 1 : 0).replace('.', ',')}%</div>
    </div>
    <div class="track goal-track"><div class="fill accent-fill" style="width:${p * 100}%"></div></div>
    <div class="goal-nums num"><span><b>${fmt(saved)}</b> из ${fmt(goal.target)}</span><span>${forecast}</span></div>
  </button>`;
}

/* ---------- Месяц ---------- */
function renderMonthLabels() {
  const [y, m] = SM();
  $$('[data-month-label]').forEach(el => el.innerHTML = `${MONTHS[m]} <span class="year">${y}</span>`);
  $$('[data-action="month"][data-dir="1"]').forEach(b => b.disabled = isCurrentMonth());
}
function setMonth(d) {
  if (d.getFullYear() * 12 + d.getMonth() > curMonthNum()) return;
  state.month = new Date(d.getFullYear(), d.getMonth(), 1);
  state.filter = 'all';
  haptic.select();
  renderMonthLabels(); renderOverview(); renderExpenses();
}
const shiftMonth = dir => setMonth(new Date(state.month.getFullYear(), state.month.getMonth() + dir, 1));

function renderAll() {
  renderMonthLabels(); renderOverview(); renderExpenses(); renderDebts(); renderAccounts();
}

/* ---------- Вкладки ---------- */
function setTab(tab) {
  if (state.tab === tab) return;
  state.tab = tab;
  if (tab !== 'accounts' && state.accEdit) { state.accEdit = false; renderAccounts(); }
  $$('.screen').forEach(s => s.classList.toggle('active', s.id === 'screen-' + tab));
  $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  window.scrollTo(0, 0);
  haptic.select();
}

/* ---------- Шторка ---------- */
const sheet = $('#sheet'), backdrop = $('.backdrop');
const fAmount = $('#fAmount'), fName = $('#fName'), fNote = $('#fNote'), fDate = $('#fDate');

function renderCatGrid() {
  const sw = state.swapFrom;
  const extraSel = isExtra(state.cat) ? CAT[state.cat] : null;
  const other = extraSel || { name: 'Другое', color: '#7a8088', icon: 'dots' };
  const cls = c => [sw ? 'wiggle' : '', sw === c.id ? 'swap-src' : '', !sw && state.cat === c.id ? 'active' : ''].join(' ');
  $('#fCats').innerHTML = CATEGORIES.map(c => `
    <button class="cat-opt ${cls(c)}" data-action="cat" data-cat="${c.id}">
      ${catIco(c)}<span>${esc(c.name)}</span>
    </button>`).join('') + `
    <button class="cat-opt ${!sw && (extraSel || state.moreOpen) ? 'active' : ''} ${sw ? 'dim' : ''}" data-action="more">
      ${catIco(other)}<span>${esc(other.name)}</span>
    </button>`;
  $('#fSwapHint').hidden = !sw;
  if (sw) $('#fSwapText').textContent = `Нажми категорию, которую поставить на место «${CAT[sw].name}»`;
  $('#fMore').hidden = !(state.moreOpen || sw);
  $('#fExtra').innerHTML = EXTRA.map(c =>
    `<button class="chip ${cls(c)}" data-action="cat" data-cat="${c.id}"><i style="background:${c.color}"></i>${esc(c.name)}</button>`
  ).join('') + (sw ? '' : `<button class="chip dashed" data-action="new-cat">${icon('plus', 14)}Своя</button>`);
}
// поменять местами две категории (в сетке, в «Другое» или между ними)
function swapCats(a, b) {
  const where = id => {
    let i = CATEGORIES.findIndex(c => c.id === id);
    if (i >= 0) return [CATEGORIES, i];
    i = EXTRA.findIndex(c => c.id === id);
    return [EXTRA, i];
  };
  const [la, ia] = where(a), [lb, ib] = where(b);
  if (ia < 0 || ib < 0) return;
  [la[ia], lb[ib]] = [lb[ib], la[ia]];
  rebuildCat();
  saveCatOrder();
}
function stopSwap() {
  state.swapFrom = null;
  renderCatGrid();
}

// зажатие категории — режим перестановки
let pressTimer = null, pressStart = null, suppressClick = false;
function onPressStart(e) {
  const el = e.target.closest('#fCats [data-cat], #fExtra [data-cat]');
  if (!el || state.swapFrom) return;
  pressStart = { x: e.clientX, y: e.clientY };
  clearTimeout(pressTimer);
  pressTimer = setTimeout(() => {
    pressTimer = null;
    suppressClick = true;
    state.swapFrom = el.dataset.cat;
    haptic.ok();
    if (navigator.vibrate) navigator.vibrate(15);
    renderCatGrid();
  }, 450);
}
function onPressCancel(e) {
  if (!pressTimer) return;
  if (e.type === 'pointermove' && pressStart && Math.hypot(e.clientX - pressStart.x, e.clientY - pressStart.y) < 8) return;
  clearTimeout(pressTimer);
  pressTimer = null;
}
sheet.addEventListener('pointerdown', onPressStart);
// клик после отпускания долгого нажатия гасим, но только этот один — дальше тапы работают как обычно
sheet.addEventListener('pointerup', () => { if (suppressClick) setTimeout(() => { suppressClick = false; }, 80); });
['pointerup', 'pointercancel', 'pointermove', 'pointerleave'].forEach(t => sheet.addEventListener(t, onPressCancel));
sheet.addEventListener('contextmenu', e => { if (e.target.closest('[data-cat]')) e.preventDefault(); });
function renderIncGrid() {
  $('#fIncCats').innerHTML = INCOME_CATS.map(c => `
    <button class="cat-opt ${state.incCat === c.id ? 'active' : ''}" data-action="inc-cat" data-cat="${c.id}">
      ${catIco(c)}<span>${c.name}</span>
    </button>`).join('');
}
function accChips(selected, action, { none } = {}) {
  if (!accounts.length) return `<span class="muted" style="font-size:13px">Сначала добавь счёт</span>`;
  return (none ? `<button class="chip ${!selected ? 'active' : ''}" data-action="${action}" data-id="">${none}</button>` : '') +
    accounts.map(a => `<button class="chip ${selected === a.id ? 'active' : ''}" data-action="${action}" data-id="${a.id}"><i style="background:${a.color}"></i>${esc(a.name)}</button>`).join('');
}
function renderAccPicker() {
  if (!ACC(state.acc)) state.acc = accounts[0]?.id || null;
  $('#fAccs').innerHTML = accChips(state.acc, 'pick-acc');
}
function renderTrPickers() {
  $('#fFrom').innerHTML = accChips(state.trFrom, 'pick-from');
  $('#fTo').innerHTML = accChips(state.trTo, 'pick-to');
}
function renderDebtDir() {
  $$('#fDebtDir button').forEach(b => b.classList.toggle('active', b.dataset.dir === state.debtDir));
  fName.placeholder = state.debtDir === 'out' ? 'Кому должен' : 'Кто должен';
  $('#fDebtAccLabel').textContent = state.debtDir === 'out' ? 'Деньги пришли на счёт' : 'Деньги ушли со счёта';
  $('#fDebtAccs').innerHTML = accChips(state.debtAcc, 'pick-debt-acc', { none: 'Не учитывать' });
}
function renderTypeGrid() {
  $('#fTypes').innerHTML = ACC_TYPES.map(t => `
    <button class="type-opt ${state.accType === t.id ? 'active' : ''}" data-action="acc-type" data-type="${t.id}">
      ${icon(t.icon, 20)}<span>${t.name}</span>
    </button>`).join('');
}
function renderLimitCats() {
  $('#fLimitCats').innerHTML = [...CATEGORIES, ...EXTRA].map(c =>
    `<button class="chip ${state.limitCat === c.id ? 'active' : ''}" data-action="limit-cat" data-cat="${c.id}"><i style="background:${c.color}"></i>${esc(c.name)}${limits[c.id] ? ' · ' + fmtNum(limits[c.id]) : ''}</button>`
  ).join('');
}
function renderGoalAccs() {
  $('#fGoalAccs').innerHTML = accChips(state.goalAcc, 'pick-goal-acc');
}

function setMode(mode) {
  state.mode = mode;
  const editing = !!state.editOp;
  $$('#fSeg button').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
  $$('[data-for]').forEach(el => el.hidden = !el.dataset.for.split(' ').includes(mode));
  $('#fSeg').hidden = editing || ['acc-edit', 'limit', 'goal'].includes(mode);

  const title = editing
    ? { expense: 'Изменить трату', income: 'Изменить доход', transfer: 'Изменить перевод' }[mode]
    : { 'acc-edit': 'Изменить счёт', limit: 'Лимит на месяц', goal: goal ? 'Цель накоплений' : 'Новая цель' }[mode];
  $('#fTitle').hidden = !title;
  $('#fTitle').textContent = title || '';

  let del = '';
  if (editing) del = { expense: 'Удалить трату', income: 'Удалить доход', transfer: 'Удалить перевод' }[mode];
  else if (mode === 'acc-edit') del = 'Удалить счёт';
  else if (mode === 'limit' && limits[state.limitCat]) del = 'Убрать лимит';
  else if (mode === 'goal' && goal) del = 'Удалить цель';
  $('#fDel').hidden = !del;
  $('#fDel').textContent = del;

  const isAcc = mode === 'account' || mode === 'acc-edit';
  fNote.placeholder = mode === 'debt' ? 'За что' : 'Комментарий';
  fName.placeholder = isAcc ? 'Название счёта' : mode === 'goal' ? 'На что копишь' : 'Кто должен';
  $('#fNameIcon').innerHTML = icon(isAcc ? 'wallet' : mode === 'goal' ? 'target' : 'user', 20);
  $('#fAccLabel').textContent = mode === 'income' ? 'Зачислить на счёт' : 'Списать со счёта';
  $('#fSave').textContent = {
    expense: editing ? 'Сохранить' : 'Добавить трату',
    income: editing ? 'Сохранить' : 'Добавить доход',
    transfer: editing ? 'Сохранить' : 'Перевести',
    debt: 'Записать долг', account: 'Добавить счёт', 'acc-edit': 'Сохранить',
    limit: 'Сохранить лимит', goal: 'Сохранить цель',
  }[mode];

  if (mode === 'expense') renderCatGrid();
  if (mode === 'income') renderIncGrid();
  if (mode === 'expense' || mode === 'income') renderAccPicker();
  if (mode === 'transfer') {
    if (!ACC(state.trFrom)) state.trFrom = accounts[0]?.id || null;
    if (!ACC(state.trTo) || state.trTo === state.trFrom) state.trTo = accounts.find(a => a.id !== state.trFrom)?.id || null;
    renderTrPickers();
  }
  if (mode === 'debt') renderDebtDir();
  if (isAcc) renderTypeGrid();
  if (mode === 'limit') renderLimitCats();
  if (mode === 'goal') renderGoalAccs();
  renderSugg();
}
function sizeAmount() {
  fAmount.style.width = Math.max(1, fAmount.value.length) + 'ch';
}
function openSheet(mode, opts = {}) {
  fAmount.value = ''; fName.value = ''; fNote.value = ''; fDate.value = isoDate(today);
  $('#fCatName').value = ''; $('#fAddCat').hidden = true;
  Object.assign(state, { moreOpen: false, editAcc: null, editOp: null, swapFrom: null });

  if (mode === 'debt') { state.debtDir = state.tab === 'debts' ? state.debtView : 'in'; state.debtAcc = null; }
  if (opts.op) {
    const op = opts.op;
    state.editOp = op.id;
    fAmount.value = fmtInput(op.amount);
    fNote.value = defaultNote(op.kind, op.cat) === op.note ? '' : op.note;
    fDate.value = isoDate(op.date);
    if (op.kind === 'exp') state.cat = op.cat;
    if (op.kind === 'inc') state.incCat = op.cat;
    if (op.kind === 'tr') { state.trFrom = op.from; state.trTo = op.to; } else state.acc = op.acc;
  }
  if (mode === 'acc-edit') {
    const a = ACC(opts.accId);
    if (!a) return;
    state.editAcc = a.id;
    state.accType = a.type;
    fAmount.value = fmtInput(a.balance);
    fName.value = a.name;
  }
  if (mode === 'limit') {
    if (opts.cat) state.limitCat = opts.cat;
    fAmount.value = fmtInput(limits[state.limitCat]);
  }
  if (mode === 'goal') {
    if (goal) { fName.value = goal.name; fAmount.value = fmtInput(goal.target); state.goalAcc = goal.acc; }
    else state.goalAcc = accounts.find(a => a.type === 'savings')?.id || accounts[0]?.id || null;
  }
  sizeAmount();
  setMode(mode);
  sheet.classList.add('open'); backdrop.classList.add('open');
  tg?.BackButton?.show();
  haptic.tap();
  if (!opts.op && mode !== 'acc-edit' && mode !== 'goal') setTimeout(() => fAmount.focus(), 320);
}
function closeSheet() {
  state.swapFrom = null;
  sheet.classList.remove('open'); backdrop.classList.remove('open');
  document.activeElement?.blur();
  tg?.BackButton?.hide();
}
tg?.BackButton?.onClick(closeSheet);

// закрытие шторки свайпом вниз
let drag = null;
sheet.addEventListener('touchstart', e => {
  if (!sheet.classList.contains('open')) return;
  // тянуть можно за «ручку» всегда, а за остальную шторку — только когда она прокручена в самый верх
  if (sheet.scrollTop > 0 && !e.target.closest('.grabber')) return;
  drag = { y: e.touches[0].clientY, t: Date.now(), dy: 0 };
}, { passive: true });
sheet.addEventListener('touchmove', e => {
  if (!drag) return;
  const dy = e.touches[0].clientY - drag.y;
  if (dy <= 0) { drag.dy = 0; sheet.style.transform = ''; return; }
  drag.dy = dy;
  sheet.style.transition = 'none';
  sheet.style.transform = `translateY(${dy}px)`;
  backdrop.style.opacity = String(Math.max(0, 1 - dy / 400));
  if (e.cancelable) e.preventDefault();
}, { passive: false });
function endDrag() {
  if (!drag) return;
  const { dy, t } = drag;
  drag = null;
  sheet.style.transition = '';
  sheet.style.transform = '';
  backdrop.style.opacity = '';
  const fast = dy > 40 && dy / Math.max(1, Date.now() - t) > .5;
  if (dy > 110 || fast) closeSheet();
}
sheet.addEventListener('touchend', endDrag);
sheet.addEventListener('touchcancel', endDrag);

fAmount.addEventListener('input', () => {
  const digits = fAmount.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 9);
  fAmount.value = digits ? Number(digits).toLocaleString('ru-RU') : '';
  sizeAmount();
});
$('#fCatName').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); createCategory(); } });

// подсказки комментария по прошлым операциям
let suggestions = [];
function renderSugg() {
  const kind = state.mode === 'expense' ? 'exp' : state.mode === 'income' ? 'inc' : null;
  const q = fNote.value.trim().toLowerCase();
  suggestions = [];
  if (kind && q && document.activeElement === fNote) {
    const stats = new Map();
    for (const op of allOps()) {
      if (op.kind !== kind || !op.note) continue;
      const n = op.note, low = n.toLowerCase();
      if (!low.includes(q) || low === q) continue;
      const s = stats.get(n) || { n, count: 0, cats: {} };
      s.count++; s.cats[op.cat] = (s.cats[op.cat] || 0) + 1;
      stats.set(n, s);
    }
    suggestions = [...stats.values()]
      .sort((a, b) => (b.n.toLowerCase().startsWith(q) - a.n.toLowerCase().startsWith(q)) || b.count - a.count)
      .slice(0, 4)
      .map(s => ({ note: s.n, cat: Object.entries(s.cats).sort((a, b) => b[1] - a[1])[0][0] }));
  }
  const map = kind === 'inc' ? ICAT : CAT;
  $('#fSugg').hidden = !suggestions.length;
  $('#fSugg').innerHTML = suggestions.map((s, i) =>
    `<button class="chip" data-action="sugg" data-i="${i}"><i style="background:${map[s.cat]?.color}"></i>${esc(s.note)}</button>`).join('');
}
fNote.addEventListener('input', renderSugg);
fNote.addEventListener('focus', renderSugg);
fNote.addEventListener('blur', () => setTimeout(() => { $('#fSugg').hidden = true; }, 200));

function createCategory() {
  const input = $('#fCatName');
  const name = input.value.trim();
  if (!name) return shake($('#fAddCat'));
  const existing = [...CATEGORIES, ...EXTRA].find(c => c.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    state.cat = existing.id;
  } else {
    const customCount = EXTRA.filter(c => c.custom).length;
    const c = { id: 'c_' + uid(), name, color: CUSTOM_COLORS[customCount % CUSTOM_COLORS.length], icon: 'tag', custom: true };
    const oi = EXTRA.findIndex(x => x.id === 'other');
    EXTRA.splice(oi >= 0 ? oi : EXTRA.length, 0, c);
    rebuildCat();
    saveCats();
    saveCatOrder();
    state.cat = c.id;
  }
  input.value = '';
  $('#fAddCat').hidden = true;
  state.moreOpen = false;
  renderCatGrid();
  haptic.ok();
}

function shake(el) {
  el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake');
  haptic.err();
}
function save() {
  const mode = state.mode;
  const amount = Number(fAmount.value.replace(/\D/g, ''));
  if (!amount && !['account', 'acc-edit'].includes(mode)) return shake($('#fAmountWrap'));
  const [y, m, d] = (fDate.value || isoDate(today)).split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const note = fNote.value.trim();
  let message = 'Сохранено';

  if (mode === 'expense' || mode === 'income') {
    const kind = mode === 'expense' ? 'exp' : 'inc';
    const data = { amount, cat: kind === 'exp' ? state.cat : state.incCat, acc: ACC(state.acc)?.id || null, note, date };
    let keep = {};
    if (state.editOp) {
      const old = findOp(state.editOp);
      if (old) { keep = { id: old.id, ts: old.ts }; removeOp(old); }
    }
    addOp(kind, data, keep);
    if (kind === 'exp') message = limitNotice(data.cat, date) || message;
    if (date <= today) state.month = new Date(y, m - 1, 1);
  } else if (mode === 'transfer') {
    if (!state.trFrom || !state.trTo || state.trFrom === state.trTo) {
      shake($('#fTrWrap'));
      return toast('Выбери два разных счёта');
    }
    let keep = {};
    if (state.editOp) {
      const old = findOp(state.editOp);
      if (old) { keep = { id: old.id, ts: old.ts }; removeOp(old); }
    }
    addOp('tr', { amount, from: state.trFrom, to: state.trTo, note, date }, keep);
    if (date <= today) state.month = new Date(y, m - 1, 1);
  } else if (mode === 'debt') {
    const name = fName.value.trim();
    if (!name) return shake($('#fNameWrap'));
    const dbt = { id: uid(), ts: Date.now(), name, amount, note, date, closed: false, dir: state.debtDir, acc: state.debtAcc || null };
    debts.push(dbt);
    const acc = ACC(dbt.acc);
    if (acc) { acc.balance += dbt.dir === 'out' ? amount : -amount; saveAccounts(); }
    state.debtView = state.debtDir;
    saveDebts();
  } else if (mode === 'acc-edit') {
    const a = ACC(state.editAcc);
    const name = fName.value.trim();
    if (!name) return shake($('#fNameWrap'));
    if (a) { a.name = name; a.type = state.accType; a.balance = amount; saveAccounts(); }
  } else if (mode === 'account') {
    const name = fName.value.trim();
    if (!name) return shake($('#fNameWrap'));
    const used = accounts.map(a => a.color);
    const color = ACC_COLORS.find(c => !used.includes(c)) || ACC_COLORS[accounts.length % ACC_COLORS.length];
    accounts.push({ id: uid(), name, type: state.accType, color, balance: amount });
    if (accounts.length === 1) state.acc = accounts[0].id;
    saveAccounts();
  } else if (mode === 'limit') {
    limits[state.limitCat] = amount;
    saveLimits();
  } else if (mode === 'goal') {
    const name = fName.value.trim();
    if (!name) return shake($('#fNameWrap'));
    goal = { name, target: amount, acc: state.goalAcc };
    saveGoal();
  }
  closeSheet();
  renderAll();
  haptic.ok();
  toast(message);
}
function sheetDelete() {
  const mode = state.mode;
  if (state.editOp) { const id = state.editOp; closeSheet(); deleteOp(id); }
  else if (mode === 'acc-edit') { const id = state.editAcc; closeSheet(); deleteAccount(id); }
  else if (mode === 'limit') { delete limits[state.limitCat]; saveLimits(); closeSheet(); renderAll(); toast('Лимит убран'); }
  else if (mode === 'goal') { goal = null; saveGoal(); closeSheet(); renderAll(); toast('Цель удалена'); }
}

/* ---------- Уведомление ---------- */
let toastTimer, toastAction = null;
function toast(text, actionLabel, action) {
  const t = $('#toast');
  toastAction = action || null;
  t.innerHTML = `<span>${esc(text)}</span>${actionLabel ? `<button data-action="toast-act">${esc(actionLabel)}</button>` : ''}`;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.classList.remove('show'); toastAction = null; }, action ? 4500 : 2200);
}

/* ---------- Клики ---------- */
const KIND_MODE = { exp: 'expense', inc: 'income', tr: 'transfer' };
document.addEventListener('click', e => {
  if (suppressClick) { suppressClick = false; e.preventDefault(); return; }   // клик после долгого нажатия
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const a = el.dataset.action;
  const id = el.dataset.id;
  // режим перестановки категорий
  if (state.swapFrom && state.mode === 'expense' && sheet.contains(el)) {
    if (a === 'cat') {
      const to = el.dataset.cat;
      if (to !== state.swapFrom) { swapCats(state.swapFrom, to); haptic.ok(); }
      stopSwap();
      return;
    }
    if (a === 'swap-done' || a === 'more') { stopSwap(); return; }
  }
  switch (a) {
    case 'tab': setTab(el.dataset.tab); break;
    case 'month': shiftMonth(+el.dataset.dir); break;
    case 'goto-month': setMonth(new Date(+el.dataset.y, +el.dataset.m, 1)); break;
    case 'add': openSheet(state.tab === 'debts' ? 'debt' : state.tab === 'accounts' ? 'account' : 'expense'); break;
    case 'add-account': openSheet('account'); break;
    case 'open-acc': openSheet('acc-edit', { accId: id }); break;
    case 'tx': { const op = findOp(id); if (op) openSheet(KIND_MODE[op.kind], { op }); break; }
    case 'sheet-del': sheetDelete(); break;
    case 'close': closeSheet(); break;
    case 'save': save(); break;
    case 'seg': setMode(el.dataset.mode); haptic.select(); break;
    case 'swap-done': stopSwap(); break;
    case 'cat': state.cat = el.dataset.cat; state.moreOpen = false; $('#fAddCat').hidden = true; renderCatGrid(); haptic.select(); break;
    case 'more': state.moreOpen = !state.moreOpen; if (!state.moreOpen) $('#fAddCat').hidden = true; renderCatGrid(); haptic.select(); break;
    case 'new-cat': $('#fAddCat').hidden = false; $('#fCatName').focus(); haptic.tap(); break;
    case 'create-cat': createCategory(); break;
    case 'inc-cat': state.incCat = el.dataset.cat; renderIncGrid(); haptic.select(); break;
    case 'pick-acc': state.acc = id; renderAccPicker(); haptic.select(); break;
    case 'pick-from': state.trFrom = id; if (state.trTo === id) state.trTo = accounts.find(x => x.id !== id)?.id || null; renderTrPickers(); haptic.select(); break;
    case 'pick-to': state.trTo = id; if (state.trFrom === id) state.trFrom = accounts.find(x => x.id !== id)?.id || null; renderTrPickers(); haptic.select(); break;
    case 'pick-debt-acc': state.debtAcc = id || null; renderDebtDir(); haptic.select(); break;
    case 'pick-goal-acc': state.goalAcc = id; renderGoalAccs(); haptic.select(); break;
    case 'acc-type': state.accType = el.dataset.type; renderTypeGrid(); haptic.select(); break;
    case 'debt-dir': state.debtDir = el.dataset.dir; renderDebtDir(); haptic.select(); break;
    case 'debt-view': state.debtView = el.dataset.view; renderDebts(); haptic.select(); break;
    case 'sugg': {
      const s = suggestions[+el.dataset.i];
      if (!s) break;
      fNote.value = s.note;
      if (state.mode === 'expense') { state.cat = s.cat; renderCatGrid(); } else { state.incCat = s.cat; renderIncGrid(); }
      $('#fSugg').hidden = true;
      haptic.select();
      break;
    }
    case 'filter': state.filter = el.dataset.cat === state.filter ? 'all' : el.dataset.cat; renderExpenses(); haptic.select(); break;
    case 'limit': openSheet('limit', { cat: el.dataset.cat }); break;
    case 'limit-cat': state.limitCat = el.dataset.cat; fAmount.value = fmtInput(limits[state.limitCat]); sizeAmount(); setMode('limit'); haptic.select(); break;
    case 'goal': openSheet('goal'); break;
    case 'del-recur': {
      const r = recurring.find(x => x.id === id);
      if (r) confirmBox(`Больше не добавлять «${r.note}» каждый месяц?`, () => {
        recurring.splice(recurring.indexOf(r), 1); saveRecurring(); renderOverview();
      });
      break;
    }
    case 'acc-edit': state.accEdit = !state.accEdit; renderAccounts(); haptic.select(); break;
    case 'del-acc': deleteAccount(id); break;
    case 'backup': exportBackup(); break;
    case 'restore': $('#bkFile').click(); break;
    case 'csv': exportCSV(); break;
    case 'toast-act': toastAction?.(); toastAction = null; $('#toast').classList.remove('show'); haptic.ok(); break;
    case 'settle': {
      const d = debts.find(x => x.id === id);
      if (d) { toggleDebt(d); renderDebts(); renderOverview(); renderAccounts(); haptic.ok(); }
      break;
    }
  }
});

/* ---------- Быстрое добавление по ссылке (кнопка «Действие» на iPhone) ----------
   Сайт:     …/finance/?q=add            → открыть шторку траты
             …/finance/?q=a-450-food     → сразу записать 450 ₽ в «Продукты»
             …/finance/?q=a-450-food-1   → … со счёта №2 (нумерация с 0)
   Telegram: t.me/<бот>/<app>?startapp=a-450-food  — то же самое                    */
const inTelegram = !!tg?.initData;
let startedFromLink = false;
async function handleStartParam() {
  const url = new URL(location.href);
  const sp = tg?.initDataUnsafe?.start_param || url.searchParams.get('q');
  if (!sp) return;
  startedFromLink = true;
  if (url.searchParams.has('q')) history.replaceState(null, '', url.pathname);
  if (sp === 'add') return openSheet('expense');
  const [cmd, amt, cat, accIdx] = sp.split('-');
  const amount = parseInt(amt, 10);
  if (cmd !== 'a' || !amount || !CAT[cat]) return;
  const acc = accounts[+accIdx] || accounts[0];
  const op = addOp('exp', { amount, cat, acc: acc?.id || null, note: '', date: new Date(today) });
  renderAll();
  haptic.ok();
  toast(`−${fmt(amount)} · ${CAT[cat].name}${limitNotice(cat, op.date) ? '. ' + limitNotice(cat, op.date) : ''}`);
  await saveChain;
  if (inTelegram) setTimeout(() => tg.close(), 900);
}

/* ---------- Резервная копия и выгрузка ---------- */
async function shareFile(file, title) {
  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title });
  } else {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file); a.download = file.name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
}
function backupData() {
  const items = {};
  for (const k of Object.keys(chunkIndex)) {
    if (k === '_t') continue;
    let str = '';
    for (let i = 0; i < chunkIndex[k]; i++) str += LS.get(`${k}_${i}`);
    items[k] = str;
  }
  return { app: 'finance', v: 1, created: new Date().toISOString(), items };
}
async function exportBackup() {
  const file = new File([JSON.stringify(backupData())], `finance-backup-${isoDate(new Date())}.json`, { type: 'application/json' });
  try {
    await shareFile(file, 'Резервная копия расходов');
    LS.set('lastBackup', String(Date.now()));
    renderBackupInfo();
    toast('Копия сохранена');
  } catch (e) {
    if (e?.name !== 'AbortError') toast('Не удалось сохранить копию');
  }
}
async function exportCSV() {
  const rows = [['Дата', 'Тип', 'Категория', 'Сумма', 'Счёт', 'Комментарий']];
  [...allOps()].sort((a, b) => (a.date - b.date) || ((a.ts ?? 0) - (b.ts ?? 0))).forEach(op => {
    const type = { exp: 'Расход', inc: 'Доход', tr: 'Перевод' }[op.kind];
    const cat = op.kind === 'exp' ? CAT[op.cat]?.name : op.kind === 'inc' ? ICAT[op.cat]?.name : '';
    const amount = op.kind === 'exp' ? -op.amount : op.amount;
    const acc = op.kind === 'tr' ? `${accName(op.from)} → ${accName(op.to)}` : (ACC(op.acc)?.name || '');
    rows.push([op.date.toLocaleDateString('ru-RU'), type, cat, amount, acc, op.note]);
  });
  const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(';')).join('\r\n');
  const file = new File(['﻿' + csv], `finance-${isoDate(new Date())}.csv`, { type: 'text/csv' });
  try { await shareFile(file, 'Операции'); toast('Файл готов'); }
  catch (e) { if (e?.name !== 'AbortError') toast('Не удалось выгрузить'); }
}
async function importBackup(file) {
  let data;
  try { data = JSON.parse(await file.text()); } catch (e) { return toast('Это не файл копии'); }
  if (data?.app !== 'finance' || !data.items) return toast('Это не файл копии');
  const date = data.created ? shortDate(new Date(data.created)) : '';
  confirmBox(`Восстановить копию${date ? ' от ' + date : ''}? Текущие данные заменятся.`, async () => {
    for (const k of Object.keys(chunkIndex)) if (k !== '_t' && !(k in data.items)) persist(k, '');
    for (const [k, v] of Object.entries(data.items)) persist(k, v);
    await saveChain;
    location.reload();
  });
}
const backupAge = () => { const t = +LS.get('lastBackup'); return t ? Math.floor((Date.now() - t) / 864e5) : null; };
function renderBackupInfo() {
  const el = $('#bkInfo');
  if (!el) return;
  const days = backupAge();
  if (days === null) { el.textContent = 'Копий ещё не было'; el.classList.toggle('warn', accounts.length > 0); return; }
  el.textContent = days === 0 ? 'Последняя копия: сегодня' : `Последняя копия: ${days} ${plural(days, ['день', 'дня', 'дней'])} назад`;
  el.classList.toggle('warn', days >= 14);
}
$('#bkFile').addEventListener('change', e => {
  const f = e.target.files?.[0];
  if (f) importBackup(f);
  e.target.value = '';
});

/* ---------- Старт ---------- */
$$('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon, el.classList.contains('fab') ? 24 : el.classList.contains('icon-btn') ? 18 : 20));
async function boot() {
  try { await load(); } catch (e) { console.error(e); toast('Не удалось загрузить данные'); }
  state.acc = accounts[0]?.id || null;
  processRecurring();
  renderAll();
  renderBackupInfo();
  document.body.classList.remove('loading');
  navigator.storage?.persist?.().catch(() => {});
  await handleStartParam();
  // напоминание о резервной копии
  const age = backupAge();
  if (!startedFromLink && allOps().length > 10 && (age === null || age >= 14)) {
    setTimeout(() => toast('Давно не было резервной копии', 'Сохранить', exportBackup), 1500);
  }
}
if (!window.__NO_BOOT__) boot();