import { d as fe, c as ge, g as ce, a as he, r as de, b as pe, t as me } from './web.0758af0d.js';
/* empty css                       */ const re = {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ja'],
    i18nextServer: { debug: !0 },
    i18nextBrowser: { debug: !0 },
    flatRoutes: {},
    showDefaultLocale: !1,
    trailingSlash: 'never',
  },
  ye = {
    type: 'logger',
    log(i) {
      this.output('log', i);
    },
    warn(i) {
      this.output('warn', i);
    },
    error(i) {
      this.output('error', i);
    },
    output(i, e) {
      console && console[i] && console[i].apply(console, e);
    },
  };
class K {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(e, t);
  }
  init(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    (this.prefix = t.prefix || 'i18next:'),
      (this.logger = e || ye),
      (this.options = t),
      (this.debug = t.debug);
  }
  log() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return this.forward(t, 'log', '', !0);
  }
  warn() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return this.forward(t, 'warn', '', !0);
  }
  error() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return this.forward(t, 'error', '');
  }
  deprecate() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return this.forward(t, 'warn', 'WARNING DEPRECATED: ', !0);
  }
  forward(e, t, n, s) {
    return s && !this.debug
      ? null
      : (typeof e[0] == 'string' && (e[0] = `${n}${this.prefix} ${e[0]}`), this.logger[t](e));
  }
  create(e) {
    return new K(this.logger, { prefix: `${this.prefix}:${e}:`, ...this.options });
  }
  clone(e) {
    return (e = e || this.options), (e.prefix = e.prefix || this.prefix), new K(this.logger, e);
  }
}
var N = new K();
class z {
  constructor() {
    this.observers = {};
  }
  on(e, t) {
    return (
      e.split(' ').forEach(n => {
        (this.observers[n] = this.observers[n] || []), this.observers[n].push(t);
      }),
      this
    );
  }
  off(e, t) {
    if (this.observers[e]) {
      if (!t) {
        delete this.observers[e];
        return;
      }
      this.observers[e] = this.observers[e].filter(n => n !== t);
    }
  }
  emit(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
      n[s - 1] = arguments[s];
    this.observers[e] &&
      [].concat(this.observers[e]).forEach(a => {
        a(...n);
      }),
      this.observers['*'] &&
        [].concat(this.observers['*']).forEach(a => {
          a.apply(a, [e, ...n]);
        });
  }
}
function F() {
  let i, e;
  const t = new Promise((n, s) => {
    (i = n), (e = s);
  });
  return (t.resolve = i), (t.reject = e), t;
}
function Z(i) {
  return i == null ? '' : '' + i;
}
function be(i, e, t) {
  i.forEach(n => {
    e[n] && (t[n] = e[n]);
  });
}
function W(i, e, t) {
  function n(a) {
    return a && a.indexOf('###') > -1 ? a.replace(/###/g, '.') : a;
  }
  function s() {
    return !i || typeof i == 'string';
  }
  const r = typeof e != 'string' ? [].concat(e) : e.split('.');
  for (; r.length > 1; ) {
    if (s()) return {};
    const a = n(r.shift());
    !i[a] && t && (i[a] = new t()),
      Object.prototype.hasOwnProperty.call(i, a) ? (i = i[a]) : (i = {});
  }
  return s() ? {} : { obj: i, k: n(r.shift()) };
}
function X(i, e, t) {
  const { obj: n, k: s } = W(i, e, Object);
  n[s] = t;
}
function xe(i, e, t, n) {
  const { obj: s, k: r } = W(i, e, Object);
  (s[r] = s[r] || []), n && (s[r] = s[r].concat(t)), n || s[r].push(t);
}
function U(i, e) {
  const { obj: t, k: n } = W(i, e);
  if (t) return t[n];
}
function Se(i, e, t) {
  const n = U(i, t);
  return n !== void 0 ? n : U(e, t);
}
function ae(i, e, t) {
  for (const n in e)
    n !== '__proto__' &&
      n !== 'constructor' &&
      (n in i
        ? typeof i[n] == 'string' ||
          i[n] instanceof String ||
          typeof e[n] == 'string' ||
          e[n] instanceof String
          ? t && (i[n] = e[n])
          : ae(i[n], e[n], t)
        : (i[n] = e[n]));
  return i;
}
function P(i) {
  return i.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
var Le = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;' };
function ve(i) {
  return typeof i == 'string' ? i.replace(/[&<>"'\/]/g, e => Le[e]) : i;
}
const Oe = [' ', ',', '?', '!', ';'];
function we(i, e, t) {
  (e = e || ''), (t = t || '');
  const n = Oe.filter(a => e.indexOf(a) < 0 && t.indexOf(a) < 0);
  if (n.length === 0) return !0;
  const s = new RegExp(`(${n.map(a => (a === '?' ? '\\?' : a)).join('|')})`);
  let r = !s.test(i);
  if (!r) {
    const a = i.indexOf(t);
    a > 0 && !s.test(i.substring(0, a)) && (r = !0);
  }
  return r;
}
function M(i, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : '.';
  if (!i) return;
  if (i[e]) return i[e];
  const n = e.split(t);
  let s = i;
  for (let r = 0; r < n.length; ++r) {
    if (!s || (typeof s[n[r]] == 'string' && r + 1 < n.length)) return;
    if (s[n[r]] === void 0) {
      let a = 2,
        o = n.slice(r, r + a).join(t),
        l = s[o];
      for (; l === void 0 && n.length > r + a; ) a++, (o = n.slice(r, r + a).join(t)), (l = s[o]);
      if (l === void 0) return;
      if (l === null) return null;
      if (e.endsWith(o)) {
        if (typeof l == 'string') return l;
        if (o && typeof l[o] == 'string') return l[o];
      }
      const f = n.slice(r + a).join(t);
      return f ? M(l, f, t) : void 0;
    }
    s = s[n[r]];
  }
  return s;
}
function H(i) {
  return i && i.indexOf('_') > 0 ? i.replace('_', '-') : i;
}
class q extends z {
  constructor(e) {
    let t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : { ns: ['translation'], defaultNS: 'translation' };
    super(),
      (this.data = e || {}),
      (this.options = t),
      this.options.keySeparator === void 0 && (this.options.keySeparator = '.'),
      this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(e) {
    this.options.ns.indexOf(e) < 0 && this.options.ns.push(e);
  }
  removeNamespaces(e) {
    const t = this.options.ns.indexOf(e);
    t > -1 && this.options.ns.splice(t, 1);
  }
  getResource(e, t, n) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const r = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator,
      a =
        s.ignoreJSONStructure !== void 0 ? s.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let o = [e, t];
    n && typeof n != 'string' && (o = o.concat(n)),
      n && typeof n == 'string' && (o = o.concat(r ? n.split(r) : n)),
      e.indexOf('.') > -1 && (o = e.split('.'));
    const l = U(this.data, o);
    return l || !a || typeof n != 'string'
      ? l
      : M(this.data && this.data[e] && this.data[e][t], n, r);
  }
  addResource(e, t, n, s) {
    let r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : { silent: !1 };
    const a = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator;
    let o = [e, t];
    n && (o = o.concat(a ? n.split(a) : n)),
      e.indexOf('.') > -1 && ((o = e.split('.')), (s = t), (t = o[1])),
      this.addNamespaces(t),
      X(this.data, o, s),
      r.silent || this.emit('added', e, t, n, s);
  }
  addResources(e, t, n) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : { silent: !1 };
    for (const r in n)
      (typeof n[r] == 'string' || Object.prototype.toString.apply(n[r]) === '[object Array]') &&
        this.addResource(e, t, r, n[r], { silent: !0 });
    s.silent || this.emit('added', e, t, n);
  }
  addResourceBundle(e, t, n, s, r) {
    let a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : { silent: !1 },
      o = [e, t];
    e.indexOf('.') > -1 && ((o = e.split('.')), (s = n), (n = t), (t = o[1])),
      this.addNamespaces(t);
    let l = U(this.data, o) || {};
    s ? ae(l, n, r) : (l = { ...l, ...n }),
      X(this.data, o, l),
      a.silent || this.emit('added', e, t, n);
  }
  removeResourceBundle(e, t) {
    this.hasResourceBundle(e, t) && delete this.data[e][t],
      this.removeNamespaces(t),
      this.emit('removed', e, t);
  }
  hasResourceBundle(e, t) {
    return this.getResource(e, t) !== void 0;
  }
  getResourceBundle(e, t) {
    return (
      t || (t = this.options.defaultNS),
      this.options.compatibilityAPI === 'v1'
        ? { ...this.getResource(e, t) }
        : this.getResource(e, t)
    );
  }
  getDataByLanguage(e) {
    return this.data[e];
  }
  hasLanguageSomeTranslations(e) {
    const t = this.getDataByLanguage(e);
    return !!((t && Object.keys(t)) || []).find(s => t[s] && Object.keys(t[s]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var oe = {
  processors: {},
  addPostProcessor(i) {
    this.processors[i.name] = i;
  },
  handle(i, e, t, n, s) {
    return (
      i.forEach(r => {
        this.processors[r] && (e = this.processors[r].process(e, t, n, s));
      }),
      e
    );
  },
};
const _ = {};
class J extends z {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(),
      be(
        [
          'resourceStore',
          'languageUtils',
          'pluralResolver',
          'interpolator',
          'backendConnector',
          'i18nFormat',
          'utils',
        ],
        e,
        this,
      ),
      (this.options = t),
      this.options.keySeparator === void 0 && (this.options.keySeparator = '.'),
      (this.logger = N.create('translator'));
  }
  changeLanguage(e) {
    e && (this.language = e);
  }
  exists(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { interpolation: {} };
    if (e == null) return !1;
    const n = this.resolve(e, t);
    return n && n.res !== void 0;
  }
  extractFromKey(e, t) {
    let n = t.nsSeparator !== void 0 ? t.nsSeparator : this.options.nsSeparator;
    n === void 0 && (n = ':');
    const s = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator;
    let r = t.ns || this.options.defaultNS || [];
    const a = n && e.indexOf(n) > -1,
      o =
        !this.options.userDefinedKeySeparator &&
        !t.keySeparator &&
        !this.options.userDefinedNsSeparator &&
        !t.nsSeparator &&
        !we(e, n, s);
    if (a && !o) {
      const l = e.match(this.interpolator.nestingRegexp);
      if (l && l.length > 0) return { key: e, namespaces: r };
      const f = e.split(n);
      (n !== s || (n === s && this.options.ns.indexOf(f[0]) > -1)) && (r = f.shift()),
        (e = f.join(s));
    }
    return typeof r == 'string' && (r = [r]), { key: e, namespaces: r };
  }
  translate(e, t, n) {
    if (
      (typeof t != 'object' &&
        this.options.overloadTranslationOptionHandler &&
        (t = this.options.overloadTranslationOptionHandler(arguments)),
      typeof t == 'object' && (t = { ...t }),
      t || (t = {}),
      e == null)
    )
      return '';
    Array.isArray(e) || (e = [String(e)]);
    const s = t.returnDetails !== void 0 ? t.returnDetails : this.options.returnDetails,
      r = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator,
      { key: a, namespaces: o } = this.extractFromKey(e[e.length - 1], t),
      l = o[o.length - 1],
      f = t.lng || this.language,
      g = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (f && f.toLowerCase() === 'cimode') {
      if (g) {
        const y = t.nsSeparator || this.options.nsSeparator;
        return s
          ? {
              res: `${l}${y}${a}`,
              usedKey: a,
              exactUsedKey: a,
              usedLng: f,
              usedNS: l,
              usedParams: this.getUsedParamsDetails(t),
            }
          : `${l}${y}${a}`;
      }
      return s
        ? {
            res: a,
            usedKey: a,
            exactUsedKey: a,
            usedLng: f,
            usedNS: l,
            usedParams: this.getUsedParamsDetails(t),
          }
        : a;
    }
    const c = this.resolve(e, t);
    let u = c && c.res;
    const d = (c && c.usedKey) || a,
      h = (c && c.exactUsedKey) || a,
      p = Object.prototype.toString.apply(u),
      m = ['[object Number]', '[object Function]', '[object RegExp]'],
      L = t.joinArrays !== void 0 ? t.joinArrays : this.options.joinArrays,
      x = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (
      x &&
      u &&
      typeof u != 'string' &&
      typeof u != 'boolean' &&
      typeof u != 'number' &&
      m.indexOf(p) < 0 &&
      !(typeof L == 'string' && p === '[object Array]')
    ) {
      if (!t.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler ||
          this.logger.warn('accessing an object - but returnObjects options is not enabled!');
        const y = this.options.returnedObjectHandler
          ? this.options.returnedObjectHandler(d, u, { ...t, ns: o })
          : `key '${a} (${this.language})' returned an object instead of string.`;
        return s ? ((c.res = y), (c.usedParams = this.getUsedParamsDetails(t)), c) : y;
      }
      if (r) {
        const y = p === '[object Array]',
          v = y ? [] : {},
          w = y ? h : d;
        for (const S in u)
          if (Object.prototype.hasOwnProperty.call(u, S)) {
            const A = `${w}${r}${S}`;
            (v[S] = this.translate(A, { ...t, joinArrays: !1, ns: o })),
              v[S] === A && (v[S] = u[S]);
          }
        u = v;
      }
    } else if (x && typeof L == 'string' && p === '[object Array]')
      (u = u.join(L)), u && (u = this.extendTranslation(u, e, t, n));
    else {
      let y = !1,
        v = !1;
      const w = t.count !== void 0 && typeof t.count != 'string',
        S = J.hasDefaultValue(t),
        A = w ? this.pluralResolver.getSuffix(f, t.count, t) : '',
        le = t.ordinal && w ? this.pluralResolver.getSuffix(f, t.count, { ordinal: !1 }) : '',
        C = t[`defaultValue${A}`] || t[`defaultValue${le}`] || t.defaultValue;
      !this.isValidLookup(u) && S && ((y = !0), (u = C)),
        this.isValidLookup(u) || ((v = !0), (u = a));
      const ue =
          (t.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && v
            ? void 0
            : u,
        k = S && C !== u && this.options.updateMissing;
      if (v || y || k) {
        if ((this.logger.log(k ? 'updateKey' : 'missingKey', f, l, a, k ? C : u), r)) {
          const O = this.resolve(a, { ...t, keySeparator: !1 });
          O &&
            O.res &&
            this.logger.warn(
              'Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.',
            );
        }
        let j = [];
        const T = this.languageUtils.getFallbackCodes(
          this.options.fallbackLng,
          t.lng || this.language,
        );
        if (this.options.saveMissingTo === 'fallback' && T && T[0])
          for (let O = 0; O < T.length; O++) j.push(T[O]);
        else
          this.options.saveMissingTo === 'all'
            ? (j = this.languageUtils.toResolveHierarchy(t.lng || this.language))
            : j.push(t.lng || this.language);
        const Y = (O, R, G) => {
          const Q = S && G !== u ? G : ue;
          this.options.missingKeyHandler
            ? this.options.missingKeyHandler(O, l, R, Q, k, t)
            : this.backendConnector &&
              this.backendConnector.saveMissing &&
              this.backendConnector.saveMissing(O, l, R, Q, k, t),
            this.emit('missingKey', O, l, R, u);
        };
        this.options.saveMissing &&
          (this.options.saveMissingPlurals && w
            ? j.forEach(O => {
                this.pluralResolver.getSuffixes(O, t).forEach(R => {
                  Y([O], a + R, t[`defaultValue${R}`] || C);
                });
              })
            : Y(j, a, C));
      }
      (u = this.extendTranslation(u, e, t, c, n)),
        v && u === a && this.options.appendNamespaceToMissingKey && (u = `${l}:${a}`),
        (v || y) &&
          this.options.parseMissingKeyHandler &&
          (this.options.compatibilityAPI !== 'v1'
            ? (u = this.options.parseMissingKeyHandler(
                this.options.appendNamespaceToMissingKey ? `${l}:${a}` : a,
                y ? u : void 0,
              ))
            : (u = this.options.parseMissingKeyHandler(u)));
    }
    return s ? ((c.res = u), (c.usedParams = this.getUsedParamsDetails(t)), c) : u;
  }
  extendTranslation(e, t, n, s, r) {
    var a = this;
    if (this.i18nFormat && this.i18nFormat.parse)
      e = this.i18nFormat.parse(
        e,
        { ...this.options.interpolation.defaultVariables, ...n },
        n.lng || this.language || s.usedLng,
        s.usedNS,
        s.usedKey,
        { resolved: s },
      );
    else if (!n.skipInterpolation) {
      n.interpolation &&
        this.interpolator.init({
          ...n,
          interpolation: { ...this.options.interpolation, ...n.interpolation },
        });
      const f =
        typeof e == 'string' &&
        (n && n.interpolation && n.interpolation.skipOnVariables !== void 0
          ? n.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables);
      let g;
      if (f) {
        const u = e.match(this.interpolator.nestingRegexp);
        g = u && u.length;
      }
      let c = n.replace && typeof n.replace != 'string' ? n.replace : n;
      if (
        (this.options.interpolation.defaultVariables &&
          (c = { ...this.options.interpolation.defaultVariables, ...c }),
        (e = this.interpolator.interpolate(e, c, n.lng || this.language, n)),
        f)
      ) {
        const u = e.match(this.interpolator.nestingRegexp),
          d = u && u.length;
        g < d && (n.nest = !1);
      }
      !n.lng && this.options.compatibilityAPI !== 'v1' && s && s.res && (n.lng = s.usedLng),
        n.nest !== !1 &&
          (e = this.interpolator.nest(
            e,
            function () {
              for (var u = arguments.length, d = new Array(u), h = 0; h < u; h++)
                d[h] = arguments[h];
              return r && r[0] === d[0] && !n.context
                ? (a.logger.warn(
                    `It seems you are nesting recursively key: ${d[0]} in key: ${t[0]}`,
                  ),
                  null)
                : a.translate(...d, t);
            },
            n,
          )),
        n.interpolation && this.interpolator.reset();
    }
    const o = n.postProcess || this.options.postProcess,
      l = typeof o == 'string' ? [o] : o;
    return (
      e != null &&
        l &&
        l.length &&
        n.applyPostProcessor !== !1 &&
        (e = oe.handle(
          l,
          e,
          t,
          this.options && this.options.postProcessPassResolved
            ? { i18nResolved: { ...s, usedParams: this.getUsedParamsDetails(n) }, ...n }
            : n,
          this,
        )),
      e
    );
  }
  resolve(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n,
      s,
      r,
      a,
      o;
    return (
      typeof e == 'string' && (e = [e]),
      e.forEach(l => {
        if (this.isValidLookup(n)) return;
        const f = this.extractFromKey(l, t),
          g = f.key;
        s = g;
        let c = f.namespaces;
        this.options.fallbackNS && (c = c.concat(this.options.fallbackNS));
        const u = t.count !== void 0 && typeof t.count != 'string',
          d = u && !t.ordinal && t.count === 0 && this.pluralResolver.shouldUseIntlApi(),
          h =
            t.context !== void 0 &&
            (typeof t.context == 'string' || typeof t.context == 'number') &&
            t.context !== '',
          p = t.lngs
            ? t.lngs
            : this.languageUtils.toResolveHierarchy(t.lng || this.language, t.fallbackLng);
        c.forEach(m => {
          this.isValidLookup(n) ||
            ((o = m),
            !_[`${p[0]}-${m}`] &&
              this.utils &&
              this.utils.hasLoadedNamespace &&
              !this.utils.hasLoadedNamespace(o) &&
              ((_[`${p[0]}-${m}`] = !0),
              this.logger.warn(
                `key "${s}" for languages "${p.join(
                  ', ',
                )}" won't get resolved as namespace "${o}" was not yet loaded`,
                'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!',
              )),
            p.forEach(L => {
              if (this.isValidLookup(n)) return;
              a = L;
              const x = [g];
              if (this.i18nFormat && this.i18nFormat.addLookupKeys)
                this.i18nFormat.addLookupKeys(x, g, L, m, t);
              else {
                let y;
                u && (y = this.pluralResolver.getSuffix(L, t.count, t));
                const v = `${this.options.pluralSeparator}zero`,
                  w = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                if (
                  (u &&
                    (x.push(g + y),
                    t.ordinal &&
                      y.indexOf(w) === 0 &&
                      x.push(g + y.replace(w, this.options.pluralSeparator)),
                    d && x.push(g + v)),
                  h)
                ) {
                  const S = `${g}${this.options.contextSeparator}${t.context}`;
                  x.push(S),
                    u &&
                      (x.push(S + y),
                      t.ordinal &&
                        y.indexOf(w) === 0 &&
                        x.push(S + y.replace(w, this.options.pluralSeparator)),
                      d && x.push(S + v));
                }
              }
              let D;
              for (; (D = x.pop()); )
                this.isValidLookup(n) || ((r = D), (n = this.getResource(L, m, D, t)));
            }));
        });
      }),
      { res: n, usedKey: s, exactUsedKey: r, usedLng: a, usedNS: o }
    );
  }
  isValidLookup(e) {
    return (
      e !== void 0 &&
      !(!this.options.returnNull && e === null) &&
      !(!this.options.returnEmptyString && e === '')
    );
  }
  getResource(e, t, n) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return this.i18nFormat && this.i18nFormat.getResource
      ? this.i18nFormat.getResource(e, t, n, s)
      : this.resourceStore.getResource(e, t, n, s);
  }
  getUsedParamsDetails() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const t = [
        'defaultValue',
        'ordinal',
        'context',
        'replace',
        'lng',
        'lngs',
        'fallbackLng',
        'ns',
        'keySeparator',
        'nsSeparator',
        'returnObjects',
        'returnDetails',
        'joinArrays',
        'postProcess',
        'interpolation',
      ],
      n = e.replace && typeof e.replace != 'string';
    let s = n ? e.replace : e;
    if (
      (n && typeof e.count < 'u' && (s.count = e.count),
      this.options.interpolation.defaultVariables &&
        (s = { ...this.options.interpolation.defaultVariables, ...s }),
      !n)
    ) {
      s = { ...s };
      for (const r of t) delete s[r];
    }
    return s;
  }
  static hasDefaultValue(e) {
    const t = 'defaultValue';
    for (const n in e)
      if (
        Object.prototype.hasOwnProperty.call(e, n) &&
        t === n.substring(0, t.length) &&
        e[n] !== void 0
      )
        return !0;
    return !1;
  }
}
function B(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
class ee {
  constructor(e) {
    (this.options = e),
      (this.supportedLngs = this.options.supportedLngs || !1),
      (this.logger = N.create('languageUtils'));
  }
  getScriptPartFromCode(e) {
    if (((e = H(e)), !e || e.indexOf('-') < 0)) return null;
    const t = e.split('-');
    return t.length === 2 || (t.pop(), t[t.length - 1].toLowerCase() === 'x')
      ? null
      : this.formatLanguageCode(t.join('-'));
  }
  getLanguagePartFromCode(e) {
    if (((e = H(e)), !e || e.indexOf('-') < 0)) return e;
    const t = e.split('-');
    return this.formatLanguageCode(t[0]);
  }
  formatLanguageCode(e) {
    if (typeof e == 'string' && e.indexOf('-') > -1) {
      const t = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
      let n = e.split('-');
      return (
        this.options.lowerCaseLng
          ? (n = n.map(s => s.toLowerCase()))
          : n.length === 2
            ? ((n[0] = n[0].toLowerCase()),
              (n[1] = n[1].toUpperCase()),
              t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = B(n[1].toLowerCase())))
            : n.length === 3 &&
              ((n[0] = n[0].toLowerCase()),
              n[1].length === 2 && (n[1] = n[1].toUpperCase()),
              n[0] !== 'sgn' && n[2].length === 2 && (n[2] = n[2].toUpperCase()),
              t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = B(n[1].toLowerCase())),
              t.indexOf(n[2].toLowerCase()) > -1 && (n[2] = B(n[2].toLowerCase()))),
        n.join('-')
      );
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e;
  }
  isSupportedCode(e) {
    return (
      (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) &&
        (e = this.getLanguagePartFromCode(e)),
      !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1
    );
  }
  getBestMatchFromCodes(e) {
    if (!e) return null;
    let t;
    return (
      e.forEach(n => {
        if (t) return;
        const s = this.formatLanguageCode(n);
        (!this.options.supportedLngs || this.isSupportedCode(s)) && (t = s);
      }),
      !t &&
        this.options.supportedLngs &&
        e.forEach(n => {
          if (t) return;
          const s = this.getLanguagePartFromCode(n);
          if (this.isSupportedCode(s)) return (t = s);
          t = this.options.supportedLngs.find(r => {
            if (r === s) return r;
            if (!(r.indexOf('-') < 0 && s.indexOf('-') < 0) && r.indexOf(s) === 0) return r;
          });
        }),
      t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]),
      t
    );
  }
  getFallbackCodes(e, t) {
    if (!e) return [];
    if (
      (typeof e == 'function' && (e = e(t)),
      typeof e == 'string' && (e = [e]),
      Object.prototype.toString.apply(e) === '[object Array]')
    )
      return e;
    if (!t) return e.default || [];
    let n = e[t];
    return (
      n || (n = e[this.getScriptPartFromCode(t)]),
      n || (n = e[this.formatLanguageCode(t)]),
      n || (n = e[this.getLanguagePartFromCode(t)]),
      n || (n = e.default),
      n || []
    );
  }
  toResolveHierarchy(e, t) {
    const n = this.getFallbackCodes(t || this.options.fallbackLng || [], e),
      s = [],
      r = a => {
        a &&
          (this.isSupportedCode(a)
            ? s.push(a)
            : this.logger.warn(`rejecting language code not found in supportedLngs: ${a}`));
      };
    return (
      typeof e == 'string' && (e.indexOf('-') > -1 || e.indexOf('_') > -1)
        ? (this.options.load !== 'languageOnly' && r(this.formatLanguageCode(e)),
          this.options.load !== 'languageOnly' &&
            this.options.load !== 'currentOnly' &&
            r(this.getScriptPartFromCode(e)),
          this.options.load !== 'currentOnly' && r(this.getLanguagePartFromCode(e)))
        : typeof e == 'string' && r(this.formatLanguageCode(e)),
      n.forEach(a => {
        s.indexOf(a) < 0 && r(this.formatLanguageCode(a));
      }),
      s
    );
  }
}
let Ne = [
    {
      lngs: [
        'ach',
        'ak',
        'am',
        'arn',
        'br',
        'fil',
        'gun',
        'ln',
        'mfe',
        'mg',
        'mi',
        'oc',
        'pt',
        'pt-BR',
        'tg',
        'tl',
        'ti',
        'tr',
        'uz',
        'wa',
      ],
      nr: [1, 2],
      fc: 1,
    },
    {
      lngs: [
        'af',
        'an',
        'ast',
        'az',
        'bg',
        'bn',
        'ca',
        'da',
        'de',
        'dev',
        'el',
        'en',
        'eo',
        'es',
        'et',
        'eu',
        'fi',
        'fo',
        'fur',
        'fy',
        'gl',
        'gu',
        'ha',
        'hi',
        'hu',
        'hy',
        'ia',
        'it',
        'kk',
        'kn',
        'ku',
        'lb',
        'mai',
        'ml',
        'mn',
        'mr',
        'nah',
        'nap',
        'nb',
        'ne',
        'nl',
        'nn',
        'no',
        'nso',
        'pa',
        'pap',
        'pms',
        'ps',
        'pt-PT',
        'rm',
        'sco',
        'se',
        'si',
        'so',
        'son',
        'sq',
        'sv',
        'sw',
        'ta',
        'te',
        'tk',
        'ur',
        'yo',
      ],
      nr: [1, 2],
      fc: 2,
    },
    {
      lngs: [
        'ay',
        'bo',
        'cgg',
        'fa',
        'ht',
        'id',
        'ja',
        'jbo',
        'ka',
        'km',
        'ko',
        'ky',
        'lo',
        'ms',
        'sah',
        'su',
        'th',
        'tt',
        'ug',
        'vi',
        'wo',
        'zh',
      ],
      nr: [1],
      fc: 3,
    },
    { lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'], nr: [1, 2, 5], fc: 4 },
    { lngs: ['ar'], nr: [0, 1, 2, 3, 11, 100], fc: 5 },
    { lngs: ['cs', 'sk'], nr: [1, 2, 5], fc: 6 },
    { lngs: ['csb', 'pl'], nr: [1, 2, 5], fc: 7 },
    { lngs: ['cy'], nr: [1, 2, 3, 8], fc: 8 },
    { lngs: ['fr'], nr: [1, 2], fc: 9 },
    { lngs: ['ga'], nr: [1, 2, 3, 7, 11], fc: 10 },
    { lngs: ['gd'], nr: [1, 2, 3, 20], fc: 11 },
    { lngs: ['is'], nr: [1, 2], fc: 12 },
    { lngs: ['jv'], nr: [0, 1], fc: 13 },
    { lngs: ['kw'], nr: [1, 2, 3, 4], fc: 14 },
    { lngs: ['lt'], nr: [1, 2, 10], fc: 15 },
    { lngs: ['lv'], nr: [1, 2, 0], fc: 16 },
    { lngs: ['mk'], nr: [1, 2], fc: 17 },
    { lngs: ['mnk'], nr: [0, 1, 2], fc: 18 },
    { lngs: ['mt'], nr: [1, 2, 11, 20], fc: 19 },
    { lngs: ['or'], nr: [2, 1], fc: 2 },
    { lngs: ['ro'], nr: [1, 2, 20], fc: 20 },
    { lngs: ['sl'], nr: [5, 1, 2, 3], fc: 21 },
    { lngs: ['he', 'iw'], nr: [1, 2, 20, 21], fc: 22 },
  ],
  Re = {
    1: function (i) {
      return +(i > 1);
    },
    2: function (i) {
      return +(i != 1);
    },
    3: function (i) {
      return 0;
    },
    4: function (i) {
      return i % 10 == 1 && i % 100 != 11
        ? 0
        : i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20)
          ? 1
          : 2;
    },
    5: function (i) {
      return i == 0
        ? 0
        : i == 1
          ? 1
          : i == 2
            ? 2
            : i % 100 >= 3 && i % 100 <= 10
              ? 3
              : i % 100 >= 11
                ? 4
                : 5;
    },
    6: function (i) {
      return i == 1 ? 0 : i >= 2 && i <= 4 ? 1 : 2;
    },
    7: function (i) {
      return i == 1 ? 0 : i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20) ? 1 : 2;
    },
    8: function (i) {
      return i == 1 ? 0 : i == 2 ? 1 : i != 8 && i != 11 ? 2 : 3;
    },
    9: function (i) {
      return +(i >= 2);
    },
    10: function (i) {
      return i == 1 ? 0 : i == 2 ? 1 : i < 7 ? 2 : i < 11 ? 3 : 4;
    },
    11: function (i) {
      return i == 1 || i == 11 ? 0 : i == 2 || i == 12 ? 1 : i > 2 && i < 20 ? 2 : 3;
    },
    12: function (i) {
      return +(i % 10 != 1 || i % 100 == 11);
    },
    13: function (i) {
      return +(i !== 0);
    },
    14: function (i) {
      return i == 1 ? 0 : i == 2 ? 1 : i == 3 ? 2 : 3;
    },
    15: function (i) {
      return i % 10 == 1 && i % 100 != 11
        ? 0
        : i % 10 >= 2 && (i % 100 < 10 || i % 100 >= 20)
          ? 1
          : 2;
    },
    16: function (i) {
      return i % 10 == 1 && i % 100 != 11 ? 0 : i !== 0 ? 1 : 2;
    },
    17: function (i) {
      return i == 1 || (i % 10 == 1 && i % 100 != 11) ? 0 : 1;
    },
    18: function (i) {
      return i == 0 ? 0 : i == 1 ? 1 : 2;
    },
    19: function (i) {
      return i == 1
        ? 0
        : i == 0 || (i % 100 > 1 && i % 100 < 11)
          ? 1
          : i % 100 > 10 && i % 100 < 20
            ? 2
            : 3;
    },
    20: function (i) {
      return i == 1 ? 0 : i == 0 || (i % 100 > 0 && i % 100 < 20) ? 1 : 2;
    },
    21: function (i) {
      return i % 100 == 1 ? 1 : i % 100 == 2 ? 2 : i % 100 == 3 || i % 100 == 4 ? 3 : 0;
    },
    22: function (i) {
      return i == 1 ? 0 : i == 2 ? 1 : (i < 0 || i > 10) && i % 10 == 0 ? 2 : 3;
    },
  };
const Pe = ['v1', 'v2', 'v3'],
  $e = ['v4'],
  te = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 };
function Ce() {
  const i = {};
  return (
    Ne.forEach(e => {
      e.lngs.forEach(t => {
        i[t] = { numbers: e.nr, plurals: Re[e.fc] };
      });
    }),
    i
  );
}
class ke {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    (this.languageUtils = e),
      (this.options = t),
      (this.logger = N.create('pluralResolver')),
      (!this.options.compatibilityJSON || $e.includes(this.options.compatibilityJSON)) &&
        (typeof Intl > 'u' || !Intl.PluralRules) &&
        ((this.options.compatibilityJSON = 'v3'),
        this.logger.error(
          'Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.',
        )),
      (this.rules = Ce());
  }
  addRule(e, t) {
    this.rules[e] = t;
  }
  getRule(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.shouldUseIntlApi())
      try {
        return new Intl.PluralRules(H(e), { type: t.ordinal ? 'ordinal' : 'cardinal' });
      } catch {
        return;
      }
    return this.rules[e] || this.rules[this.languageUtils.getLanguagePartFromCode(e)];
  }
  needsPlural(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const n = this.getRule(e, t);
    return this.shouldUseIntlApi()
      ? n && n.resolvedOptions().pluralCategories.length > 1
      : n && n.numbers.length > 1;
  }
  getPluralFormsOfKey(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.getSuffixes(e, n).map(s => `${t}${s}`);
  }
  getSuffixes(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const n = this.getRule(e, t);
    return n
      ? this.shouldUseIntlApi()
        ? n
            .resolvedOptions()
            .pluralCategories.sort((s, r) => te[s] - te[r])
            .map(
              s =>
                `${this.options.prepend}${t.ordinal ? `ordinal${this.options.prepend}` : ''}${s}`,
            )
        : n.numbers.map(s => this.getSuffix(e, s, t))
      : [];
  }
  getSuffix(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const s = this.getRule(e, n);
    return s
      ? this.shouldUseIntlApi()
        ? `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ''}${s.select(
            t,
          )}`
        : this.getSuffixRetroCompatible(s, t)
      : (this.logger.warn(`no plural rule found for: ${e}`), '');
  }
  getSuffixRetroCompatible(e, t) {
    const n = e.noAbs ? e.plurals(t) : e.plurals(Math.abs(t));
    let s = e.numbers[n];
    this.options.simplifyPluralSuffix &&
      e.numbers.length === 2 &&
      e.numbers[0] === 1 &&
      (s === 2 ? (s = 'plural') : s === 1 && (s = ''));
    const r = () =>
      this.options.prepend && s.toString() ? this.options.prepend + s.toString() : s.toString();
    return this.options.compatibilityJSON === 'v1'
      ? s === 1
        ? ''
        : typeof s == 'number'
          ? `_plural_${s.toString()}`
          : r()
      : this.options.compatibilityJSON === 'v2' ||
          (this.options.simplifyPluralSuffix && e.numbers.length === 2 && e.numbers[0] === 1)
        ? r()
        : this.options.prepend && n.toString()
          ? this.options.prepend + n.toString()
          : n.toString();
  }
  shouldUseIntlApi() {
    return !Pe.includes(this.options.compatibilityJSON);
  }
}
function ne(i, e, t) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : '.',
    s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0,
    r = Se(i, e, t);
  return !r && s && typeof t == 'string' && ((r = M(i, t, n)), r === void 0 && (r = M(e, t, n))), r;
}
class je {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    (this.logger = N.create('interpolator')),
      (this.options = e),
      (this.format = (e.interpolation && e.interpolation.format) || (t => t)),
      this.init(e);
  }
  init() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    e.interpolation || (e.interpolation = { escapeValue: !0 });
    const t = e.interpolation;
    (this.escape = t.escape !== void 0 ? t.escape : ve),
      (this.escapeValue = t.escapeValue !== void 0 ? t.escapeValue : !0),
      (this.useRawValueToEscape = t.useRawValueToEscape !== void 0 ? t.useRawValueToEscape : !1),
      (this.prefix = t.prefix ? P(t.prefix) : t.prefixEscaped || '{{'),
      (this.suffix = t.suffix ? P(t.suffix) : t.suffixEscaped || '}}'),
      (this.formatSeparator = t.formatSeparator ? t.formatSeparator : t.formatSeparator || ','),
      (this.unescapePrefix = t.unescapeSuffix ? '' : t.unescapePrefix || '-'),
      (this.unescapeSuffix = this.unescapePrefix ? '' : t.unescapeSuffix || ''),
      (this.nestingPrefix = t.nestingPrefix
        ? P(t.nestingPrefix)
        : t.nestingPrefixEscaped || P('$t(')),
      (this.nestingSuffix = t.nestingSuffix
        ? P(t.nestingSuffix)
        : t.nestingSuffixEscaped || P(')')),
      (this.nestingOptionsSeparator = t.nestingOptionsSeparator
        ? t.nestingOptionsSeparator
        : t.nestingOptionsSeparator || ','),
      (this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3),
      (this.alwaysFormat = t.alwaysFormat !== void 0 ? t.alwaysFormat : !1),
      this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const e = `${this.prefix}(.+?)${this.suffix}`;
    this.regexp = new RegExp(e, 'g');
    const t = `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`;
    this.regexpUnescape = new RegExp(t, 'g');
    const n = `${this.nestingPrefix}(.+?)${this.nestingSuffix}`;
    this.nestingRegexp = new RegExp(n, 'g');
  }
  interpolate(e, t, n, s) {
    let r, a, o;
    const l =
      (this.options && this.options.interpolation && this.options.interpolation.defaultVariables) ||
      {};
    function f(h) {
      return h.replace(/\$/g, '$$$$');
    }
    const g = h => {
      if (h.indexOf(this.formatSeparator) < 0) {
        const x = ne(t, l, h, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat
          ? this.format(x, void 0, n, { ...s, ...t, interpolationkey: h })
          : x;
      }
      const p = h.split(this.formatSeparator),
        m = p.shift().trim(),
        L = p.join(this.formatSeparator).trim();
      return this.format(
        ne(t, l, m, this.options.keySeparator, this.options.ignoreJSONStructure),
        L,
        n,
        { ...s, ...t, interpolationkey: m },
      );
    };
    this.resetRegExp();
    const c = (s && s.missingInterpolationHandler) || this.options.missingInterpolationHandler,
      u =
        s && s.interpolation && s.interpolation.skipOnVariables !== void 0
          ? s.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables;
    return (
      [
        { regex: this.regexpUnescape, safeValue: h => f(h) },
        { regex: this.regexp, safeValue: h => (this.escapeValue ? f(this.escape(h)) : f(h)) },
      ].forEach(h => {
        for (o = 0; (r = h.regex.exec(e)); ) {
          const p = r[1].trim();
          if (((a = g(p)), a === void 0))
            if (typeof c == 'function') {
              const L = c(e, r, s);
              a = typeof L == 'string' ? L : '';
            } else if (s && Object.prototype.hasOwnProperty.call(s, p)) a = '';
            else if (u) {
              a = r[0];
              continue;
            } else
              this.logger.warn(`missed to pass in variable ${p} for interpolating ${e}`), (a = '');
          else typeof a != 'string' && !this.useRawValueToEscape && (a = Z(a));
          const m = h.safeValue(a);
          if (
            ((e = e.replace(r[0], m)),
            u
              ? ((h.regex.lastIndex += a.length), (h.regex.lastIndex -= r[0].length))
              : (h.regex.lastIndex = 0),
            o++,
            o >= this.maxReplaces)
          )
            break;
        }
      }),
      e
    );
  }
  nest(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      s,
      r,
      a;
    function o(l, f) {
      const g = this.nestingOptionsSeparator;
      if (l.indexOf(g) < 0) return l;
      const c = l.split(new RegExp(`${g}[ ]*{`));
      let u = `{${c[1]}`;
      (l = c[0]), (u = this.interpolate(u, a));
      const d = u.match(/'/g),
        h = u.match(/"/g);
      ((d && d.length % 2 === 0 && !h) || h.length % 2 !== 0) && (u = u.replace(/'/g, '"'));
      try {
        (a = JSON.parse(u)), f && (a = { ...f, ...a });
      } catch (p) {
        return (
          this.logger.warn(`failed parsing options string in nesting for key ${l}`, p),
          `${l}${g}${u}`
        );
      }
      return delete a.defaultValue, l;
    }
    for (; (s = this.nestingRegexp.exec(e)); ) {
      let l = [];
      (a = { ...n }),
        (a = a.replace && typeof a.replace != 'string' ? a.replace : a),
        (a.applyPostProcessor = !1),
        delete a.defaultValue;
      let f = !1;
      if (s[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(s[1])) {
        const g = s[1].split(this.formatSeparator).map(c => c.trim());
        (s[1] = g.shift()), (l = g), (f = !0);
      }
      if (((r = t(o.call(this, s[1].trim(), a), a)), r && s[0] === e && typeof r != 'string'))
        return r;
      typeof r != 'string' && (r = Z(r)),
        r || (this.logger.warn(`missed to resolve ${s[1]} for nesting ${e}`), (r = '')),
        f &&
          (r = l.reduce(
            (g, c) => this.format(g, c, n.lng, { ...n, interpolationkey: s[1].trim() }),
            r.trim(),
          )),
        (e = e.replace(s[0], r)),
        (this.regexp.lastIndex = 0);
    }
    return e;
  }
}
function Fe(i) {
  let e = i.toLowerCase().trim();
  const t = {};
  if (i.indexOf('(') > -1) {
    const n = i.split('(');
    e = n[0].toLowerCase().trim();
    const s = n[1].substring(0, n[1].length - 1);
    e === 'currency' && s.indexOf(':') < 0
      ? t.currency || (t.currency = s.trim())
      : e === 'relativetime' && s.indexOf(':') < 0
        ? t.range || (t.range = s.trim())
        : s.split(';').forEach(a => {
            if (!a) return;
            const [o, ...l] = a.split(':'),
              f = l
                .join(':')
                .trim()
                .replace(/^'+|'+$/g, '');
            t[o.trim()] || (t[o.trim()] = f),
              f === 'false' && (t[o.trim()] = !1),
              f === 'true' && (t[o.trim()] = !0),
              isNaN(f) || (t[o.trim()] = parseInt(f, 10));
          });
  }
  return { formatName: e, formatOptions: t };
}
function $(i) {
  const e = {};
  return function (n, s, r) {
    const a = s + JSON.stringify(r);
    let o = e[a];
    return o || ((o = i(H(s), r)), (e[a] = o)), o(n);
  };
}
class Ee {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    (this.logger = N.create('formatter')),
      (this.options = e),
      (this.formats = {
        number: $((t, n) => {
          const s = new Intl.NumberFormat(t, { ...n });
          return r => s.format(r);
        }),
        currency: $((t, n) => {
          const s = new Intl.NumberFormat(t, { ...n, style: 'currency' });
          return r => s.format(r);
        }),
        datetime: $((t, n) => {
          const s = new Intl.DateTimeFormat(t, { ...n });
          return r => s.format(r);
        }),
        relativetime: $((t, n) => {
          const s = new Intl.RelativeTimeFormat(t, { ...n });
          return r => s.format(r, n.range || 'day');
        }),
        list: $((t, n) => {
          const s = new Intl.ListFormat(t, { ...n });
          return r => s.format(r);
        }),
      }),
      this.init(e);
  }
  init(e) {
    const n = (
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { interpolation: {} }
    ).interpolation;
    this.formatSeparator = n.formatSeparator ? n.formatSeparator : n.formatSeparator || ',';
  }
  add(e, t) {
    this.formats[e.toLowerCase().trim()] = t;
  }
  addCached(e, t) {
    this.formats[e.toLowerCase().trim()] = $(t);
  }
  format(e, t, n) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return t.split(this.formatSeparator).reduce((o, l) => {
      const { formatName: f, formatOptions: g } = Fe(l);
      if (this.formats[f]) {
        let c = o;
        try {
          const u = (s && s.formatParams && s.formatParams[s.interpolationkey]) || {},
            d = u.locale || u.lng || s.locale || s.lng || n;
          c = this.formats[f](o, d, { ...g, ...s, ...u });
        } catch (u) {
          this.logger.warn(u);
        }
        return c;
      } else this.logger.warn(`there was no format function for ${f}`);
      return o;
    }, e);
  }
}
function Ie(i, e) {
  i.pending[e] !== void 0 && (delete i.pending[e], i.pendingCount--);
}
class De extends z {
  constructor(e, t, n) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(),
      (this.backend = e),
      (this.store = t),
      (this.services = n),
      (this.languageUtils = n.languageUtils),
      (this.options = s),
      (this.logger = N.create('backendConnector')),
      (this.waitingReads = []),
      (this.maxParallelReads = s.maxParallelReads || 10),
      (this.readingCalls = 0),
      (this.maxRetries = s.maxRetries >= 0 ? s.maxRetries : 5),
      (this.retryTimeout = s.retryTimeout >= 1 ? s.retryTimeout : 350),
      (this.state = {}),
      (this.queue = []),
      this.backend && this.backend.init && this.backend.init(n, s.backend, s);
  }
  queueLoad(e, t, n, s) {
    const r = {},
      a = {},
      o = {},
      l = {};
    return (
      e.forEach(f => {
        let g = !0;
        t.forEach(c => {
          const u = `${f}|${c}`;
          !n.reload && this.store.hasResourceBundle(f, c)
            ? (this.state[u] = 2)
            : this.state[u] < 0 ||
              (this.state[u] === 1
                ? a[u] === void 0 && (a[u] = !0)
                : ((this.state[u] = 1),
                  (g = !1),
                  a[u] === void 0 && (a[u] = !0),
                  r[u] === void 0 && (r[u] = !0),
                  l[c] === void 0 && (l[c] = !0)));
        }),
          g || (o[f] = !0);
      }),
      (Object.keys(r).length || Object.keys(a).length) &&
        this.queue.push({
          pending: a,
          pendingCount: Object.keys(a).length,
          loaded: {},
          errors: [],
          callback: s,
        }),
      {
        toLoad: Object.keys(r),
        pending: Object.keys(a),
        toLoadLanguages: Object.keys(o),
        toLoadNamespaces: Object.keys(l),
      }
    );
  }
  loaded(e, t, n) {
    const s = e.split('|'),
      r = s[0],
      a = s[1];
    t && this.emit('failedLoading', r, a, t),
      n && this.store.addResourceBundle(r, a, n),
      (this.state[e] = t ? -1 : 2);
    const o = {};
    this.queue.forEach(l => {
      xe(l.loaded, [r], a),
        Ie(l, e),
        t && l.errors.push(t),
        l.pendingCount === 0 &&
          !l.done &&
          (Object.keys(l.loaded).forEach(f => {
            o[f] || (o[f] = {});
            const g = l.loaded[f];
            g.length &&
              g.forEach(c => {
                o[f][c] === void 0 && (o[f][c] = !0);
              });
          }),
          (l.done = !0),
          l.errors.length ? l.callback(l.errors) : l.callback());
    }),
      this.emit('loaded', o),
      (this.queue = this.queue.filter(l => !l.done));
  }
  read(e, t, n) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0,
      r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout,
      a = arguments.length > 5 ? arguments[5] : void 0;
    if (!e.length) return a(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({ lng: e, ns: t, fcName: n, tried: s, wait: r, callback: a });
      return;
    }
    this.readingCalls++;
    const o = (f, g) => {
        if ((this.readingCalls--, this.waitingReads.length > 0)) {
          const c = this.waitingReads.shift();
          this.read(c.lng, c.ns, c.fcName, c.tried, c.wait, c.callback);
        }
        if (f && g && s < this.maxRetries) {
          setTimeout(() => {
            this.read.call(this, e, t, n, s + 1, r * 2, a);
          }, r);
          return;
        }
        a(f, g);
      },
      l = this.backend[n].bind(this.backend);
    if (l.length === 2) {
      try {
        const f = l(e, t);
        f && typeof f.then == 'function' ? f.then(g => o(null, g)).catch(o) : o(null, f);
      } catch (f) {
        o(f);
      }
      return;
    }
    return l(e, t, o);
  }
  prepareLoading(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      s = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return (
        this.logger.warn('No backend was added via i18next.use. Will not load resources.'), s && s()
      );
    typeof e == 'string' && (e = this.languageUtils.toResolveHierarchy(e)),
      typeof t == 'string' && (t = [t]);
    const r = this.queueLoad(e, t, n, s);
    if (!r.toLoad.length) return r.pending.length || s(), null;
    r.toLoad.forEach(a => {
      this.loadOne(a);
    });
  }
  load(e, t, n) {
    this.prepareLoading(e, t, {}, n);
  }
  reload(e, t, n) {
    this.prepareLoading(e, t, { reload: !0 }, n);
  }
  loadOne(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : '';
    const n = e.split('|'),
      s = n[0],
      r = n[1];
    this.read(s, r, 'read', void 0, void 0, (a, o) => {
      a && this.logger.warn(`${t}loading namespace ${r} for language ${s} failed`, a),
        !a && o && this.logger.log(`${t}loaded namespace ${r} for language ${s}`, o),
        this.loaded(e, a, o);
    });
  }
  saveMissing(e, t, n, s, r) {
    let a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {},
      o = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {};
    if (
      this.services.utils &&
      this.services.utils.hasLoadedNamespace &&
      !this.services.utils.hasLoadedNamespace(t)
    ) {
      this.logger.warn(
        `did not save key "${n}" as the namespace "${t}" was not yet loaded`,
        'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!',
      );
      return;
    }
    if (!(n == null || n === '')) {
      if (this.backend && this.backend.create) {
        const l = { ...a, isUpdate: r },
          f = this.backend.create.bind(this.backend);
        if (f.length < 6)
          try {
            let g;
            f.length === 5 ? (g = f(e, t, n, s, l)) : (g = f(e, t, n, s)),
              g && typeof g.then == 'function' ? g.then(c => o(null, c)).catch(o) : o(null, g);
          } catch (g) {
            o(g);
          }
        else f(e, t, n, s, o, l);
      }
      !e || !e[0] || this.store.addResource(e[0], t, n, s);
    }
  }
}
function se() {
  return {
    debug: !1,
    initImmediate: !0,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: 'all',
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: 'fallback',
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: function (e) {
      let t = {};
      if (
        (typeof e[1] == 'object' && (t = e[1]),
        typeof e[1] == 'string' && (t.defaultValue = e[1]),
        typeof e[2] == 'string' && (t.tDescription = e[2]),
        typeof e[2] == 'object' || typeof e[3] == 'object')
      ) {
        const n = e[3] || e[2];
        Object.keys(n).forEach(s => {
          t[s] = n[s];
        });
      }
      return t;
    },
    interpolation: {
      escapeValue: !0,
      format: (i, e, t, n) => i,
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      unescapePrefix: '-',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      nestingOptionsSeparator: ',',
      maxReplaces: 1e3,
      skipOnVariables: !0,
    },
  };
}
function ie(i) {
  return (
    typeof i.ns == 'string' && (i.ns = [i.ns]),
    typeof i.fallbackLng == 'string' && (i.fallbackLng = [i.fallbackLng]),
    typeof i.fallbackNS == 'string' && (i.fallbackNS = [i.fallbackNS]),
    i.supportedLngs &&
      i.supportedLngs.indexOf('cimode') < 0 &&
      (i.supportedLngs = i.supportedLngs.concat(['cimode'])),
    i
  );
}
function V() {}
function Ae(i) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(i)).forEach(t => {
    typeof i[t] == 'function' && (i[t] = i[t].bind(i));
  });
}
class I extends z {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = arguments.length > 1 ? arguments[1] : void 0;
    if (
      (super(),
      (this.options = ie(e)),
      (this.services = {}),
      (this.logger = N),
      (this.modules = { external: [] }),
      Ae(this),
      t && !this.isInitialized && !e.isClone)
    ) {
      if (!this.options.initImmediate) return this.init(e, t), this;
      setTimeout(() => {
        this.init(e, t);
      }, 0);
    }
  }
  init() {
    var e = this;
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      n = arguments.length > 1 ? arguments[1] : void 0;
    typeof t == 'function' && ((n = t), (t = {})),
      !t.defaultNS &&
        t.defaultNS !== !1 &&
        t.ns &&
        (typeof t.ns == 'string'
          ? (t.defaultNS = t.ns)
          : t.ns.indexOf('translation') < 0 && (t.defaultNS = t.ns[0]));
    const s = se();
    (this.options = { ...s, ...this.options, ...ie(t) }),
      this.options.compatibilityAPI !== 'v1' &&
        (this.options.interpolation = { ...s.interpolation, ...this.options.interpolation }),
      t.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = t.keySeparator),
      t.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = t.nsSeparator);
    function r(g) {
      return g ? (typeof g == 'function' ? new g() : g) : null;
    }
    if (!this.options.isClone) {
      this.modules.logger
        ? N.init(r(this.modules.logger), this.options)
        : N.init(null, this.options);
      let g;
      this.modules.formatter ? (g = this.modules.formatter) : typeof Intl < 'u' && (g = Ee);
      const c = new ee(this.options);
      this.store = new q(this.options.resources, this.options);
      const u = this.services;
      (u.logger = N),
        (u.resourceStore = this.store),
        (u.languageUtils = c),
        (u.pluralResolver = new ke(c, {
          prepend: this.options.pluralSeparator,
          compatibilityJSON: this.options.compatibilityJSON,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix,
        })),
        g &&
          (!this.options.interpolation.format ||
            this.options.interpolation.format === s.interpolation.format) &&
          ((u.formatter = r(g)),
          u.formatter.init(u, this.options),
          (this.options.interpolation.format = u.formatter.format.bind(u.formatter))),
        (u.interpolator = new je(this.options)),
        (u.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }),
        (u.backendConnector = new De(r(this.modules.backend), u.resourceStore, u, this.options)),
        u.backendConnector.on('*', function (d) {
          for (var h = arguments.length, p = new Array(h > 1 ? h - 1 : 0), m = 1; m < h; m++)
            p[m - 1] = arguments[m];
          e.emit(d, ...p);
        }),
        this.modules.languageDetector &&
          ((u.languageDetector = r(this.modules.languageDetector)),
          u.languageDetector.init &&
            u.languageDetector.init(u, this.options.detection, this.options)),
        this.modules.i18nFormat &&
          ((u.i18nFormat = r(this.modules.i18nFormat)),
          u.i18nFormat.init && u.i18nFormat.init(this)),
        (this.translator = new J(this.services, this.options)),
        this.translator.on('*', function (d) {
          for (var h = arguments.length, p = new Array(h > 1 ? h - 1 : 0), m = 1; m < h; m++)
            p[m - 1] = arguments[m];
          e.emit(d, ...p);
        }),
        this.modules.external.forEach(d => {
          d.init && d.init(this);
        });
    }
    if (
      ((this.format = this.options.interpolation.format),
      n || (n = V),
      this.options.fallbackLng && !this.services.languageDetector && !this.options.lng)
    ) {
      const g = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      g.length > 0 && g[0] !== 'dev' && (this.options.lng = g[0]);
    }
    !this.services.languageDetector &&
      !this.options.lng &&
      this.logger.warn('init: no languageDetector is used and no lng is defined'),
      ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'].forEach(g => {
        this[g] = function () {
          return e.store[g](...arguments);
        };
      }),
      ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'].forEach(g => {
        this[g] = function () {
          return e.store[g](...arguments), e;
        };
      });
    const l = F(),
      f = () => {
        const g = (c, u) => {
          this.isInitialized &&
            !this.initializedStoreOnce &&
            this.logger.warn(
              'init: i18next is already initialized. You should call init just once!',
            ),
            (this.isInitialized = !0),
            this.options.isClone || this.logger.log('initialized', this.options),
            this.emit('initialized', this.options),
            l.resolve(u),
            n(c, u);
        };
        if (this.languages && this.options.compatibilityAPI !== 'v1' && !this.isInitialized)
          return g(null, this.t.bind(this));
        this.changeLanguage(this.options.lng, g);
      };
    return this.options.resources || !this.options.initImmediate ? f() : setTimeout(f, 0), l;
  }
  loadResources(e) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : V;
    const s = typeof e == 'string' ? e : this.language;
    if (
      (typeof e == 'function' && (n = e),
      !this.options.resources || this.options.partialBundledLanguages)
    ) {
      if (
        s &&
        s.toLowerCase() === 'cimode' &&
        (!this.options.preload || this.options.preload.length === 0)
      )
        return n();
      const r = [],
        a = o => {
          if (!o || o === 'cimode') return;
          this.services.languageUtils.toResolveHierarchy(o).forEach(f => {
            f !== 'cimode' && r.indexOf(f) < 0 && r.push(f);
          });
        };
      s
        ? a(s)
        : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(l => a(l)),
        this.options.preload && this.options.preload.forEach(o => a(o)),
        this.services.backendConnector.load(r, this.options.ns, o => {
          !o && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language),
            n(o);
        });
    } else n(null);
  }
  reloadResources(e, t, n) {
    const s = F();
    return (
      e || (e = this.languages),
      t || (t = this.options.ns),
      n || (n = V),
      this.services.backendConnector.reload(e, t, r => {
        s.resolve(), n(r);
      }),
      s
    );
  }
  use(e) {
    if (!e)
      throw new Error(
        'You are passing an undefined module! Please check the object you are passing to i18next.use()',
      );
    if (!e.type)
      throw new Error(
        'You are passing a wrong module! Please check the object you are passing to i18next.use()',
      );
    return (
      e.type === 'backend' && (this.modules.backend = e),
      (e.type === 'logger' || (e.log && e.warn && e.error)) && (this.modules.logger = e),
      e.type === 'languageDetector' && (this.modules.languageDetector = e),
      e.type === 'i18nFormat' && (this.modules.i18nFormat = e),
      e.type === 'postProcessor' && oe.addPostProcessor(e),
      e.type === 'formatter' && (this.modules.formatter = e),
      e.type === '3rdParty' && this.modules.external.push(e),
      this
    );
  }
  setResolvedLanguage(e) {
    if (!(!e || !this.languages) && !(['cimode', 'dev'].indexOf(e) > -1))
      for (let t = 0; t < this.languages.length; t++) {
        const n = this.languages[t];
        if (!(['cimode', 'dev'].indexOf(n) > -1) && this.store.hasLanguageSomeTranslations(n)) {
          this.resolvedLanguage = n;
          break;
        }
      }
  }
  changeLanguage(e, t) {
    var n = this;
    this.isLanguageChangingTo = e;
    const s = F();
    this.emit('languageChanging', e);
    const r = l => {
        (this.language = l),
          (this.languages = this.services.languageUtils.toResolveHierarchy(l)),
          (this.resolvedLanguage = void 0),
          this.setResolvedLanguage(l);
      },
      a = (l, f) => {
        f
          ? (r(f),
            this.translator.changeLanguage(f),
            (this.isLanguageChangingTo = void 0),
            this.emit('languageChanged', f),
            this.logger.log('languageChanged', f))
          : (this.isLanguageChangingTo = void 0),
          s.resolve(function () {
            return n.t(...arguments);
          }),
          t &&
            t(l, function () {
              return n.t(...arguments);
            });
      },
      o = l => {
        !e && !l && this.services.languageDetector && (l = []);
        const f = typeof l == 'string' ? l : this.services.languageUtils.getBestMatchFromCodes(l);
        f &&
          (this.language || r(f),
          this.translator.language || this.translator.changeLanguage(f),
          this.services.languageDetector &&
            this.services.languageDetector.cacheUserLanguage &&
            this.services.languageDetector.cacheUserLanguage(f)),
          this.loadResources(f, g => {
            a(g, f);
          });
      };
    return (
      !e && this.services.languageDetector && !this.services.languageDetector.async
        ? o(this.services.languageDetector.detect())
        : !e && this.services.languageDetector && this.services.languageDetector.async
          ? this.services.languageDetector.detect.length === 0
            ? this.services.languageDetector.detect().then(o)
            : this.services.languageDetector.detect(o)
          : o(e),
      s
    );
  }
  getFixedT(e, t, n) {
    var s = this;
    const r = function (a, o) {
      let l;
      if (typeof o != 'object') {
        for (var f = arguments.length, g = new Array(f > 2 ? f - 2 : 0), c = 2; c < f; c++)
          g[c - 2] = arguments[c];
        l = s.options.overloadTranslationOptionHandler([a, o].concat(g));
      } else l = { ...o };
      (l.lng = l.lng || r.lng),
        (l.lngs = l.lngs || r.lngs),
        (l.ns = l.ns || r.ns),
        (l.keyPrefix = l.keyPrefix || n || r.keyPrefix);
      const u = s.options.keySeparator || '.';
      let d;
      return (
        l.keyPrefix && Array.isArray(a)
          ? (d = a.map(h => `${l.keyPrefix}${u}${h}`))
          : (d = l.keyPrefix ? `${l.keyPrefix}${u}${a}` : a),
        s.t(d, l)
      );
    };
    return typeof e == 'string' ? (r.lng = e) : (r.lngs = e), (r.ns = t), (r.keyPrefix = n), r;
  }
  t() {
    return this.translator && this.translator.translate(...arguments);
  }
  exists() {
    return this.translator && this.translator.exists(...arguments);
  }
  setDefaultNamespace(e) {
    this.options.defaultNS = e;
  }
  hasLoadedNamespace(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!this.isInitialized)
      return (
        this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages), !1
      );
    if (!this.languages || !this.languages.length)
      return (
        this.logger.warn(
          'hasLoadedNamespace: i18n.languages were undefined or empty',
          this.languages,
        ),
        !1
      );
    const n = t.lng || this.resolvedLanguage || this.languages[0],
      s = this.options ? this.options.fallbackLng : !1,
      r = this.languages[this.languages.length - 1];
    if (n.toLowerCase() === 'cimode') return !0;
    const a = (o, l) => {
      const f = this.services.backendConnector.state[`${o}|${l}`];
      return f === -1 || f === 2;
    };
    if (t.precheck) {
      const o = t.precheck(this, a);
      if (o !== void 0) return o;
    }
    return !!(
      this.hasResourceBundle(n, e) ||
      !this.services.backendConnector.backend ||
      (this.options.resources && !this.options.partialBundledLanguages) ||
      (a(n, e) && (!s || a(r, e)))
    );
  }
  loadNamespaces(e, t) {
    const n = F();
    return this.options.ns
      ? (typeof e == 'string' && (e = [e]),
        e.forEach(s => {
          this.options.ns.indexOf(s) < 0 && this.options.ns.push(s);
        }),
        this.loadResources(s => {
          n.resolve(), t && t(s);
        }),
        n)
      : (t && t(), Promise.resolve());
  }
  loadLanguages(e, t) {
    const n = F();
    typeof e == 'string' && (e = [e]);
    const s = this.options.preload || [],
      r = e.filter(a => s.indexOf(a) < 0);
    return r.length
      ? ((this.options.preload = s.concat(r)),
        this.loadResources(a => {
          n.resolve(), t && t(a);
        }),
        n)
      : (t && t(), Promise.resolve());
  }
  dir(e) {
    if (
      (e ||
        (e =
          this.resolvedLanguage ||
          (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)),
      !e)
    )
      return 'rtl';
    const t = [
        'ar',
        'shu',
        'sqr',
        'ssh',
        'xaa',
        'yhd',
        'yud',
        'aao',
        'abh',
        'abv',
        'acm',
        'acq',
        'acw',
        'acx',
        'acy',
        'adf',
        'ads',
        'aeb',
        'aec',
        'afb',
        'ajp',
        'apc',
        'apd',
        'arb',
        'arq',
        'ars',
        'ary',
        'arz',
        'auz',
        'avl',
        'ayh',
        'ayl',
        'ayn',
        'ayp',
        'bbz',
        'pga',
        'he',
        'iw',
        'ps',
        'pbt',
        'pbu',
        'pst',
        'prp',
        'prd',
        'ug',
        'ur',
        'ydd',
        'yds',
        'yih',
        'ji',
        'yi',
        'hbo',
        'men',
        'xmn',
        'fa',
        'jpr',
        'peo',
        'pes',
        'prs',
        'dv',
        'sam',
        'ckb',
      ],
      n = (this.services && this.services.languageUtils) || new ee(se());
    return t.indexOf(n.getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf('-arab') > 1
      ? 'rtl'
      : 'ltr';
  }
  static createInstance() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = arguments.length > 1 ? arguments[1] : void 0;
    return new I(e, t);
  }
  cloneInstance() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : V;
    const n = e.forkResourceStore;
    n && delete e.forkResourceStore;
    const s = { ...this.options, ...e, isClone: !0 },
      r = new I(s);
    return (
      (e.debug !== void 0 || e.prefix !== void 0) && (r.logger = r.logger.clone(e)),
      ['store', 'services', 'language'].forEach(o => {
        r[o] = this[o];
      }),
      (r.services = { ...this.services }),
      (r.services.utils = { hasLoadedNamespace: r.hasLoadedNamespace.bind(r) }),
      n && ((r.store = new q(this.store.data, s)), (r.services.resourceStore = r.store)),
      (r.translator = new J(r.services, s)),
      r.translator.on('*', function (o) {
        for (var l = arguments.length, f = new Array(l > 1 ? l - 1 : 0), g = 1; g < l; g++)
          f[g - 1] = arguments[g];
        r.emit(o, ...f);
      }),
      r.init(s, t),
      (r.translator.options = s),
      (r.translator.backendConnector.services.utils = {
        hasLoadedNamespace: r.hasLoadedNamespace.bind(r),
      }),
      r
    );
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage,
    };
  }
}
const b = I.createInstance();
b.createInstance = I.createInstance;
b.createInstance;
b.dir;
b.init;
b.loadResources;
b.reloadResources;
b.use;
b.changeLanguage;
b.getFixedT;
b.t;
b.exists;
b.setDefaultNamespace;
b.hasLoadedNamespace;
b.loadNamespaces;
b.loadLanguages;
const Te = i => {
    i = i.replace(/^\/+/g, '');
    const { defaultLocale: e, locales: t } = re,
      n = i.split('/');
    if (
      JSON.stringify(n) === JSON.stringify(['']) ||
      JSON.stringify(n) === JSON.stringify(['', ''])
    )
      return e;
    let s = [...t];
    s = s.filter(r => r !== e);
    for (const r of s) if (n[0] === r) return r;
    return e;
  },
  Ve = (i = '/', e = null, t = '/') => {
    e || (e = b.language);
    let n = i.split('/').filter(c => c !== '');
    const s = t.split('/').filter(c => c !== '');
    JSON.stringify(n).startsWith(JSON.stringify(s).replace(/]+$/, '')) && n.splice(0, s.length),
      (i = n.length === 0 ? '' : n.join('/')),
      (t = s.length === 0 ? '/' : '/' + s.join('/') + '/');
    const {
      flatRoutes: r,
      showDefaultLocale: a,
      defaultLocale: o,
      locales: l,
      trailingSlash: f,
    } = re;
    if (!l.includes(e))
      return (
        console.warn(
          `WARNING(astro-i18next): "${e}" locale is not supported, add it to the locales in your astro config.`,
        ),
        E(`${t}${i}`, f)
      );
    if (n.length === 0) return E(a ? `${t}${e}` : e === o ? t : `${t}${e}`, f);
    if (e === o) {
      const c = Object.keys(r).find(u => r[u] === '/' + i);
      typeof c < 'u' && (n = c.split('/').filter(u => u !== ''));
    }
    for (const c of l)
      if (n[0] === c) {
        n.shift();
        break;
      }
    (a || e !== o) && (n = [e, ...n]);
    const g = t + n.join('/');
    return Object.prototype.hasOwnProperty.call(r, g.replace(/\/$/, ''))
      ? E(r[g.replace(/\/$/, '')], f)
      : E(g, f);
  },
  E = (i, e) => {
    if (i === '/') return i;
    switch (e) {
      case 'always':
        return i.endsWith('/') ? i : i + '/';
      case 'never':
        return i.replace(/\/$/, '');
      default:
        return i;
    }
  },
  Ke = me('<button>'),
  Je = i => {
    const n = Te(i.path) ?? 'en',
      [s, r] = ge(n),
      a = () => {
        switch (s()) {
          case 'en':
            r('fr');
            break;
          case 'fr':
            r('ja');
            break;
          case 'ja':
            r('en');
            break;
          default:
            r('en');
        }
        location = Ve(i.path, s());
      };
    return (() => {
      const o = ce(Ke);
      return (o.$$click = a), he(() => pe(o, 'language-selector ' + s())), de(), o;
    })();
  };
fe(['click']);
export { Je as default };
