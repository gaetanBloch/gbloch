const f = { context: void 0, registry: void 0 };
function _(e) {
  f.context = e;
}
function W() {
  return { ...f.context, id: `${f.context.id}${f.context.count++}-`, count: 0 };
}
const K = (e, n) => e === n,
  D = { equals: K };
let Q = I;
const w = 1,
  S = 2,
  O = { owned: null, cleanups: null, context: null, owner: null };
var p = null;
let $ = null,
  c = null,
  d = null,
  y = null,
  v = 0;
function X(e, n) {
  const t = c,
    s = p,
    i = e.length === 0,
    o = n === void 0 ? s : n,
    r = i ? O : { owned: null, cleanups: null, context: o ? o.context : null, owner: o },
    l = i ? e : () => e(() => b(() => m(r)));
  (p = r), (c = null);
  try {
    return A(l, !0);
  } finally {
    (c = t), (p = s);
  }
}
function re(e, n) {
  n = n ? Object.assign({}, D, n) : D;
  const t = { value: e, observers: null, observerSlots: null, comparator: n.equals || void 0 },
    s = i => (typeof i == 'function' && (i = i(t.value)), Y(t, i));
  return [J.bind(t), s];
}
function N(e, n, t) {
  const s = k(e, n, !1, w);
  q(s);
}
function b(e) {
  if (c === null) return e();
  const n = c;
  c = null;
  try {
    return e();
  } finally {
    c = n;
  }
}
function J() {
  if (this.sources && this.state)
    if (this.state === w) q(this);
    else {
      const e = d;
      (d = null), A(() => E(this), !1), (d = e);
    }
  if (c) {
    const e = this.observers ? this.observers.length : 0;
    c.sources
      ? (c.sources.push(this), c.sourceSlots.push(e))
      : ((c.sources = [this]), (c.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(c), this.observerSlots.push(c.sources.length - 1))
        : ((this.observers = [c]), (this.observerSlots = [c.sources.length - 1]));
  }
  return this.value;
}
function Y(e, n, t) {
  let s = e.value;
  return (
    (!e.comparator || !e.comparator(s, n)) &&
      ((e.value = n),
      e.observers &&
        e.observers.length &&
        A(() => {
          for (let i = 0; i < e.observers.length; i += 1) {
            const o = e.observers[i],
              r = $ && $.running;
            r && $.disposed.has(o),
              (r ? !o.tState : !o.state) && (o.pure ? d.push(o) : y.push(o), o.observers && M(o)),
              r || (o.state = w);
          }
          if (d.length > 1e6) throw ((d = []), new Error());
        }, !1)),
    n
  );
}
function q(e) {
  if (!e.fn) return;
  m(e);
  const n = v;
  Z(e, e.value, n);
}
function Z(e, n, t) {
  let s;
  const i = p,
    o = c;
  c = p = e;
  try {
    s = e.fn(n);
  } catch (r) {
    return (
      e.pure && ((e.state = w), e.owned && e.owned.forEach(m), (e.owned = null)),
      (e.updatedAt = t + 1),
      F(r)
    );
  } finally {
    (c = o), (p = i);
  }
  (!e.updatedAt || e.updatedAt <= t) &&
    (e.updatedAt != null && 'observers' in e ? Y(e, s) : (e.value = s), (e.updatedAt = t));
}
function k(e, n, t, s = w, i) {
  const o = {
    fn: e,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: n,
    owner: p,
    context: p ? p.context : null,
    pure: t,
  };
  return p === null || (p !== O && (p.owned ? p.owned.push(o) : (p.owned = [o]))), o;
}
function j(e) {
  if (e.state === 0) return;
  if (e.state === S) return E(e);
  if (e.suspense && b(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < v); ) e.state && n.push(e);
  for (let t = n.length - 1; t >= 0; t--)
    if (((e = n[t]), e.state === w)) q(e);
    else if (e.state === S) {
      const s = d;
      (d = null), A(() => E(e, n[0]), !1), (d = s);
    }
}
function A(e, n) {
  if (d) return e();
  let t = !1;
  n || (d = []), y ? (t = !0) : (y = []), v++;
  try {
    const s = e();
    return z(t), s;
  } catch (s) {
    t || (y = null), (d = null), F(s);
  }
}
function z(e) {
  if ((d && (I(d), (d = null)), e)) return;
  const n = y;
  (y = null), n.length && A(() => Q(n), !1);
}
function I(e) {
  for (let n = 0; n < e.length; n++) j(e[n]);
}
function E(e, n) {
  e.state = 0;
  for (let t = 0; t < e.sources.length; t += 1) {
    const s = e.sources[t];
    if (s.sources) {
      const i = s.state;
      i === w ? s !== n && (!s.updatedAt || s.updatedAt < v) && j(s) : i === S && E(s, n);
    }
  }
}
function M(e) {
  for (let n = 0; n < e.observers.length; n += 1) {
    const t = e.observers[n];
    t.state || ((t.state = S), t.pure ? d.push(t) : y.push(t), t.observers && M(t));
  }
}
function m(e) {
  let n;
  if (e.sources)
    for (; e.sources.length; ) {
      const t = e.sources.pop(),
        s = e.sourceSlots.pop(),
        i = t.observers;
      if (i && i.length) {
        const o = i.pop(),
          r = t.observerSlots.pop();
        s < i.length && ((o.sourceSlots[r] = s), (i[s] = o), (t.observerSlots[s] = r));
      }
    }
  if (e.owned) {
    for (n = e.owned.length - 1; n >= 0; n--) m(e.owned[n]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (n = e.cleanups.length - 1; n >= 0; n--) e.cleanups[n]();
    e.cleanups = null;
  }
  e.state = 0;
}
function ee(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == 'string' ? e : 'Unknown error', { cause: e });
}
function F(e, n = p) {
  throw ee(e);
}
let R = !1;
function te() {
  R = !0;
}
function fe(e, n) {
  if (R && f.context) {
    const t = f.context;
    _(W());
    const s = b(() => e(n || {}));
    return _(t), s;
  }
  return b(() => e(n || {}));
}
function ne(e, n, t) {
  let s = t.length,
    i = n.length,
    o = s,
    r = 0,
    l = 0,
    a = n[i - 1].nextSibling,
    u = null;
  for (; r < i || l < o; ) {
    if (n[r] === t[l]) {
      r++, l++;
      continue;
    }
    for (; n[i - 1] === t[o - 1]; ) i--, o--;
    if (i === r) {
      const h = o < s ? (l ? t[l - 1].nextSibling : t[o - l]) : a;
      for (; l < o; ) e.insertBefore(t[l++], h);
    } else if (o === l) for (; r < i; ) (!u || !u.has(n[r])) && n[r].remove(), r++;
    else if (n[r] === t[o - 1] && t[l] === n[i - 1]) {
      const h = n[--i].nextSibling;
      e.insertBefore(t[l++], n[r++].nextSibling), e.insertBefore(t[--o], h), (n[i] = t[o]);
    } else {
      if (!u) {
        u = new Map();
        let g = l;
        for (; g < o; ) u.set(t[g], g++);
      }
      const h = u.get(n[r]);
      if (h != null)
        if (l < h && h < o) {
          let g = r,
            T = 1,
            B;
          for (; ++g < i && g < o && !((B = u.get(n[g])) == null || B !== h + T); ) T++;
          if (T > h - l) {
            const V = n[r];
            for (; l < h; ) e.insertBefore(t[l++], V);
          } else e.replaceChild(t[l++], n[r++]);
        } else r++;
      else n[r++].remove();
    }
  }
}
const L = '_$DX_DELEGATE';
function se(e, n, t, s = {}) {
  let i;
  return (
    X(o => {
      (i = o), n === document ? e() : ie(n, e(), n.firstChild ? null : void 0, t);
    }, s.owner),
    () => {
      i(), (n.textContent = '');
    }
  );
}
function ue(e, n, t) {
  let s;
  const i = () => {
      const r = document.createElement('template');
      return (r.innerHTML = e), t ? r.content.firstChild.firstChild : r.content.firstChild;
    },
    o = n
      ? () => b(() => document.importNode(s || (s = i()), !0))
      : () => (s || (s = i())).cloneNode(!0);
  return (o.cloneNode = o), o;
}
function ce(e, n = window.document) {
  const t = n[L] || (n[L] = new Set());
  for (let s = 0, i = e.length; s < i; s++) {
    const o = e[s];
    t.has(o) || (t.add(o), n.addEventListener(o, G));
  }
}
function ae(e, n) {
  f.context || (n == null ? e.removeAttribute('class') : (e.className = n));
}
function ie(e, n, t, s) {
  if ((t !== void 0 && !s && (s = []), typeof n != 'function')) return C(e, n, s, t);
  N(i => C(e, n(), i, t), s);
}
function le(e, n, t = {}) {
  (f.completed = globalThis._$HY.completed),
    (f.events = globalThis._$HY.events),
    (f.load = i => globalThis._$HY.r[i]),
    (f.has = i => i in globalThis._$HY.r),
    (f.gather = i => U(n, i)),
    (f.registry = new Map()),
    (f.context = { id: t.renderId || '', count: 0 }),
    U(n, t.renderId);
  const s = se(e, n, [...n.childNodes], t);
  return (f.context = null), s;
}
function he(e) {
  let n, t;
  return !f.context || !(n = f.registry.get((t = oe())))
    ? e()
    : (f.completed && f.completed.add(n), f.registry.delete(t), n);
}
function de() {
  f.events &&
    !f.events.queued &&
    (queueMicrotask(() => {
      const { completed: e, events: n } = f;
      for (n.queued = !1; n.length; ) {
        const [t, s] = n[0];
        if (!e.has(t)) return;
        G(s), n.shift();
      }
    }),
    (f.events.queued = !0));
}
function G(e) {
  const n = `$$${e.type}`;
  let t = (e.composedPath && e.composedPath()[0]) || e.target;
  for (
    e.target !== t && Object.defineProperty(e, 'target', { configurable: !0, value: t }),
      Object.defineProperty(e, 'currentTarget', {
        configurable: !0,
        get() {
          return t || document;
        },
      }),
      f.registry && !f.done && (f.done = _$HY.done = !0);
    t;

  ) {
    const s = t[n];
    if (s && !t.disabled) {
      const i = t[`${n}Data`];
      if ((i !== void 0 ? s.call(t, i, e) : s.call(t, e), e.cancelBubble)) return;
    }
    t = t._$host || t.parentNode || t.host;
  }
}
function C(e, n, t, s, i) {
  if (f.context) {
    !t && (t = [...e.childNodes]);
    let l = [];
    for (let a = 0; a < t.length; a++) {
      const u = t[a];
      u.nodeType === 8 && u.data.slice(0, 2) === '!$' ? u.remove() : l.push(u);
    }
    t = l;
  }
  for (; typeof t == 'function'; ) t = t();
  if (n === t) return t;
  const o = typeof n,
    r = s !== void 0;
  if (((e = (r && t[0] && t[0].parentNode) || e), o === 'string' || o === 'number')) {
    if (f.context) return t;
    if ((o === 'number' && (n = n.toString()), r)) {
      let l = t[0];
      l && l.nodeType === 3 ? (l.data = n) : (l = document.createTextNode(n)), (t = x(e, t, s, l));
    } else t !== '' && typeof t == 'string' ? (t = e.firstChild.data = n) : (t = e.textContent = n);
  } else if (n == null || o === 'boolean') {
    if (f.context) return t;
    t = x(e, t, s);
  } else {
    if (o === 'function')
      return (
        N(() => {
          let l = n();
          for (; typeof l == 'function'; ) l = l();
          t = C(e, l, t, s);
        }),
        () => t
      );
    if (Array.isArray(n)) {
      const l = [],
        a = t && Array.isArray(t);
      if (H(l, n, t, i)) return N(() => (t = C(e, l, t, s, !0))), () => t;
      if (f.context) {
        if (!l.length) return t;
        if (s === void 0) return [...e.childNodes];
        let u = l[0],
          h = [u];
        for (; (u = u.nextSibling) !== s; ) h.push(u);
        return (t = h);
      }
      if (l.length === 0) {
        if (((t = x(e, t, s)), r)) return t;
      } else a ? (t.length === 0 ? P(e, l, s) : ne(e, t, l)) : (t && x(e), P(e, l));
      t = l;
    } else if (n.nodeType) {
      if (f.context && n.parentNode) return (t = r ? [n] : n);
      if (Array.isArray(t)) {
        if (r) return (t = x(e, t, s, n));
        x(e, t, null, n);
      } else
        t == null || t === '' || !e.firstChild ? e.appendChild(n) : e.replaceChild(n, e.firstChild);
      t = n;
    }
  }
  return t;
}
function H(e, n, t, s) {
  let i = !1;
  for (let o = 0, r = n.length; o < r; o++) {
    let l = n[o],
      a = t && t[o],
      u;
    if (!(l == null || l === !0 || l === !1))
      if ((u = typeof l) == 'object' && l.nodeType) e.push(l);
      else if (Array.isArray(l)) i = H(e, l, a) || i;
      else if (u === 'function')
        if (s) {
          for (; typeof l == 'function'; ) l = l();
          i = H(e, Array.isArray(l) ? l : [l], Array.isArray(a) ? a : [a]) || i;
        } else e.push(l), (i = !0);
      else {
        const h = String(l);
        a && a.nodeType === 3 && a.data === h ? e.push(a) : e.push(document.createTextNode(h));
      }
  }
  return i;
}
function P(e, n, t = null) {
  for (let s = 0, i = n.length; s < i; s++) e.insertBefore(n[s], t);
}
function x(e, n, t, s) {
  if (t === void 0) return (e.textContent = '');
  const i = s || document.createTextNode('');
  if (n.length) {
    let o = !1;
    for (let r = n.length - 1; r >= 0; r--) {
      const l = n[r];
      if (i !== l) {
        const a = l.parentNode === e;
        !o && !r ? (a ? e.replaceChild(i, l) : e.insertBefore(i, t)) : a && l.remove();
      } else o = !0;
    }
  } else e.insertBefore(i, t);
  return [i];
}
function U(e, n) {
  const t = e.querySelectorAll('*[data-hk]');
  for (let s = 0; s < t.length; s++) {
    const i = t[s],
      o = i.getAttribute('data-hk');
    (!n || o.startsWith(n)) && !f.registry.has(o) && f.registry.set(o, i);
  }
}
function oe() {
  const e = f.context;
  return `${e.id}${e.count++}`;
}
const pe = (...e) => (te(), le(...e));
export { N as a, ae as b, re as c, ce as d, se as e, fe as f, he as g, pe as h, de as r, ue as t };
