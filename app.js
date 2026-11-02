/* =========================================================
   Расходы — Telegram Mini App
   Хранение: Telegram CloudStorage, хостинг: GitHub Pages
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
  trash: '<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v5M14 11v5"/>',
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
// основные — видны сразу в сетке «+»
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

const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const MONTHS_GEN = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MONTHS_PREP = ['январе','феврале','марте','апреле','мае','июне','июле','августе','сентябре','октябре','ноябре','декабре'];
const WEEKDAYS = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];

/* ---------- Утилиты ---------- */
const fmtNum = n => Math.round(n).toLocaleString('ru-RU');
const fmt = n => fmtNum(n) + ' ₽';
const pad = n => String(n).padStart(2, '0');
const isoDate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const uid = () => Math.random().toString(36).slice(2, 10);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sum = (list, f = x => x.amount) => list.reduce((a, x) => a + f(x), 0);
function plural(n, forms) {
  n = Math.abs(n) % 100; const n1 = n % 10;
  if (n > 10 && n < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}
const pctText = p => p < 1 ? '<1%' : Math.round(p) + '%';

const today = new Date(); today.setHours(0, 0, 0, 0);
const daysAgo = n => new Date(today.getTime() - n * 864e5);
const sameDay = (a, b) => isoDate(a) === isoDate(b);
const shortDate = d => `${d.getDate()} ${MONTHS_GEN[d.getMonth()]}`;
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

const expenses = {};          // { e2026_11: [ {id, ts, amount, cat, acc, note, date} ] }
const incomes = {};           // { i2026_11: [ … то же самое … ] }
const debts = [];             // dir: 'in' — мне должны, 'out' — я должен
const accounts = [];
const ACC = id => accounts.find(a => a.id === id);

const mkey = (y, m) => `e${y}_${pad(m + 1)}`;
const ikey = (y, m) => `i${y}_${pad(m + 1)}`;
function getIncomes(y, m) {
  const k = ikey(y, m);
  return incomes[k] || (incomes[k] = []);
}

// категории доходов
const INCOME_CATS = [
  { id: 'salary',  name: 'Зарплата',   color: '#8fb996', icon: 'wallet' },
  { id: 'stipend', name: 'Стипендия',  color: '#7fb5b0', icon: 'book' },
  { id: 'side',    name: 'Подработка', color: '#9fb88a', icon: 'tech' },
  { id: 'gift_in', name: 'Подарок',    color: '#c9b98f', icon: 'gift' },
  { id: 'refund',  name: 'Возврат',    color: '#8aa6c1', icon: 'repeat' },
  { id: 'in_other',name: 'Другое',     color: '#7a8088', icon: 'dots' },
];
const ICAT = Object.fromEntries(INCOME_CATS.map(c => [c.id, c]));
function getExpenses(y, m) {
  const k = mkey(y, m);
  return expenses[k] || (expenses[k] = []);
}

/* ---------- Хранилище: сначала телефон, потом облако Telegram ----------
   Каждое изменение сразу пишется в память телефона (localStorage) — это мгновенно
   и работает без связи. Затем отправляется в Telegram CloudStorage. Если связь
   плохая — помечаем «есть несинхронизированное» и досылаем всё при следующей записи
   или следующем запуске. При запуске берём более свежую версию (по метке _t).
   У CloudStorage лимит 4096 символов на значение, поэтому большие значения режем
   на куски key_0, key_1 …; количество кусков хранится в ключе "index". */
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
let chunkIndex = {};          // { _t: время, accounts: 1, debts: 1, cats: 1, e2026_11: 2, … }
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

// дослать в облако всё, что лежит на телефоне
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

  // 1) телефон — всегда
  parts.forEach((p, i) => LS.set(`${key}_${i}`, p));
  for (let i = parts.length; i < old; i++) LS.del(`${key}_${i}`);
  LS.set('index', JSON.stringify(chunkIndex));

  // 2) облако — если получится
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
const saveDebts = () => persist('debts', JSON.stringify(debts.map(d => [d.id, d.name, d.amount, d.note, isoDate(d.date), d.closed ? 1 : 0, d.ts || 0, d.dir || 'in'])));
const saveCats = () => persist('cats', JSON.stringify(EXTRA.filter(c => c.custom).map(c => [c.id, c.name, c.color])));
function saveMonth(y, m) {
  const k = mkey(y, m);
  return persist(k, JSON.stringify((expenses[k] || []).map(e => [e.id, e.date.getDate(), e.amount, e.cat, e.acc || '', e.note, e.ts || 0])));
}
function saveIncMonth(y, m) {
  const k = ikey(y, m);
  return persist(k, JSON.stringify((incomes[k] || []).map(e => [e.id, e.date.getDate(), e.amount, e.cat, e.acc || '', e.note, e.ts || 0])));
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
    // берём из облака и обновляем копию на телефоне
    try {
      chunkIndex = cloudIdx;
      raw = await cloud.get(keysOf(chunkIndex));
      Object.entries(raw).forEach(([k, v]) => LS.set(k, v));
      LS.set('index', JSON.stringify(chunkIndex));
    } catch (e) { console.error(e); raw = null; }
  }
  if (!raw && localIdx) {
    // берём с телефона
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
  rebuildCat();
  read('accounts').forEach(([id, name, type, color, balance]) => accounts.push({ id, name, type, color, balance }));
  read('debts').forEach(([id, name, amount, note, date, closed, ts, dir]) => debts.push({ id, name, amount, note, date: ymd(date), closed: !!closed, ts, dir: dir || 'in' }));
  Object.keys(chunkIndex).filter(k => /^e\d{4}_\d{2}$/.test(k)).forEach(k => {
    const y = +k.slice(1, 5), m = +k.slice(6) - 1;
    expenses[k] = read(k).map(([id, d, amount, cat, acc, note, ts]) =>
      ({ id, date: new Date(y, m, d), amount, cat: CAT[cat] ? cat : 'other', acc: acc || null, note, ts }));
  });
  Object.keys(chunkIndex).filter(k => /^i\d{4}_\d{2}$/.test(k)).forEach(k => {
    const y = +k.slice(1, 5), m = +k.slice(6) - 1;
    incomes[k] = read(k).map(([id, d, amount, cat, acc, note, ts]) =>
      ({ id, income: true, date: new Date(y, m, d), amount, cat: ICAT[cat] ? cat : 'in_other', acc: acc || null, note, ts }));
  });
}

/* ---------- Операции с тратами ---------- */
function addExpense({ amount, cat, accId, note, date }) {
  const acc = ACC(accId);
  const y = date.getFullYear(), m = date.getMonth();
  getExpenses(y, m).push({ id: uid(), ts: Date.now(), amount, cat, acc: acc?.id || null, note: note || CAT[cat].name, date });
  saveMonth(y, m);
  if (acc) { acc.balance -= amount; saveAccounts(); }
}
function addIncome({ amount, cat, accId, note, date }) {
  const acc = ACC(accId);
  const y = date.getFullYear(), m = date.getMonth();
  getIncomes(y, m).push({ id: uid(), income: true, ts: Date.now(), amount, cat, acc: acc?.id || null, note: note || ICAT[cat].name, date });
  saveIncMonth(y, m);
  if (acc) { acc.balance += amount; saveAccounts(); }
}
const findOp = id => [...Object.values(expenses), ...Object.values(incomes)].flat().find(x => x.id === id);
// удалить трату или доход и вернуть деньги на счёт
function deleteOp(id) {
  const e = findOp(id);
  if (!e) return;
  const y = e.date.getFullYear(), m = e.date.getMonth();
  const list = e.income ? getIncomes(y, m) : getExpenses(y, m);
  list.splice(list.indexOf(e), 1);
  const acc = ACC(e.acc);
  if (acc) { acc.balance += e.income ? -e.amount : e.amount; saveAccounts(); }
  e.income ? saveIncMonth(y, m) : saveMonth(y, m);
  renderAll();
  haptic.tap();
}
function confirmBox(text, onYes) {
  if (tg?.showConfirm && tg.isVersionAtLeast?.('6.2')) tg.showConfirm(text, ok => ok && onYes());
  else if (window.confirm(text)) onYes();
}

/* ---------- Состояние ---------- */
const state = {
  tab: 'overview',
  month: new Date(today.getFullYear(), today.getMonth(), 1),
  filter: 'all',
  mode: 'expense',
  cat: 'food',
  moreOpen: false,
  acc: null,
  accType: 'card',
  accEdit: false,
  incCat: 'salary',
  debtDir: 'in',      // в шторке
  debtView: 'in',     // на вкладке «Долги»
  editAcc: null,      // id счёта, который редактируем
};
const isCurrentMonth = () => state.month.getFullYear() === today.getFullYear() && state.month.getMonth() === today.getMonth();

/* ---------- Общие куски разметки ---------- */
function catIco(c) {
  return `<div class="cat-ico" style="color:${c.color};background:${c.color}1f">${icon(c.icon, 18)}</div>`;
}
function txHTML(e, withDate) {
  const c = e.income ? ICAT[e.cat] : (CAT[e.cat] || CAT.other);
  return `<div class="tx tappable" data-action="tx" data-id="${e.id}">
    ${catIco(c)}
    <div class="tx-main">
      <div class="tx-title">${esc(e.note)}</div>
      <div class="tx-sub">${esc(c.name)}${withDate ? ' · ' + shortDate(e.date) : ''}</div>
    </div>
    <div class="tx-amt num ${e.income ? 'pos' : ''}">${e.income ? '+' : '−'}${fmt(e.amount)}</div>
  </div>`;
}
const sortDesc = list => [...list].sort((a, b) => (b.date - a.date) || ((b.ts ?? 0) - (a.ts ?? 0)));
function byCategory(list) {
  const m = {};
  list.forEach(e => m[e.cat] = (m[e.cat] || 0) + e.amount);
  return Object.entries(m).sort((a, b) => b[1] - a[1]);
}
const monthList = () => getExpenses(state.month.getFullYear(), state.month.getMonth());
const monthIncome = () => getIncomes(state.month.getFullYear(), state.month.getMonth());

/* ---------- Обзор ---------- */
function renderOverview() {
  const y = state.month.getFullYear(), m = state.month.getMonth();
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
    $('#ovDelta').textContent = total ? 'Нет данных за прошлый месяц' : 'Трат пока нет';
  }

  const inc = sum(monthIncome());
  const net = inc - total;
  $('#ovFlow').innerHTML = `
    <div><span>Доходы</span><b class="num pos">+${fmt(inc)}</b></div>
    <div><span>Итог месяца</span><b class="num ${net >= 0 ? 'pos' : 'neg'}">${net >= 0 ? '+' : '−'}${fmt(Math.abs(net))}</b></div>`;

  // категории: полоска + топ-4 + «остальное»
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

  // мини-карточки
  const owedMe = sum(debts.filter(d => !d.closed && d.dir !== 'out'));
  const iOwe = sum(debts.filter(d => !d.closed && d.dir === 'out'));
  $('#ovDebts').textContent = fmt(owedMe);
  $('#ovDebtsSub').innerHTML = iOwe ? `Я должен <span class="neg">${fmt(iOwe)}</span>` : 'Я никому не должен';
  $('#ovMoney').textContent = fmt(sum(accounts, a => a.balance));
  $('#ovMoneySub').textContent = `${accounts.length} ${plural(accounts.length, ['счёт', 'счёта', 'счетов'])}`;

  const recent = sortDesc([...list, ...monthIncome()]).slice(0, 4);
  $('#ovRecent').innerHTML = recent.length ? recent.map(e => txHTML(e, true)).join('') : `<div class="empty">Пусто</div>`;
}

/* ---------- Траты ---------- */
function renderExpenses() {
  const all = monthList();
  const incList = monthIncome();
  const cats = byCategory(all);
  if (state.filter === 'income' && !incList.length) state.filter = 'all';
  if (!['all', 'income'].includes(state.filter) && !cats.some(([id]) => id === state.filter)) state.filter = 'all';
  const f = state.filter;
  const isInc = f === 'income';

  // круговая диаграмма: траты по категориям, а на фильтре «Доходы» — доходы
  const dCats = isInc ? byCategory(incList) : cats;
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
  if (f === 'all') list = sortDesc([...all, ...incList]);
  else if (isInc) list = sortDesc(incList);
  else list = sortDesc(all.filter(e => e.cat === f));

  if (f === 'all') {
    $('#exTotal').textContent = fmt(sum(all));
    $('#exCount').textContent = `потрачено · ${all.length} ${plural(all.length, ['операция', 'операции', 'операций'])}`;
  } else if (isInc) {
    $('#exTotal').innerHTML = `<span class="pos">+${fmt(dTotal)}</span>`;
    $('#exCount').textContent = `доходы · ${incList.length} ${plural(incList.length, ['операция', 'операции', 'операций'])}`;
  } else {
    const shown = sum(list);
    $('#exTotal').textContent = fmt(shown);
    $('#exCount').textContent = `${CAT[f].name} · ${pctText(shown / sum(all) * 100)}`;
  }

  $('#exChips').innerHTML =
    `<button class="chip ${f === 'all' ? 'active' : ''}" data-action="filter" data-cat="all">Все</button>` +
    (incList.length ? `<button class="chip ${isInc ? 'active' : ''}" data-action="filter" data-cat="income"><i style="background:var(--pos)"></i>Доходы</button>` : '') +
    cats.map(([id]) => `<button class="chip ${f === id ? 'active' : ''}" data-action="filter" data-cat="${id}"><i style="background:${CAT[id].color}"></i>${esc(CAT[id].name)}</button>`).join('');

  const groups = [];
  list.forEach(e => {
    const k = isoDate(e.date);
    let g = groups[groups.length - 1];
    if (!g || g.k !== k) groups.push(g = { k, date: e.date, items: [] });
    g.items.push(e);
  });
  const dayTotals = items => {
    const out = sum(items.filter(e => !e.income)), inn = sum(items.filter(e => e.income));
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
  return `<div class="tx ${d.closed ? 'settled' : ''}">
    <div class="avatar ${out ? 'out' : ''}">${esc(d.name.trim()[0] || '?').toUpperCase()}</div>
    <div class="tx-main">
      <div class="tx-title">${esc(d.name)}</div>
      <div class="tx-sub">${d.note ? esc(d.note) + ' · ' : ''}${shortDate(d.date)}</div>
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
}
function deleteAccount(id) {
  const i = accounts.findIndex(a => a.id === id);
  if (i < 0) return;
  const [removed] = accounts.splice(i, 1);
  if (state.acc === id) state.acc = accounts[0]?.id;
  saveAccounts();
  renderAccounts(); renderOverview();
  haptic.tap();
  toast(`«${removed.name}» удалён`, 'Вернуть', () => {
    accounts.splice(Math.min(i, accounts.length), 0, removed);
    saveAccounts();
    renderAccounts(); renderOverview();
  });
}

/* ---------- Месяц ---------- */
function renderMonthLabels() {
  const y = state.month.getFullYear(), m = state.month.getMonth();
  $$('[data-month-label]').forEach(el => el.innerHTML = `${MONTHS[m]} <span class="year">${y}</span>`);
  $$('[data-action="month"][data-dir="1"]').forEach(b => b.disabled = isCurrentMonth());
}
function shiftMonth(dir) {
  const next = new Date(state.month.getFullYear(), state.month.getMonth() + dir, 1);
  if (next > today) return;
  state.month = next;
  state.filter = 'all';
  haptic.select();
  renderMonthLabels(); renderOverview(); renderExpenses();
}

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

/* ---------- Шторка добавления ---------- */
const sheet = $('#sheet'), backdrop = $('.backdrop');
const fAmount = $('#fAmount'), fName = $('#fName'), fNote = $('#fNote'), fDate = $('#fDate');

function renderCatGrid() {
  // 7 основных + плитка «Другое» (показывает выбранную доп. категорию)
  const extraSel = isExtra(state.cat) ? CAT[state.cat] : null;
  const other = extraSel || { name: 'Другое', color: '#7a8088', icon: 'dots' };
  $('#fCats').innerHTML = CATEGORIES.map(c => `
    <button class="cat-opt ${state.cat === c.id ? 'active' : ''}" data-action="cat" data-cat="${c.id}">
      ${catIco(c)}<span>${c.name}</span>
    </button>`).join('') + `
    <button class="cat-opt ${extraSel || state.moreOpen ? 'active' : ''}" data-action="more">
      ${catIco(other)}<span>${esc(other.name)}</span>
    </button>`;

  $('#fMore').hidden = !state.moreOpen;
  $('#fExtra').innerHTML = EXTRA.map(c =>
    `<button class="chip ${state.cat === c.id ? 'active' : ''}" data-action="cat" data-cat="${c.id}"><i style="background:${c.color}"></i>${esc(c.name)}</button>`
  ).join('') + `<button class="chip dashed" data-action="new-cat">${icon('plus', 14)}Своя</button>`;
}
function renderIncGrid() {
  $('#fIncCats').innerHTML = INCOME_CATS.map(c => `
    <button class="cat-opt ${state.incCat === c.id ? 'active' : ''}" data-action="inc-cat" data-cat="${c.id}">
      ${catIco(c)}<span>${c.name}</span>
    </button>`).join('');
}
function renderDebtDir() {
  $$('#fDebtDir button').forEach(b => b.classList.toggle('active', b.dataset.dir === state.debtDir));
  fName.placeholder = state.debtDir === 'out' ? 'Кому должен' : 'Кто должен';
}
function renderAccPicker() {
  if (!ACC(state.acc)) state.acc = accounts[0]?.id;
  $('#fAccs').innerHTML = accounts.length
    ? accounts.map(a => `<button class="chip ${state.acc === a.id ? 'active' : ''}" data-action="pick-acc" data-id="${a.id}"><i style="background:${a.color}"></i>${esc(a.name)}</button>`).join('')
    : `<span class="muted" style="font-size:13px">Сначала добавь счёт</span>`;
}
function renderTypeGrid() {
  $('#fTypes').innerHTML = ACC_TYPES.map(t => `
    <button class="type-opt ${state.accType === t.id ? 'active' : ''}" data-action="acc-type" data-type="${t.id}">
      ${icon(t.icon, 20)}<span>${t.name}</span>
    </button>`).join('');
}
function setMode(mode) {
  state.mode = mode;
  $$('#fSeg button').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
  $$('[data-for]').forEach(el => el.hidden = !el.dataset.for.split(' ').includes(mode));
  const isAcc = mode === 'account' || mode === 'acc-edit';
  fNote.placeholder = mode === 'debt' ? 'За что' : 'Комментарий';
  fName.placeholder = isAcc ? 'Название счёта' : 'Кто должен';
  $('#fNameIcon').innerHTML = icon(isAcc ? 'wallet' : 'user', 20);
  $('#fAccLabel').textContent = mode === 'income' ? 'Зачислить на счёт' : 'Списать со счёта';
  $('#fSave').textContent = {
    expense: 'Добавить трату', income: 'Добавить доход', debt: 'Записать долг',
    account: 'Добавить счёт', 'acc-edit': 'Сохранить',
  }[mode];
  if (mode === 'expense') renderCatGrid();
  if (mode === 'income') renderIncGrid();
  if (mode === 'expense' || mode === 'income') renderAccPicker();
  if (mode === 'debt') renderDebtDir();
  if (isAcc) renderTypeGrid();
}
function sizeAmount() {
  fAmount.style.width = Math.max(1, fAmount.value.length) + 'ch';
}
function openSheet(mode, accId) {
  fAmount.value = ''; fName.value = ''; fNote.value = ''; fDate.value = isoDate(today);
  $('#fCatName').value = ''; $('#fAddCat').hidden = true;
  state.moreOpen = false;
  state.editAcc = null;
  if (mode === 'debt') state.debtDir = state.tab === 'debts' ? state.debtView : 'in';
  if (mode === 'acc-edit') {
    const a = ACC(accId);
    if (!a) return;
    state.editAcc = a.id;
    state.accType = a.type;
    fAmount.value = Math.abs(a.balance) ? Math.abs(a.balance).toLocaleString('ru-RU') : '';
    fName.value = a.name;
  }
  sizeAmount();
  setMode(mode);
  sheet.classList.add('open'); backdrop.classList.add('open');
  tg?.BackButton?.show();
  haptic.tap();
  if (mode !== 'acc-edit') setTimeout(() => fAmount.focus(), 320);
}
function closeSheet() {
  sheet.classList.remove('open'); backdrop.classList.remove('open');
  document.activeElement?.blur();
  tg?.BackButton?.hide();
}
tg?.BackButton?.onClick(closeSheet);

fAmount.addEventListener('input', () => {
  const digits = fAmount.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 9);
  fAmount.value = digits ? Number(digits).toLocaleString('ru-RU') : '';
  sizeAmount();
});
$('#fCatName').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); createCategory(); } });

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
    EXTRA.splice(EXTRA.length - 1, 0, c); // перед «Прочее»
    rebuildCat();
    saveCats();
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
  const amount = Number(fAmount.value.replace(/\D/g, ''));
  if (!amount && state.mode !== 'account' && state.mode !== 'acc-edit') return shake($('#fAmountWrap'));
  const [y, m, d] = (fDate.value || isoDate(today)).split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const note = fNote.value.trim();

  if (state.mode === 'expense') {
    addExpense({ amount, cat: state.cat, accId: state.acc, note, date });
    if (date <= today) state.month = new Date(y, m - 1, 1);
  } else if (state.mode === 'income') {
    addIncome({ amount, cat: state.incCat, accId: state.acc, note, date });
    if (date <= today) state.month = new Date(y, m - 1, 1);
  } else if (state.mode === 'debt') {
    const name = fName.value.trim();
    if (!name) return shake($('#fNameWrap'));
    debts.push({ id: uid(), ts: Date.now(), name, amount, note, date, closed: false, dir: state.debtDir });
    state.debtView = state.debtDir;
    saveDebts();
  } else if (state.mode === 'acc-edit') {
    const a = ACC(state.editAcc);
    const name = fName.value.trim();
    if (!name) return shake($('#fNameWrap'));
    if (a) { a.name = name; a.type = state.accType; a.balance = amount; saveAccounts(); }
  } else {
    const name = fName.value.trim();
    if (!name) return shake($('#fNameWrap'));
    const usedColors = accounts.map(a => a.color);
    const color = ACC_COLORS.find(c => !usedColors.includes(c)) || ACC_COLORS[accounts.length % ACC_COLORS.length];
    accounts.push({ id: uid(), name, type: state.accType, color, balance: amount });
    if (accounts.length === 1) state.acc = accounts[0].id;
    saveAccounts();
  }
  closeSheet();
  renderAll();
  haptic.ok();
  toast('Сохранено');
}

/* ---------- Уведомление (с кнопкой «Вернуть») ---------- */
let toastTimer, toastAction = null;
function toast(text, actionLabel, action) {
  const t = $('#toast');
  toastAction = action || null;
  t.innerHTML = `<span>${esc(text)}</span>${actionLabel ? `<button data-action="toast-act">${esc(actionLabel)}</button>` : ''}`;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.classList.remove('show'); toastAction = null; }, action ? 4000 : 1600);
}

/* ---------- Клики ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const a = el.dataset.action;
  if (a === 'tab') setTab(el.dataset.tab);
  else if (a === 'month') shiftMonth(+el.dataset.dir);
  else if (a === 'add') openSheet(state.tab === 'debts' ? 'debt' : state.tab === 'accounts' ? 'account' : 'expense');
  else if (a === 'open-acc') openSheet('acc-edit', el.dataset.id);
  else if (a === 'del-acc-sheet') { const id = state.editAcc; closeSheet(); deleteAccount(id); }
  else if (a === 'inc-cat') { state.incCat = el.dataset.cat; renderIncGrid(); haptic.select(); }
  else if (a === 'debt-dir') { state.debtDir = el.dataset.dir; renderDebtDir(); haptic.select(); }
  else if (a === 'debt-view') { state.debtView = el.dataset.view; renderDebts(); haptic.select(); }
  else if (a === 'add-account') openSheet('account');
  else if (a === 'backup') exportBackup();
  else if (a === 'restore') $('#bkFile').click();
  else if (a === 'close') closeSheet();
  else if (a === 'save') save();
  else if (a === 'seg') { setMode(el.dataset.mode); haptic.select(); }
  else if (a === 'cat') { state.cat = el.dataset.cat; state.moreOpen = false; $('#fAddCat').hidden = true; renderCatGrid(); haptic.select(); }
  else if (a === 'more') { state.moreOpen = !state.moreOpen; if (!state.moreOpen) $('#fAddCat').hidden = true; renderCatGrid(); haptic.select(); }
  else if (a === 'new-cat') { $('#fAddCat').hidden = false; $('#fCatName').focus(); haptic.tap(); }
  else if (a === 'create-cat') createCategory();
  else if (a === 'pick-acc') { state.acc = el.dataset.id; renderAccPicker(); haptic.select(); }
  else if (a === 'acc-type') { state.accType = el.dataset.type; renderTypeGrid(); haptic.select(); }
  else if (a === 'filter') { state.filter = el.dataset.cat === state.filter ? 'all' : el.dataset.cat; renderExpenses(); haptic.select(); }
  else if (a === 'acc-edit') { state.accEdit = !state.accEdit; renderAccounts(); haptic.select(); }
  else if (a === 'del-acc') deleteAccount(el.dataset.id);
  else if (a === 'tx') {
    const e = findOp(el.dataset.id);
    if (e) confirmBox(`Удалить ${e.income ? 'доход' : 'трату'} «${e.note}» на ${fmtNum(e.amount)} ₽?`, () => deleteOp(e.id));
  }
  else if (a === 'toast-act') { toastAction?.(); toastAction = null; $('#toast').classList.remove('show'); haptic.ok(); }
  else if (a === 'settle') {
    const d = debts.find(x => x.id === el.dataset.id);
    if (d) { d.closed = !d.closed; saveDebts(); renderDebts(); renderOverview(); haptic.ok(); }
  }
});

/* ---------- Быстрое добавление по ссылке (кнопка «Действие» на iPhone) ----------
   Сайт:     …/finance/?q=add            → открыть шторку траты
             …/finance/?q=a-450-food     → сразу записать 450 ₽ в «Продукты»
             …/finance/?q=a-450-food-1   → … со счёта №2 (нумерация с 0)
   Telegram: t.me/<бот>/<app>?startapp=a-450-food  — то же самое                    */
const inTelegram = !!tg?.initData;
async function handleStartParam() {
  const url = new URL(location.href);
  const sp = tg?.initDataUnsafe?.start_param || url.searchParams.get('q');
  if (!sp) return;
  if (url.searchParams.has('q')) history.replaceState(null, '', url.pathname); // чтобы обновление страницы не добавило трату ещё раз
  if (sp === 'add') return openSheet('expense');
  const [cmd, amt, cat, accIdx] = sp.split('-');
  const amount = parseInt(amt, 10);
  if (cmd !== 'a' || !amount || !CAT[cat]) return;
  const acc = accounts[+accIdx] || accounts[0];
  addExpense({ amount, cat, accId: acc?.id, note: '', date: new Date(today) });
  renderAll();
  haptic.ok();
  toast(`−${fmt(amount)} · ${CAT[cat].name}`);
  await saveChain;
  if (inTelegram) setTimeout(() => tg.close(), 900);
}

/* ---------- Резервная копия ---------- */
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
  const name = `finance-backup-${isoDate(new Date())}.json`;
  const file = new File([JSON.stringify(backupData())], name, { type: 'application/json' });
  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: 'Резервная копия расходов' });
    } else {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(file); a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    }
    LS.set('lastBackup', String(Date.now()));
    renderBackupInfo();
    toast('Копия сохранена');
  } catch (e) {
    if (e?.name !== 'AbortError') toast('Не удалось сохранить копию');
  }
}
async function importBackup(file) {
  let data;
  try { data = JSON.parse(await file.text()); } catch (e) { return toast('Это не файл копии'); }
  if (data?.app !== 'finance' || !data.items) return toast('Это не файл копии');
  const date = data.created ? shortDate(new Date(data.created)) : '';
  confirmBox(`Восстановить копию${date ? ' от ' + date : ''}? Текущие данные заменятся.`, async () => {
    // удаляем то, чего нет в копии, и записываем всё из копии
    for (const k of Object.keys(chunkIndex)) if (k !== '_t' && !(k in data.items)) persist(k, '');
    for (const [k, v] of Object.entries(data.items)) persist(k, v);
    await saveChain;
    location.reload();
  });
}
function renderBackupInfo() {
  const el = $('#bkInfo');
  if (!el) return;
  const t = +LS.get('lastBackup');
  if (!t) { el.textContent = 'Копий ещё не было'; el.classList.toggle('warn', accounts.length > 0); return; }
  const days = Math.floor((Date.now() - t) / 864e5);
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
(async () => {
  try { await load(); } catch (e) { console.error(e); toast('Не удалось загрузить данные'); }
  state.acc = accounts[0]?.id || null;
  renderAll();
  renderBackupInfo();
  document.body.classList.remove('loading');
  navigator.storage?.persist?.().catch(() => {});   // просим браузер не чистить данные
  handleStartParam();
})();
