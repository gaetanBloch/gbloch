var Ce = !1,
  Me = !1,
  N = [],
  Te = -1;
function kn(e) {
  zn(e);
}
function zn(e) {
  N.includes(e) || N.push(e), Hn();
}
function Ct(e) {
  let t = N.indexOf(e);
  t !== -1 && t > Te && N.splice(t, 1);
}
function Hn() {
  !Me && !Ce && ((Ce = !0), queueMicrotask(qn));
}
function qn() {
  (Ce = !1), (Me = !0);
  for (let e = 0; e < N.length; e++) N[e](), (Te = e);
  (N.length = 0), (Te = -1), (Me = !1);
}
var z,
  H,
  Z,
  Mt,
  Ie = !0;
function Wn(e) {
  (Ie = !1), e(), (Ie = !0);
}
function Un(e) {
  (z = e.reactive),
    (Z = e.release),
    (H = t =>
      e.effect(t, {
        scheduler: n => {
          Ie ? kn(n) : n();
        },
      })),
    (Mt = e.raw);
}
function pt(e) {
  H = e;
}
function Jn(e) {
  let t = () => {};
  return [
    r => {
      let i = H(r);
      return (
        e._x_effects ||
          ((e._x_effects = new Set()),
          (e._x_runEffects = () => {
            e._x_effects.forEach(o => o());
          })),
        e._x_effects.add(i),
        (t = () => {
          i !== void 0 && (e._x_effects.delete(i), Z(i));
        }),
        i
      );
    },
    () => {
      t();
    },
  ];
}
function Y(e, t, n = {}) {
  e.dispatchEvent(new CustomEvent(t, { detail: n, bubbles: !0, composed: !0, cancelable: !0 }));
}
function I(e, t) {
  if (typeof ShadowRoot == 'function' && e instanceof ShadowRoot) {
    Array.from(e.children).forEach(i => I(i, t));
    return;
  }
  let n = !1;
  if ((t(e, () => (n = !0)), n)) return;
  let r = e.firstElementChild;
  for (; r; ) I(r, t), (r = r.nextElementSibling);
}
function O(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
var _t = !1;
function Vn() {
  _t &&
    O(
      'Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.',
    ),
    (_t = !0),
    document.body ||
      O(
        "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?",
      ),
    Y(document, 'alpine:init'),
    Y(document, 'alpine:initializing'),
    Ge(),
    Xn(t => C(t, I)),
    Je(t => Ue(t)),
    Kt((t, n) => {
      et(t, n).forEach(r => r());
    });
  let e = t => !he(t.parentElement, !0);
  Array.from(document.querySelectorAll(Pt().join(',')))
    .filter(e)
    .forEach(t => {
      C(t);
    }),
    Y(document, 'alpine:initialized');
}
var We = [],
  Tt = [];
function It() {
  return We.map(e => e());
}
function Pt() {
  return We.concat(Tt).map(e => e());
}
function $t(e) {
  We.push(e);
}
function Rt(e) {
  Tt.push(e);
}
function he(e, t = !1) {
  return ge(e, n => {
    if ((t ? Pt() : It()).some(i => n.matches(i))) return !0;
  });
}
function ge(e, t) {
  if (e) {
    if (t(e)) return e;
    if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement))
      return ge(e.parentElement, t);
  }
}
function Yn(e) {
  return It().some(t => e.matches(t));
}
var jt = [];
function Gn(e) {
  jt.push(e);
}
function C(e, t = I, n = () => {}) {
  dr(() => {
    t(e, (r, i) => {
      n(r, i), jt.forEach(o => o(r, i)), et(r, r.attributes).forEach(o => o()), r._x_ignore && i();
    });
  });
}
function Ue(e) {
  I(e, t => {
    Dt(t), Qn(t);
  });
}
var Nt = [],
  Lt = [],
  Ft = [];
function Xn(e) {
  Ft.push(e);
}
function Je(e, t) {
  typeof t == 'function'
    ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t))
    : ((t = e), Lt.push(t));
}
function Kt(e) {
  Nt.push(e);
}
function Bt(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}),
    e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
    e._x_attributeCleanups[t].push(n);
}
function Dt(e, t) {
  e._x_attributeCleanups &&
    Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
      (t === void 0 || t.includes(n)) && (r.forEach(i => i()), delete e._x_attributeCleanups[n]);
    });
}
function Qn(e) {
  if (e._x_cleanups) for (; e._x_cleanups.length; ) e._x_cleanups.pop()();
}
var Ve = new MutationObserver(Qe),
  Ye = !1;
function Ge() {
  Ve.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }),
    (Ye = !0);
}
function kt() {
  Zn(), Ve.disconnect(), (Ye = !1);
}
var G = [],
  we = !1;
function Zn() {
  (G = G.concat(Ve.takeRecords())),
    G.length &&
      !we &&
      ((we = !0),
      queueMicrotask(() => {
        er(), (we = !1);
      }));
}
function er() {
  Qe(G), (G.length = 0);
}
function y(e) {
  if (!Ye) return e();
  kt();
  let t = e();
  return Ge(), t;
}
var Xe = !1,
  de = [];
function tr() {
  Xe = !0;
}
function nr() {
  (Xe = !1), Qe(de), (de = []);
}
function Qe(e) {
  if (Xe) {
    de = de.concat(e);
    return;
  }
  let t = [],
    n = [],
    r = new Map(),
    i = new Map();
  for (let o = 0; o < e.length; o++)
    if (
      !e[o].target._x_ignoreMutationObserver &&
      (e[o].type === 'childList' &&
        (e[o].addedNodes.forEach(s => s.nodeType === 1 && t.push(s)),
        e[o].removedNodes.forEach(s => s.nodeType === 1 && n.push(s))),
      e[o].type === 'attributes')
    ) {
      let s = e[o].target,
        a = e[o].attributeName,
        u = e[o].oldValue,
        c = () => {
          r.has(s) || r.set(s, []), r.get(s).push({ name: a, value: s.getAttribute(a) });
        },
        l = () => {
          i.has(s) || i.set(s, []), i.get(s).push(a);
        };
      s.hasAttribute(a) && u === null ? c() : s.hasAttribute(a) ? (l(), c()) : l();
    }
  i.forEach((o, s) => {
    Dt(s, o);
  }),
    r.forEach((o, s) => {
      Nt.forEach(a => a(s, o));
    });
  for (let o of n) t.includes(o) || (Lt.forEach(s => s(o)), Ue(o));
  t.forEach(o => {
    (o._x_ignoreSelf = !0), (o._x_ignore = !0);
  });
  for (let o of t)
    n.includes(o) ||
      (o.isConnected &&
        (delete o._x_ignoreSelf,
        delete o._x_ignore,
        Ft.forEach(s => s(o)),
        (o._x_ignore = !0),
        (o._x_ignoreSelf = !0)));
  t.forEach(o => {
    delete o._x_ignoreSelf, delete o._x_ignore;
  }),
    (t = null),
    (n = null),
    (r = null),
    (i = null);
}
function zt(e) {
  return te(D(e));
}
function ee(e, t, n) {
  return (
    (e._x_dataStack = [t, ...D(n || e)]),
    () => {
      e._x_dataStack = e._x_dataStack.filter(r => r !== t);
    }
  );
}
function D(e) {
  return e._x_dataStack
    ? e._x_dataStack
    : typeof ShadowRoot == 'function' && e instanceof ShadowRoot
      ? D(e.host)
      : e.parentNode
        ? D(e.parentNode)
        : [];
}
function te(e) {
  return new Proxy({ objects: e }, rr);
}
var rr = {
  ownKeys({ objects: e }) {
    return Array.from(new Set(e.flatMap(t => Object.keys(t))));
  },
  has({ objects: e }, t) {
    return t == Symbol.unscopables ? !1 : e.some(n => Object.prototype.hasOwnProperty.call(n, t));
  },
  get({ objects: e }, t, n) {
    return t == 'toJSON'
      ? ir
      : Reflect.get(e.find(r => Object.prototype.hasOwnProperty.call(r, t)) || {}, t, n);
  },
  set({ objects: e }, t, n, r) {
    const i = e.find(s => Object.prototype.hasOwnProperty.call(s, t)) || e[e.length - 1],
      o = Object.getOwnPropertyDescriptor(i, t);
    return o?.set && o?.get ? Reflect.set(i, t, n, r) : Reflect.set(i, t, n);
  },
};
function ir() {
  return Reflect.ownKeys(this).reduce((t, n) => ((t[n] = Reflect.get(this, n)), t), {});
}
function Ht(e) {
  let t = r => typeof r == 'object' && !Array.isArray(r) && r !== null,
    n = (r, i = '') => {
      Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(
        ([o, { value: s, enumerable: a }]) => {
          if (a === !1 || s === void 0) return;
          let u = i === '' ? o : `${i}.${o}`;
          typeof s == 'object' && s !== null && s._x_interceptor
            ? (r[o] = s.initialize(e, u, o))
            : t(s) && s !== r && !(s instanceof Element) && n(s, u);
        },
      );
    };
  return n(e);
}
function qt(e, t = () => {}) {
  let n = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(r, i, o) {
      return e(
        this.initialValue,
        () => or(r, i),
        s => Pe(r, i, s),
        i,
        o,
      );
    },
  };
  return (
    t(n),
    r => {
      if (typeof r == 'object' && r !== null && r._x_interceptor) {
        let i = n.initialize.bind(n);
        n.initialize = (o, s, a) => {
          let u = r.initialize(o, s, a);
          return (n.initialValue = u), i(o, s, a);
        };
      } else n.initialValue = r;
      return n;
    }
  );
}
function or(e, t) {
  return t.split('.').reduce((n, r) => n[r], e);
}
function Pe(e, t, n) {
  if ((typeof t == 'string' && (t = t.split('.')), t.length === 1)) e[t[0]] = n;
  else {
    if (t.length === 0) throw error;
    return e[t[0]] || (e[t[0]] = {}), Pe(e[t[0]], t.slice(1), n);
  }
}
var Wt = {};
function S(e, t) {
  Wt[e] = t;
}
function $e(e, t) {
  return (
    Object.entries(Wt).forEach(([n, r]) => {
      let i = null;
      function o() {
        if (i) return i;
        {
          let [s, a] = Xt(t);
          return (i = { interceptor: qt, ...s }), Je(t, a), i;
        }
      }
      Object.defineProperty(e, `$${n}`, {
        get() {
          return r(t, o());
        },
        enumerable: !1,
      });
    }),
    e
  );
}
function sr(e, t, n, ...r) {
  try {
    return n(...r);
  } catch (i) {
    Q(i, e, t);
  }
}
function Q(e, t, n = void 0) {
  Object.assign(e, { el: t, expression: n }),
    console.warn(
      `Alpine Expression Error: ${e.message}

${
  n
    ? 'Expression: "' +
      n +
      `"

`
    : ''
}`,
      t,
    ),
    setTimeout(() => {
      throw e;
    }, 0);
}
var le = !0;
function Ut(e) {
  let t = le;
  le = !1;
  let n = e();
  return (le = t), n;
}
function L(e, t, n = {}) {
  let r;
  return m(e, t)(i => (r = i), n), r;
}
function m(...e) {
  return Jt(...e);
}
var Jt = Vt;
function ar(e) {
  Jt = e;
}
function Vt(e, t) {
  let n = {};
  $e(n, e);
  let r = [n, ...D(e)],
    i = typeof t == 'function' ? ur(r, t) : lr(r, t, e);
  return sr.bind(null, e, t, i);
}
function ur(e, t) {
  return (n = () => {}, { scope: r = {}, params: i = [] } = {}) => {
    let o = t.apply(te([r, ...e]), i);
    pe(n, o);
  };
}
var Ee = {};
function cr(e, t) {
  if (Ee[e]) return Ee[e];
  let n = Object.getPrototypeOf(async function () {}).constructor,
    r =
      /^[\n\s]*if.*\(.*\)/.test(e.trim()) || /^(let|const)\s/.test(e.trim())
        ? `(async()=>{ ${e} })()`
        : e,
    o = (() => {
      try {
        let s = new n(
          ['__self', 'scope'],
          `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`,
        );
        return Object.defineProperty(s, 'name', { value: `[Alpine] ${e}` }), s;
      } catch (s) {
        return Q(s, t, e), Promise.resolve();
      }
    })();
  return (Ee[e] = o), o;
}
function lr(e, t, n) {
  let r = cr(t, n);
  return (i = () => {}, { scope: o = {}, params: s = [] } = {}) => {
    (r.result = void 0), (r.finished = !1);
    let a = te([o, ...e]);
    if (typeof r == 'function') {
      let u = r(r, a).catch(c => Q(c, n, t));
      r.finished
        ? (pe(i, r.result, a, s, n), (r.result = void 0))
        : u
            .then(c => {
              pe(i, c, a, s, n);
            })
            .catch(c => Q(c, n, t))
            .finally(() => (r.result = void 0));
    }
  };
}
function pe(e, t, n, r, i) {
  if (le && typeof t == 'function') {
    let o = t.apply(n, r);
    o instanceof Promise ? o.then(s => pe(e, s, n, r)).catch(s => Q(s, i, t)) : e(o);
  } else typeof t == 'object' && t instanceof Promise ? t.then(o => e(o)) : e(t);
}
var Ze = 'x-';
function q(e = '') {
  return Ze + e;
}
function fr(e) {
  Ze = e;
}
var Re = {};
function g(e, t) {
  return (
    (Re[e] = t),
    {
      before(n) {
        if (!Re[n]) {
          console.warn(
            'Cannot find directive `${directive}`. `${name}` will use the default order of execution',
          );
          return;
        }
        const r = j.indexOf(n);
        j.splice(r >= 0 ? r : j.indexOf('DEFAULT'), 0, e);
      },
    }
  );
}
function et(e, t, n) {
  if (((t = Array.from(t)), e._x_virtualDirectives)) {
    let o = Object.entries(e._x_virtualDirectives).map(([a, u]) => ({ name: a, value: u })),
      s = Yt(o);
    (o = o.map(a =>
      s.find(u => u.name === a.name) ? { name: `x-bind:${a.name}`, value: `"${a.value}"` } : a,
    )),
      (t = t.concat(o));
  }
  let r = {};
  return t
    .map(en((o, s) => (r[o] = s)))
    .filter(nn)
    .map(_r(r, n))
    .sort(hr)
    .map(o => pr(e, o));
}
function Yt(e) {
  return Array.from(e)
    .map(en())
    .filter(t => !nn(t));
}
var je = !1,
  V = new Map(),
  Gt = Symbol();
function dr(e) {
  je = !0;
  let t = Symbol();
  (Gt = t), V.set(t, []);
  let n = () => {
      for (; V.get(t).length; ) V.get(t).shift()();
      V.delete(t);
    },
    r = () => {
      (je = !1), n();
    };
  e(n), r();
}
function Xt(e) {
  let t = [],
    n = a => t.push(a),
    [r, i] = Jn(e);
  return (
    t.push(i),
    [
      { Alpine: re, effect: r, cleanup: n, evaluateLater: m.bind(m, e), evaluate: L.bind(L, e) },
      () => t.forEach(a => a()),
    ]
  );
}
function pr(e, t) {
  let n = () => {},
    r = Re[t.type] || n,
    [i, o] = Xt(e);
  Bt(e, t.original, o);
  let s = () => {
    e._x_ignore ||
      e._x_ignoreSelf ||
      (r.inline && r.inline(e, t, i), (r = r.bind(r, e, t, i)), je ? V.get(Gt).push(r) : r());
  };
  return (s.runCleanups = o), s;
}
var Qt =
    (e, t) =>
    ({ name: n, value: r }) => (n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }),
  Zt = e => e;
function en(e = () => {}) {
  return ({ name: t, value: n }) => {
    let { name: r, value: i } = tn.reduce((o, s) => s(o), { name: t, value: n });
    return r !== t && e(r, t), { name: r, value: i };
  };
}
var tn = [];
function tt(e) {
  tn.push(e);
}
function nn({ name: e }) {
  return rn().test(e);
}
var rn = () => new RegExp(`^${Ze}([^:^.]+)\\b`);
function _r(e, t) {
  return ({ name: n, value: r }) => {
    let i = n.match(rn()),
      o = n.match(/:([a-zA-Z0-9\-_:]+)/),
      s = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
      a = t || e[n] || n;
    return {
      type: i ? i[1] : null,
      value: o ? o[1] : null,
      modifiers: s.map(u => u.replace('.', '')),
      expression: r,
      original: a,
    };
  };
}
var Ne = 'DEFAULT',
  j = [
    'ignore',
    'ref',
    'data',
    'id',
    'anchor',
    'bind',
    'init',
    'for',
    'model',
    'modelable',
    'transition',
    'show',
    'if',
    Ne,
    'teleport',
  ];
function hr(e, t) {
  let n = j.indexOf(e.type) === -1 ? Ne : e.type,
    r = j.indexOf(t.type) === -1 ? Ne : t.type;
  return j.indexOf(n) - j.indexOf(r);
}
var Le = [],
  nt = !1;
function rt(e = () => {}) {
  return (
    queueMicrotask(() => {
      nt ||
        setTimeout(() => {
          Fe();
        });
    }),
    new Promise(t => {
      Le.push(() => {
        e(), t();
      });
    })
  );
}
function Fe() {
  for (nt = !1; Le.length; ) Le.shift()();
}
function gr() {
  nt = !0;
}
function it(e, t) {
  return Array.isArray(t)
    ? ht(e, t.join(' '))
    : typeof t == 'object' && t !== null
      ? xr(e, t)
      : typeof t == 'function'
        ? it(e, t())
        : ht(e, t);
}
function ht(e, t) {
  let n = i =>
      i
        .split(' ')
        .filter(o => !e.classList.contains(o))
        .filter(Boolean),
    r = i => (
      e.classList.add(...i),
      () => {
        e.classList.remove(...i);
      }
    );
  return (t = t === !0 ? (t = '') : t || ''), r(n(t));
}
function xr(e, t) {
  let n = a => a.split(' ').filter(Boolean),
    r = Object.entries(t)
      .flatMap(([a, u]) => (u ? n(a) : !1))
      .filter(Boolean),
    i = Object.entries(t)
      .flatMap(([a, u]) => (u ? !1 : n(a)))
      .filter(Boolean),
    o = [],
    s = [];
  return (
    i.forEach(a => {
      e.classList.contains(a) && (e.classList.remove(a), s.push(a));
    }),
    r.forEach(a => {
      e.classList.contains(a) || (e.classList.add(a), o.push(a));
    }),
    () => {
      s.forEach(a => e.classList.add(a)), o.forEach(a => e.classList.remove(a));
    }
  );
}
function xe(e, t) {
  return typeof t == 'object' && t !== null ? yr(e, t) : vr(e, t);
}
function yr(e, t) {
  let n = {};
  return (
    Object.entries(t).forEach(([r, i]) => {
      (n[r] = e.style[r]), r.startsWith('--') || (r = br(r)), e.style.setProperty(r, i);
    }),
    setTimeout(() => {
      e.style.length === 0 && e.removeAttribute('style');
    }),
    () => {
      xe(e, n);
    }
  );
}
function vr(e, t) {
  let n = e.getAttribute('style', t);
  return (
    e.setAttribute('style', t),
    () => {
      e.setAttribute('style', n || '');
    }
  );
}
function br(e) {
  return e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function Ke(e, t = () => {}) {
  let n = !1;
  return function () {
    n ? t.apply(this, arguments) : ((n = !0), e.apply(this, arguments));
  };
}
g('transition', (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
  typeof r == 'function' && (r = i(r)),
    r !== !1 && (!r || typeof r == 'boolean' ? wr(e, n, t) : mr(e, r, t));
});
function mr(e, t, n) {
  on(e, it, ''),
    {
      enter: i => {
        e._x_transition.enter.during = i;
      },
      'enter-start': i => {
        e._x_transition.enter.start = i;
      },
      'enter-end': i => {
        e._x_transition.enter.end = i;
      },
      leave: i => {
        e._x_transition.leave.during = i;
      },
      'leave-start': i => {
        e._x_transition.leave.start = i;
      },
      'leave-end': i => {
        e._x_transition.leave.end = i;
      },
    }[n](t);
}
function wr(e, t, n) {
  on(e, xe);
  let r = !t.includes('in') && !t.includes('out') && !n,
    i = r || t.includes('in') || ['enter'].includes(n),
    o = r || t.includes('out') || ['leave'].includes(n);
  t.includes('in') && !r && (t = t.filter((_, x) => x < t.indexOf('out'))),
    t.includes('out') && !r && (t = t.filter((_, x) => x > t.indexOf('out')));
  let s = !t.includes('opacity') && !t.includes('scale'),
    a = s || t.includes('opacity'),
    u = s || t.includes('scale'),
    c = a ? 0 : 1,
    l = u ? U(t, 'scale', 95) / 100 : 1,
    d = U(t, 'delay', 0) / 1e3,
    p = U(t, 'origin', 'center'),
    v = 'opacity, transform',
    M = U(t, 'duration', 150) / 1e3,
    ie = U(t, 'duration', 75) / 1e3,
    f = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
  i &&
    ((e._x_transition.enter.during = {
      transformOrigin: p,
      transitionDelay: `${d}s`,
      transitionProperty: v,
      transitionDuration: `${M}s`,
      transitionTimingFunction: f,
    }),
    (e._x_transition.enter.start = { opacity: c, transform: `scale(${l})` }),
    (e._x_transition.enter.end = { opacity: 1, transform: 'scale(1)' })),
    o &&
      ((e._x_transition.leave.during = {
        transformOrigin: p,
        transitionDelay: `${d}s`,
        transitionProperty: v,
        transitionDuration: `${ie}s`,
        transitionTimingFunction: f,
      }),
      (e._x_transition.leave.start = { opacity: 1, transform: 'scale(1)' }),
      (e._x_transition.leave.end = { opacity: c, transform: `scale(${l})` }));
}
function on(e, t, n = {}) {
  e._x_transition ||
    (e._x_transition = {
      enter: { during: n, start: n, end: n },
      leave: { during: n, start: n, end: n },
      in(r = () => {}, i = () => {}) {
        Be(e, t, { during: this.enter.during, start: this.enter.start, end: this.enter.end }, r, i);
      },
      out(r = () => {}, i = () => {}) {
        Be(e, t, { during: this.leave.during, start: this.leave.start, end: this.leave.end }, r, i);
      },
    });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (e, t, n, r) {
  const i = document.visibilityState === 'visible' ? requestAnimationFrame : setTimeout;
  let o = () => i(n);
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave)
      ? e._x_transition.enter &&
        (Object.entries(e._x_transition.enter.during).length ||
          Object.entries(e._x_transition.enter.start).length ||
          Object.entries(e._x_transition.enter.end).length)
        ? e._x_transition.in(n)
        : o()
      : e._x_transition
        ? e._x_transition.in(n)
        : o();
    return;
  }
  (e._x_hidePromise = e._x_transition
    ? new Promise((s, a) => {
        e._x_transition.out(
          () => {},
          () => s(r),
        ),
          e._x_transitioning &&
            e._x_transitioning.beforeCancel(() => a({ isFromCancelledTransition: !0 }));
      })
    : Promise.resolve(r)),
    queueMicrotask(() => {
      let s = sn(e);
      s
        ? (s._x_hideChildren || (s._x_hideChildren = []), s._x_hideChildren.push(e))
        : i(() => {
            let a = u => {
              let c = Promise.all([u._x_hidePromise, ...(u._x_hideChildren || []).map(a)]).then(
                ([l]) => l(),
              );
              return delete u._x_hidePromise, delete u._x_hideChildren, c;
            };
            a(e).catch(u => {
              if (!u.isFromCancelledTransition) throw u;
            });
          });
    });
};
function sn(e) {
  let t = e.parentNode;
  if (t) return t._x_hidePromise ? t : sn(t);
}
function Be(e, t, { during: n, start: r, end: i } = {}, o = () => {}, s = () => {}) {
  if (
    (e._x_transitioning && e._x_transitioning.cancel(),
    Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(i).length === 0)
  ) {
    o(), s();
    return;
  }
  let a, u, c;
  Er(e, {
    start() {
      a = t(e, r);
    },
    during() {
      u = t(e, n);
    },
    before: o,
    end() {
      a(), (c = t(e, i));
    },
    after: s,
    cleanup() {
      u(), c();
    },
  });
}
function Er(e, t) {
  let n,
    r,
    i,
    o = Ke(() => {
      y(() => {
        (n = !0),
          r || t.before(),
          i || (t.end(), Fe()),
          t.after(),
          e.isConnected && t.cleanup(),
          delete e._x_transitioning;
      });
    });
  (e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(s) {
      this.beforeCancels.push(s);
    },
    cancel: Ke(function () {
      for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
      o();
    }),
    finish: o,
  }),
    y(() => {
      t.start(), t.during();
    }),
    gr(),
    requestAnimationFrame(() => {
      if (n) return;
      let s =
          Number(getComputedStyle(e).transitionDuration.replace(/,.*/, '').replace('s', '')) * 1e3,
        a = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, '').replace('s', '')) * 1e3;
      s === 0 && (s = Number(getComputedStyle(e).animationDuration.replace('s', '')) * 1e3),
        y(() => {
          t.before();
        }),
        (r = !0),
        requestAnimationFrame(() => {
          n ||
            (y(() => {
              t.end();
            }),
            Fe(),
            setTimeout(e._x_transitioning.finish, s + a),
            (i = !0));
        });
    });
}
function U(e, t, n) {
  if (e.indexOf(t) === -1) return n;
  const r = e[e.indexOf(t) + 1];
  if (!r || (t === 'scale' && isNaN(r))) return n;
  if (t === 'duration' || t === 'delay') {
    let i = r.match(/([0-9]+)ms/);
    if (i) return i[1];
  }
  return t === 'origin' &&
    ['top', 'right', 'left', 'center', 'bottom'].includes(e[e.indexOf(t) + 2])
    ? [r, e[e.indexOf(t) + 2]].join(' ')
    : r;
}
var P = !1;
function ne(e, t = () => {}) {
  return (...n) => (P ? t(...n) : e(...n));
}
function Sr(e) {
  return (...t) => P && e(...t);
}
var an = [];
function un(e) {
  an.push(e);
}
function Ar(e, t) {
  an.forEach(n => n(e, t)),
    (P = !0),
    cn(() => {
      C(t, (n, r) => {
        r(n, () => {});
      });
    }),
    (P = !1);
}
var De = !1;
function Or(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack),
    (P = !0),
    (De = !0),
    cn(() => {
      Cr(t);
    }),
    (P = !1),
    (De = !1);
}
function Cr(e) {
  let t = !1;
  C(e, (r, i) => {
    I(r, (o, s) => {
      if (t && Yn(o)) return s();
      (t = !0), i(o, s);
    });
  });
}
function cn(e) {
  let t = H;
  pt((n, r) => {
    let i = t(n);
    return Z(i), () => {};
  }),
    e(),
    pt(t);
}
function ln(e, t, n, r = []) {
  switch (
    (e._x_bindings || (e._x_bindings = z({})),
    (e._x_bindings[t] = n),
    (t = r.includes('camel') ? Nr(t) : t),
    t)
  ) {
    case 'value':
      Mr(e, n);
      break;
    case 'style':
      Ir(e, n);
      break;
    case 'class':
      Tr(e, n);
      break;
    case 'selected':
    case 'checked':
      Pr(e, t, n);
      break;
    default:
      fn(e, t, n);
      break;
  }
}
function Mr(e, t) {
  if (e.type === 'radio')
    e.attributes.value === void 0 && (e.value = t),
      window.fromModel &&
        (typeof t == 'boolean' ? (e.checked = fe(e.value) === t) : (e.checked = gt(e.value, t)));
  else if (e.type === 'checkbox')
    Number.isInteger(t)
      ? (e.value = t)
      : !Array.isArray(t) && typeof t != 'boolean' && ![null, void 0].includes(t)
        ? (e.value = String(t))
        : Array.isArray(t)
          ? (e.checked = t.some(n => gt(n, e.value)))
          : (e.checked = !!t);
  else if (e.tagName === 'SELECT') jr(e, t);
  else {
    if (e.value === t) return;
    e.value = t === void 0 ? '' : t;
  }
}
function Tr(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), (e._x_undoAddedClasses = it(e, t));
}
function Ir(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), (e._x_undoAddedStyles = xe(e, t));
}
function Pr(e, t, n) {
  fn(e, t, n), Rr(e, t, n);
}
function fn(e, t, n) {
  [null, void 0, !1].includes(n) && Lr(t) ? e.removeAttribute(t) : (dn(t) && (n = t), $r(e, t, n));
}
function $r(e, t, n) {
  e.getAttribute(t) != n && e.setAttribute(t, n);
}
function Rr(e, t, n) {
  e[t] !== n && (e[t] = n);
}
function jr(e, t) {
  const n = [].concat(t).map(r => r + '');
  Array.from(e.options).forEach(r => {
    r.selected = n.includes(r.value);
  });
}
function Nr(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function gt(e, t) {
  return e == t;
}
function fe(e) {
  return [1, '1', 'true', 'on', 'yes', !0].includes(e)
    ? !0
    : [0, '0', 'false', 'off', 'no', !1].includes(e)
      ? !1
      : e
        ? !!e
        : null;
}
function dn(e) {
  return [
    'disabled',
    'checked',
    'required',
    'readonly',
    'hidden',
    'open',
    'selected',
    'autofocus',
    'itemscope',
    'multiple',
    'novalidate',
    'allowfullscreen',
    'allowpaymentrequest',
    'formnovalidate',
    'autoplay',
    'controls',
    'loop',
    'muted',
    'playsinline',
    'default',
    'ismap',
    'reversed',
    'async',
    'defer',
    'nomodule',
  ].includes(e);
}
function Lr(e) {
  return !['aria-pressed', 'aria-checked', 'aria-expanded', 'aria-selected'].includes(e);
}
function Fr(e, t, n) {
  return e._x_bindings && e._x_bindings[t] !== void 0 ? e._x_bindings[t] : pn(e, t, n);
}
function Kr(e, t, n, r = !0) {
  if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
  if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
    let i = e._x_inlineBindings[t];
    return (i.extract = r), Ut(() => L(e, i.expression));
  }
  return pn(e, t, n);
}
function pn(e, t, n) {
  let r = e.getAttribute(t);
  return r === null
    ? typeof n == 'function'
      ? n()
      : n
    : r === ''
      ? !0
      : dn(t)
        ? !![t, 'true'].includes(r)
        : r;
}
function _n(e, t) {
  var n;
  return function () {
    var r = this,
      i = arguments,
      o = function () {
        (n = null), e.apply(r, i);
      };
    clearTimeout(n), (n = setTimeout(o, t));
  };
}
function hn(e, t) {
  let n;
  return function () {
    let r = this,
      i = arguments;
    n || (e.apply(r, i), (n = !0), setTimeout(() => (n = !1), t));
  };
}
function gn({ get: e, set: t }, { get: n, set: r }) {
  let i = !0,
    o,
    s = H(() => {
      const a = e(),
        u = n();
      if (i) r(Se(a)), (i = !1), (o = JSON.stringify(a));
      else {
        const c = JSON.stringify(a);
        c !== o ? (r(Se(a)), (o = c)) : (t(Se(u)), (o = JSON.stringify(u)));
      }
      JSON.stringify(n()), JSON.stringify(e());
    });
  return () => {
    Z(s);
  };
}
function Se(e) {
  return typeof e == 'object' ? JSON.parse(JSON.stringify(e)) : e;
}
function Br(e) {
  (Array.isArray(e) ? e : [e]).forEach(n => n(re));
}
var R = {},
  xt = !1;
function Dr(e, t) {
  if ((xt || ((R = z(R)), (xt = !0)), t === void 0)) return R[e];
  (R[e] = t),
    typeof t == 'object' &&
      t !== null &&
      t.hasOwnProperty('init') &&
      typeof t.init == 'function' &&
      R[e].init(),
    Ht(R[e]);
}
function kr() {
  return R;
}
var xn = {};
function zr(e, t) {
  let n = typeof t != 'function' ? () => t : t;
  return e instanceof Element ? yn(e, n()) : ((xn[e] = n), () => {});
}
function Hr(e) {
  return (
    Object.entries(xn).forEach(([t, n]) => {
      Object.defineProperty(e, t, {
        get() {
          return (...r) => n(...r);
        },
      });
    }),
    e
  );
}
function yn(e, t, n) {
  let r = [];
  for (; r.length; ) r.pop()();
  let i = Object.entries(t).map(([s, a]) => ({ name: s, value: a })),
    o = Yt(i);
  return (
    (i = i.map(s =>
      o.find(a => a.name === s.name) ? { name: `x-bind:${s.name}`, value: `"${s.value}"` } : s,
    )),
    et(e, i, n).map(s => {
      r.push(s.runCleanups), s();
    }),
    () => {
      for (; r.length; ) r.pop()();
    }
  );
}
var vn = {};
function qr(e, t) {
  vn[e] = t;
}
function Wr(e, t) {
  return (
    Object.entries(vn).forEach(([n, r]) => {
      Object.defineProperty(e, n, {
        get() {
          return (...i) => r.bind(t)(...i);
        },
        enumerable: !1,
      });
    }),
    e
  );
}
var Ur = {
    get reactive() {
      return z;
    },
    get release() {
      return Z;
    },
    get effect() {
      return H;
    },
    get raw() {
      return Mt;
    },
    version: '3.13.3',
    flushAndStopDeferringMutations: nr,
    dontAutoEvaluateFunctions: Ut,
    disableEffectScheduling: Wn,
    startObservingMutations: Ge,
    stopObservingMutations: kt,
    setReactivityEngine: Un,
    onAttributeRemoved: Bt,
    onAttributesAdded: Kt,
    closestDataStack: D,
    skipDuringClone: ne,
    onlyDuringClone: Sr,
    addRootSelector: $t,
    addInitSelector: Rt,
    interceptClone: un,
    addScopeToNode: ee,
    deferMutations: tr,
    mapAttributes: tt,
    evaluateLater: m,
    interceptInit: Gn,
    setEvaluator: ar,
    mergeProxies: te,
    extractProp: Kr,
    findClosest: ge,
    onElRemoved: Je,
    closestRoot: he,
    destroyTree: Ue,
    interceptor: qt,
    transition: Be,
    setStyles: xe,
    mutateDom: y,
    directive: g,
    entangle: gn,
    throttle: hn,
    debounce: _n,
    evaluate: L,
    initTree: C,
    nextTick: rt,
    prefixed: q,
    prefix: fr,
    plugin: Br,
    magic: S,
    store: Dr,
    start: Vn,
    clone: Or,
    cloneNode: Ar,
    bound: Fr,
    $data: zt,
    walk: I,
    data: qr,
    bind: zr,
  },
  re = Ur;
function Jr(e, t) {
  const n = Object.create(null),
    r = e.split(',');
  for (let i = 0; i < r.length; i++) n[r[i]] = !0;
  return t ? i => !!n[i.toLowerCase()] : i => !!n[i];
}
var Vr = Object.freeze({}),
  Yr = Object.prototype.hasOwnProperty,
  ye = (e, t) => Yr.call(e, t),
  F = Array.isArray,
  X = e => bn(e) === '[object Map]',
  Gr = e => typeof e == 'string',
  ot = e => typeof e == 'symbol',
  ve = e => e !== null && typeof e == 'object',
  Xr = Object.prototype.toString,
  bn = e => Xr.call(e),
  mn = e => bn(e).slice(8, -1),
  st = e => Gr(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  Qr = e => {
    const t = Object.create(null);
    return n => t[n] || (t[n] = e(n));
  },
  Zr = Qr(e => e.charAt(0).toUpperCase() + e.slice(1)),
  wn = (e, t) => e !== t && (e === e || t === t),
  ke = new WeakMap(),
  J = [],
  A,
  K = Symbol('iterate'),
  ze = Symbol('Map key iterate');
function ei(e) {
  return e && e._isEffect === !0;
}
function ti(e, t = Vr) {
  ei(e) && (e = e.raw);
  const n = ii(e, t);
  return t.lazy || n(), n;
}
function ni(e) {
  e.active && (En(e), e.options.onStop && e.options.onStop(), (e.active = !1));
}
var ri = 0;
function ii(e, t) {
  const n = function () {
    if (!n.active) return e();
    if (!J.includes(n)) {
      En(n);
      try {
        return si(), J.push(n), (A = n), e();
      } finally {
        J.pop(), Sn(), (A = J[J.length - 1]);
      }
    }
  };
  return (
    (n.id = ri++),
    (n.allowRecurse = !!t.allowRecurse),
    (n._isEffect = !0),
    (n.active = !0),
    (n.raw = e),
    (n.deps = []),
    (n.options = t),
    n
  );
}
function En(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
var k = !0,
  at = [];
function oi() {
  at.push(k), (k = !1);
}
function si() {
  at.push(k), (k = !0);
}
function Sn() {
  const e = at.pop();
  k = e === void 0 ? !0 : e;
}
function E(e, t, n) {
  if (!k || A === void 0) return;
  let r = ke.get(e);
  r || ke.set(e, (r = new Map()));
  let i = r.get(n);
  i || r.set(n, (i = new Set())),
    i.has(A) ||
      (i.add(A),
      A.deps.push(i),
      A.options.onTrack && A.options.onTrack({ effect: A, target: e, type: t, key: n }));
}
function $(e, t, n, r, i, o) {
  const s = ke.get(e);
  if (!s) return;
  const a = new Set(),
    u = l => {
      l &&
        l.forEach(d => {
          (d !== A || d.allowRecurse) && a.add(d);
        });
    };
  if (t === 'clear') s.forEach(u);
  else if (n === 'length' && F(e))
    s.forEach((l, d) => {
      (d === 'length' || d >= r) && u(l);
    });
  else
    switch ((n !== void 0 && u(s.get(n)), t)) {
      case 'add':
        F(e) ? st(n) && u(s.get('length')) : (u(s.get(K)), X(e) && u(s.get(ze)));
        break;
      case 'delete':
        F(e) || (u(s.get(K)), X(e) && u(s.get(ze)));
        break;
      case 'set':
        X(e) && u(s.get(K));
        break;
    }
  const c = l => {
    l.options.onTrigger &&
      l.options.onTrigger({
        effect: l,
        target: e,
        key: n,
        type: t,
        newValue: r,
        oldValue: i,
        oldTarget: o,
      }),
      l.options.scheduler ? l.options.scheduler(l) : l();
  };
  a.forEach(c);
}
var ai = Jr('__proto__,__v_isRef,__isVue'),
  An = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map(e => Symbol[e])
      .filter(ot),
  ),
  ui = On(),
  ci = On(!0),
  yt = li();
function li() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach(t => {
      e[t] = function (...n) {
        const r = h(this);
        for (let o = 0, s = this.length; o < s; o++) E(r, 'get', o + '');
        const i = r[t](...n);
        return i === -1 || i === !1 ? r[t](...n.map(h)) : i;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(t => {
      e[t] = function (...n) {
        oi();
        const r = h(this)[t].apply(this, n);
        return Sn(), r;
      };
    }),
    e
  );
}
function On(e = !1, t = !1) {
  return function (r, i, o) {
    if (i === '__v_isReactive') return !e;
    if (i === '__v_isReadonly') return e;
    if (i === '__v_raw' && o === (e ? (t ? Oi : In) : t ? Ai : Tn).get(r)) return r;
    const s = F(r);
    if (!e && s && ye(yt, i)) return Reflect.get(yt, i, o);
    const a = Reflect.get(r, i, o);
    return (ot(i) ? An.has(i) : ai(i)) || (e || E(r, 'get', i), t)
      ? a
      : He(a)
        ? !s || !st(i)
          ? a.value
          : a
        : ve(a)
          ? e
            ? Pn(a)
            : ft(a)
          : a;
  };
}
var fi = di();
function di(e = !1) {
  return function (n, r, i, o) {
    let s = n[r];
    if (!e && ((i = h(i)), (s = h(s)), !F(n) && He(s) && !He(i))) return (s.value = i), !0;
    const a = F(n) && st(r) ? Number(r) < n.length : ye(n, r),
      u = Reflect.set(n, r, i, o);
    return n === h(o) && (a ? wn(i, s) && $(n, 'set', r, i, s) : $(n, 'add', r, i)), u;
  };
}
function pi(e, t) {
  const n = ye(e, t),
    r = e[t],
    i = Reflect.deleteProperty(e, t);
  return i && n && $(e, 'delete', t, void 0, r), i;
}
function _i(e, t) {
  const n = Reflect.has(e, t);
  return (!ot(t) || !An.has(t)) && E(e, 'has', t), n;
}
function hi(e) {
  return E(e, 'iterate', F(e) ? 'length' : K), Reflect.ownKeys(e);
}
var gi = { get: ui, set: fi, deleteProperty: pi, has: _i, ownKeys: hi },
  xi = {
    get: ci,
    set(e, t) {
      return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
    },
    deleteProperty(e, t) {
      return (
        console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0
      );
    },
  },
  ut = e => (ve(e) ? ft(e) : e),
  ct = e => (ve(e) ? Pn(e) : e),
  lt = e => e,
  be = e => Reflect.getPrototypeOf(e);
function oe(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = h(e),
    o = h(t);
  t !== o && !n && E(i, 'get', t), !n && E(i, 'get', o);
  const { has: s } = be(i),
    a = r ? lt : n ? ct : ut;
  if (s.call(i, t)) return a(e.get(t));
  if (s.call(i, o)) return a(e.get(o));
  e !== i && e.get(t);
}
function se(e, t = !1) {
  const n = this.__v_raw,
    r = h(n),
    i = h(e);
  return (
    e !== i && !t && E(r, 'has', e), !t && E(r, 'has', i), e === i ? n.has(e) : n.has(e) || n.has(i)
  );
}
function ae(e, t = !1) {
  return (e = e.__v_raw), !t && E(h(e), 'iterate', K), Reflect.get(e, 'size', e);
}
function vt(e) {
  e = h(e);
  const t = h(this);
  return be(t).has.call(t, e) || (t.add(e), $(t, 'add', e, e)), this;
}
function bt(e, t) {
  t = h(t);
  const n = h(this),
    { has: r, get: i } = be(n);
  let o = r.call(n, e);
  o ? Mn(n, r, e) : ((e = h(e)), (o = r.call(n, e)));
  const s = i.call(n, e);
  return n.set(e, t), o ? wn(t, s) && $(n, 'set', e, t, s) : $(n, 'add', e, t), this;
}
function mt(e) {
  const t = h(this),
    { has: n, get: r } = be(t);
  let i = n.call(t, e);
  i ? Mn(t, n, e) : ((e = h(e)), (i = n.call(t, e)));
  const o = r ? r.call(t, e) : void 0,
    s = t.delete(e);
  return i && $(t, 'delete', e, void 0, o), s;
}
function wt() {
  const e = h(this),
    t = e.size !== 0,
    n = X(e) ? new Map(e) : new Set(e),
    r = e.clear();
  return t && $(e, 'clear', void 0, void 0, n), r;
}
function ue(e, t) {
  return function (r, i) {
    const o = this,
      s = o.__v_raw,
      a = h(s),
      u = t ? lt : e ? ct : ut;
    return !e && E(a, 'iterate', K), s.forEach((c, l) => r.call(i, u(c), u(l), o));
  };
}
function ce(e, t, n) {
  return function (...r) {
    const i = this.__v_raw,
      o = h(i),
      s = X(o),
      a = e === 'entries' || (e === Symbol.iterator && s),
      u = e === 'keys' && s,
      c = i[e](...r),
      l = n ? lt : t ? ct : ut;
    return (
      !t && E(o, 'iterate', u ? ze : K),
      {
        next() {
          const { value: d, done: p } = c.next();
          return p ? { value: d, done: p } : { value: a ? [l(d[0]), l(d[1])] : l(d), done: p };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function T(e) {
  return function (...t) {
    {
      const n = t[0] ? `on key "${t[0]}" ` : '';
      console.warn(`${Zr(e)} operation ${n}failed: target is readonly.`, h(this));
    }
    return e === 'delete' ? !1 : this;
  };
}
function yi() {
  const e = {
      get(o) {
        return oe(this, o);
      },
      get size() {
        return ae(this);
      },
      has: se,
      add: vt,
      set: bt,
      delete: mt,
      clear: wt,
      forEach: ue(!1, !1),
    },
    t = {
      get(o) {
        return oe(this, o, !1, !0);
      },
      get size() {
        return ae(this);
      },
      has: se,
      add: vt,
      set: bt,
      delete: mt,
      clear: wt,
      forEach: ue(!1, !0),
    },
    n = {
      get(o) {
        return oe(this, o, !0);
      },
      get size() {
        return ae(this, !0);
      },
      has(o) {
        return se.call(this, o, !0);
      },
      add: T('add'),
      set: T('set'),
      delete: T('delete'),
      clear: T('clear'),
      forEach: ue(!0, !1),
    },
    r = {
      get(o) {
        return oe(this, o, !0, !0);
      },
      get size() {
        return ae(this, !0);
      },
      has(o) {
        return se.call(this, o, !0);
      },
      add: T('add'),
      set: T('set'),
      delete: T('delete'),
      clear: T('clear'),
      forEach: ue(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach(o => {
      (e[o] = ce(o, !1, !1)),
        (n[o] = ce(o, !0, !1)),
        (t[o] = ce(o, !1, !0)),
        (r[o] = ce(o, !0, !0));
    }),
    [e, n, t, r]
  );
}
var [vi, bi, mi, wi] = yi();
function Cn(e, t) {
  const n = t ? (e ? wi : mi) : e ? bi : vi;
  return (r, i, o) =>
    i === '__v_isReactive'
      ? !e
      : i === '__v_isReadonly'
        ? e
        : i === '__v_raw'
          ? r
          : Reflect.get(ye(n, i) && i in r ? n : r, i, o);
}
var Ei = { get: Cn(!1, !1) },
  Si = { get: Cn(!0, !1) };
function Mn(e, t, n) {
  const r = h(n);
  if (r !== n && t.call(e, r)) {
    const i = mn(e);
    console.warn(
      `Reactive ${i} contains both the raw and reactive versions of the same object${
        i === 'Map' ? ' as keys' : ''
      }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`,
    );
  }
}
var Tn = new WeakMap(),
  Ai = new WeakMap(),
  In = new WeakMap(),
  Oi = new WeakMap();
function Ci(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function Mi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ci(mn(e));
}
function ft(e) {
  return e && e.__v_isReadonly ? e : $n(e, !1, gi, Ei, Tn);
}
function Pn(e) {
  return $n(e, !0, xi, Si, In);
}
function $n(e, t, n, r, i) {
  if (!ve(e)) return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive)) return e;
  const o = i.get(e);
  if (o) return o;
  const s = Mi(e);
  if (s === 0) return e;
  const a = new Proxy(e, s === 2 ? r : n);
  return i.set(e, a), a;
}
function h(e) {
  return (e && h(e.__v_raw)) || e;
}
function He(e) {
  return !!(e && e.__v_isRef === !0);
}
S('nextTick', () => rt);
S('dispatch', e => Y.bind(Y, e));
S('watch', (e, { evaluateLater: t, effect: n }) => (r, i) => {
  let o = t(r),
    s = !0,
    a,
    u = n(() =>
      o(c => {
        JSON.stringify(c),
          s
            ? (a = c)
            : queueMicrotask(() => {
                i(c, a), (a = c);
              }),
          (s = !1);
      }),
    );
  e._x_effects.delete(u);
});
S('store', kr);
S('data', e => zt(e));
S('root', e => he(e));
S('refs', e => (e._x_refs_proxy || (e._x_refs_proxy = te(Ti(e))), e._x_refs_proxy));
function Ti(e) {
  let t = [],
    n = e;
  for (; n; ) n._x_refs && t.push(n._x_refs), (n = n.parentNode);
  return t;
}
var Ae = {};
function Rn(e) {
  return Ae[e] || (Ae[e] = 0), ++Ae[e];
}
function Ii(e, t) {
  return ge(e, n => {
    if (n._x_ids && n._x_ids[t]) return !0;
  });
}
function Pi(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Rn(t));
}
S('id', e => (t, n = null) => {
  let r = Ii(e, t),
    i = r ? r._x_ids[t] : Rn(t);
  return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
S('el', e => e);
jn('Focus', 'focus', 'focus');
jn('Persist', 'persist', 'persist');
function jn(e, t, n) {
  S(t, r =>
    O(
      `You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
      r,
    ),
  );
}
g('modelable', (e, { expression: t }, { effect: n, evaluateLater: r, cleanup: i }) => {
  let o = r(t),
    s = () => {
      let l;
      return o(d => (l = d)), l;
    },
    a = r(`${t} = __placeholder`),
    u = l => a(() => {}, { scope: { __placeholder: l } }),
    c = s();
  u(c),
    queueMicrotask(() => {
      if (!e._x_model) return;
      e._x_removeModelListeners.default();
      let l = e._x_model.get,
        d = e._x_model.set,
        p = gn(
          {
            get() {
              return l();
            },
            set(v) {
              d(v);
            },
          },
          {
            get() {
              return s();
            },
            set(v) {
              u(v);
            },
          },
        );
      i(p);
    });
});
g('teleport', (e, { modifiers: t, expression: n }, { cleanup: r }) => {
  e.tagName.toLowerCase() !== 'template' && O('x-teleport can only be used on a <template> tag', e);
  let i = Et(n),
    o = e.content.cloneNode(!0).firstElementChild;
  (e._x_teleport = o),
    (o._x_teleportBack = e),
    e.setAttribute('data-teleport-template', !0),
    o.setAttribute('data-teleport-target', !0),
    e._x_forwardEvents &&
      e._x_forwardEvents.forEach(a => {
        o.addEventListener(a, u => {
          u.stopPropagation(), e.dispatchEvent(new u.constructor(u.type, u));
        });
      }),
    ee(o, {}, e);
  let s = (a, u, c) => {
    c.includes('prepend')
      ? u.parentNode.insertBefore(a, u)
      : c.includes('append')
        ? u.parentNode.insertBefore(a, u.nextSibling)
        : u.appendChild(a);
  };
  y(() => {
    s(o, i, t), C(o), (o._x_ignore = !0);
  }),
    (e._x_teleportPutBack = () => {
      let a = Et(n);
      y(() => {
        s(e._x_teleport, a, t);
      });
    }),
    r(() => o.remove());
});
var $i = document.createElement('div');
function Et(e) {
  let t = ne(
    () => document.querySelector(e),
    () => $i,
  )();
  return t || O(`Cannot find x-teleport element for selector: "${e}"`), t;
}
var Nn = () => {};
Nn.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes('self') ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
    n(() => {
      t.includes('self') ? delete e._x_ignoreSelf : delete e._x_ignore;
    });
};
g('ignore', Nn);
g(
  'effect',
  ne((e, { expression: t }, { effect: n }) => {
    n(m(e, t));
  }),
);
function qe(e, t, n, r) {
  let i = e,
    o = u => r(u),
    s = {},
    a = (u, c) => l => c(u, l);
  if (
    (n.includes('dot') && (t = Ri(t)),
    n.includes('camel') && (t = ji(t)),
    n.includes('passive') && (s.passive = !0),
    n.includes('capture') && (s.capture = !0),
    n.includes('window') && (i = window),
    n.includes('document') && (i = document),
    n.includes('debounce'))
  ) {
    let u = n[n.indexOf('debounce') + 1] || 'invalid-wait',
      c = _e(u.split('ms')[0]) ? Number(u.split('ms')[0]) : 250;
    o = _n(o, c);
  }
  if (n.includes('throttle')) {
    let u = n[n.indexOf('throttle') + 1] || 'invalid-wait',
      c = _e(u.split('ms')[0]) ? Number(u.split('ms')[0]) : 250;
    o = hn(o, c);
  }
  return (
    n.includes('prevent') &&
      (o = a(o, (u, c) => {
        c.preventDefault(), u(c);
      })),
    n.includes('stop') &&
      (o = a(o, (u, c) => {
        c.stopPropagation(), u(c);
      })),
    n.includes('self') &&
      (o = a(o, (u, c) => {
        c.target === e && u(c);
      })),
    (n.includes('away') || n.includes('outside')) &&
      ((i = document),
      (o = a(o, (u, c) => {
        e.contains(c.target) ||
          (c.target.isConnected !== !1 &&
            ((e.offsetWidth < 1 && e.offsetHeight < 1) || (e._x_isShown !== !1 && u(c))));
      }))),
    n.includes('once') &&
      (o = a(o, (u, c) => {
        u(c), i.removeEventListener(t, o, s);
      })),
    (o = a(o, (u, c) => {
      (Li(t) && Fi(c, n)) || u(c);
    })),
    i.addEventListener(t, o, s),
    () => {
      i.removeEventListener(t, o, s);
    }
  );
}
function Ri(e) {
  return e.replace(/-/g, '.');
}
function ji(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function _e(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Ni(e) {
  return [' ', '_'].includes(e)
    ? e
    : e
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[_\s]/, '-')
        .toLowerCase();
}
function Li(e) {
  return ['keydown', 'keyup'].includes(e);
}
function Fi(e, t) {
  let n = t.filter(o => !['window', 'document', 'prevent', 'stop', 'once', 'capture'].includes(o));
  if (n.includes('debounce')) {
    let o = n.indexOf('debounce');
    n.splice(o, _e((n[o + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
  }
  if (n.includes('throttle')) {
    let o = n.indexOf('throttle');
    n.splice(o, _e((n[o + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
  }
  if (n.length === 0 || (n.length === 1 && St(e.key).includes(n[0]))) return !1;
  const i = ['ctrl', 'shift', 'alt', 'meta', 'cmd', 'super'].filter(o => n.includes(o));
  return (
    (n = n.filter(o => !i.includes(o))),
    !(
      i.length > 0 &&
      i.filter(s => ((s === 'cmd' || s === 'super') && (s = 'meta'), e[`${s}Key`])).length ===
        i.length &&
      St(e.key).includes(n[0])
    )
  );
}
function St(e) {
  if (!e) return [];
  e = Ni(e);
  let t = {
    ctrl: 'control',
    slash: '/',
    space: ' ',
    spacebar: ' ',
    cmd: 'meta',
    esc: 'escape',
    up: 'arrow-up',
    down: 'arrow-down',
    left: 'arrow-left',
    right: 'arrow-right',
    period: '.',
    equal: '=',
    minus: '-',
    underscore: '_',
  };
  return (
    (t[e] = e),
    Object.keys(t)
      .map(n => {
        if (t[n] === e) return n;
      })
      .filter(n => n)
  );
}
g('model', (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
  let o = e;
  t.includes('parent') && (o = e.parentNode);
  let s = m(o, n),
    a;
  typeof n == 'string'
    ? (a = m(o, `${n} = __placeholder`))
    : typeof n == 'function' && typeof n() == 'string'
      ? (a = m(o, `${n()} = __placeholder`))
      : (a = () => {});
  let u = () => {
      let p;
      return s(v => (p = v)), At(p) ? p.get() : p;
    },
    c = p => {
      let v;
      s(M => (v = M)), At(v) ? v.set(p) : a(() => {}, { scope: { __placeholder: p } });
    };
  typeof n == 'string' &&
    e.type === 'radio' &&
    y(() => {
      e.hasAttribute('name') || e.setAttribute('name', n);
    });
  var l =
    e.tagName.toLowerCase() === 'select' ||
    ['checkbox', 'radio'].includes(e.type) ||
    t.includes('lazy')
      ? 'change'
      : 'input';
  let d = P
    ? () => {}
    : qe(e, l, t, p => {
        c(Ki(e, t, p, u()));
      });
  if (
    (t.includes('fill') &&
      ([null, ''].includes(u()) || (e.type === 'checkbox' && Array.isArray(u()))) &&
      e.dispatchEvent(new Event(l, {})),
    e._x_removeModelListeners || (e._x_removeModelListeners = {}),
    (e._x_removeModelListeners.default = d),
    i(() => e._x_removeModelListeners.default()),
    e.form)
  ) {
    let p = qe(e.form, 'reset', [], v => {
      rt(() => e._x_model && e._x_model.set(e.value));
    });
    i(() => p());
  }
  (e._x_model = {
    get() {
      return u();
    },
    set(p) {
      c(p);
    },
  }),
    (e._x_forceModelUpdate = p => {
      p === void 0 && typeof n == 'string' && n.match(/\./) && (p = ''),
        (window.fromModel = !0),
        y(() => ln(e, 'value', p)),
        delete window.fromModel;
    }),
    r(() => {
      let p = u();
      (t.includes('unintrusive') && document.activeElement.isSameNode(e)) ||
        e._x_forceModelUpdate(p);
    });
});
function Ki(e, t, n, r) {
  return y(() => {
    if (n instanceof CustomEvent && n.detail !== void 0)
      return n.detail !== null && n.detail !== void 0 ? n.detail : n.target.value;
    if (e.type === 'checkbox')
      if (Array.isArray(r)) {
        let i = null;
        return (
          t.includes('number')
            ? (i = Oe(n.target.value))
            : t.includes('boolean')
              ? (i = fe(n.target.value))
              : (i = n.target.value),
          n.target.checked ? r.concat([i]) : r.filter(o => !Bi(o, i))
        );
      } else return n.target.checked;
    else
      return e.tagName.toLowerCase() === 'select' && e.multiple
        ? t.includes('number')
          ? Array.from(n.target.selectedOptions).map(i => {
              let o = i.value || i.text;
              return Oe(o);
            })
          : t.includes('boolean')
            ? Array.from(n.target.selectedOptions).map(i => {
                let o = i.value || i.text;
                return fe(o);
              })
            : Array.from(n.target.selectedOptions).map(i => i.value || i.text)
        : t.includes('number')
          ? Oe(n.target.value)
          : t.includes('boolean')
            ? fe(n.target.value)
            : t.includes('trim')
              ? n.target.value.trim()
              : n.target.value;
  });
}
function Oe(e) {
  let t = e ? parseFloat(e) : null;
  return Di(t) ? t : e;
}
function Bi(e, t) {
  return e == t;
}
function Di(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function At(e) {
  return (
    e !== null && typeof e == 'object' && typeof e.get == 'function' && typeof e.set == 'function'
  );
}
g('cloak', e => queueMicrotask(() => y(() => e.removeAttribute(q('cloak')))));
Rt(() => `[${q('init')}]`);
g(
  'init',
  ne((e, { expression: t }, { evaluate: n }) =>
    typeof t == 'string' ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1),
  ),
);
g('text', (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i(o => {
      y(() => {
        e.textContent = o;
      });
    });
  });
});
g('html', (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i(o => {
      y(() => {
        (e.innerHTML = o), (e._x_ignoreSelf = !0), C(e), delete e._x_ignoreSelf;
      });
    });
  });
});
tt(Qt(':', Zt(q('bind:'))));
var Ln = (e, { value: t, modifiers: n, expression: r, original: i }, { effect: o }) => {
  if (!t) {
    let a = {};
    Hr(a),
      m(e, r)(
        c => {
          yn(e, c, i);
        },
        { scope: a },
      );
    return;
  }
  if (t === 'key') return ki(e, r);
  if (e._x_inlineBindings && e._x_inlineBindings[t] && e._x_inlineBindings[t].extract) return;
  let s = m(e, r);
  o(() =>
    s(a => {
      a === void 0 && typeof r == 'string' && r.match(/\./) && (a = ''), y(() => ln(e, t, a, n));
    }),
  );
};
Ln.inline = (e, { value: t, modifiers: n, expression: r }) => {
  t &&
    (e._x_inlineBindings || (e._x_inlineBindings = {}),
    (e._x_inlineBindings[t] = { expression: r, extract: !1 }));
};
g('bind', Ln);
function ki(e, t) {
  e._x_keyExpression = t;
}
$t(() => `[${q('data')}]`);
g('data', (e, { expression: t }, { cleanup: n }) => {
  if (zi(e)) return;
  t = t === '' ? '{}' : t;
  let r = {};
  $e(r, e);
  let i = {};
  Wr(i, r);
  let o = L(e, t, { scope: i });
  (o === void 0 || o === !0) && (o = {}), $e(o, e);
  let s = z(o);
  Ht(s);
  let a = ee(e, s);
  s.init && L(e, s.init),
    n(() => {
      s.destroy && L(e, s.destroy), a();
    });
});
un((e, t) => {
  e._x_dataStack &&
    ((t._x_dataStack = e._x_dataStack), t.setAttribute('data-has-alpine-state', !0));
});
function zi(e) {
  return P ? (De ? !0 : e.hasAttribute('data-has-alpine-state')) : !1;
}
g('show', (e, { modifiers: t, expression: n }, { effect: r }) => {
  let i = m(e, n);
  e._x_doHide ||
    (e._x_doHide = () => {
      y(() => {
        e.style.setProperty('display', 'none', t.includes('important') ? 'important' : void 0);
      });
    }),
    e._x_doShow ||
      (e._x_doShow = () => {
        y(() => {
          e.style.length === 1 && e.style.display === 'none'
            ? e.removeAttribute('style')
            : e.style.removeProperty('display');
        });
      });
  let o = () => {
      e._x_doHide(), (e._x_isShown = !1);
    },
    s = () => {
      e._x_doShow(), (e._x_isShown = !0);
    },
    a = () => setTimeout(s),
    u = Ke(
      d => (d ? s() : o()),
      d => {
        typeof e._x_toggleAndCascadeWithTransitions == 'function'
          ? e._x_toggleAndCascadeWithTransitions(e, d, s, o)
          : d
            ? a()
            : o();
      },
    ),
    c,
    l = !0;
  r(() =>
    i(d => {
      (!l && d === c) || (t.includes('immediate') && (d ? a() : o()), u(d), (c = d), (l = !1));
    }),
  );
});
g('for', (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = qi(t),
    o = m(e, i.items),
    s = m(e, e._x_keyExpression || 'index');
  (e._x_prevKeys = []),
    (e._x_lookup = {}),
    n(() => Hi(e, i, o, s)),
    r(() => {
      Object.values(e._x_lookup).forEach(a => a.remove()), delete e._x_prevKeys, delete e._x_lookup;
    });
});
function Hi(e, t, n, r) {
  let i = s => typeof s == 'object' && !Array.isArray(s),
    o = e;
  n(s => {
    Wi(s) && s >= 0 && (s = Array.from(Array(s).keys(), f => f + 1)), s === void 0 && (s = []);
    let a = e._x_lookup,
      u = e._x_prevKeys,
      c = [],
      l = [];
    if (i(s))
      s = Object.entries(s).map(([f, _]) => {
        let x = Ot(t, _, f, s);
        r(b => l.push(b), { scope: { index: f, ...x } }), c.push(x);
      });
    else
      for (let f = 0; f < s.length; f++) {
        let _ = Ot(t, s[f], f, s);
        r(x => l.push(x), { scope: { index: f, ..._ } }), c.push(_);
      }
    let d = [],
      p = [],
      v = [],
      M = [];
    for (let f = 0; f < u.length; f++) {
      let _ = u[f];
      l.indexOf(_) === -1 && v.push(_);
    }
    u = u.filter(f => !v.includes(f));
    let ie = 'template';
    for (let f = 0; f < l.length; f++) {
      let _ = l[f],
        x = u.indexOf(_);
      if (x === -1) u.splice(f, 0, _), d.push([ie, f]);
      else if (x !== f) {
        let b = u.splice(f, 1)[0],
          w = u.splice(x - 1, 1)[0];
        u.splice(f, 0, w), u.splice(x, 0, b), p.push([b, w]);
      } else M.push(_);
      ie = _;
    }
    for (let f = 0; f < v.length; f++) {
      let _ = v[f];
      a[_]._x_effects && a[_]._x_effects.forEach(Ct), a[_].remove(), (a[_] = null), delete a[_];
    }
    for (let f = 0; f < p.length; f++) {
      let [_, x] = p[f],
        b = a[_],
        w = a[x],
        B = document.createElement('div');
      y(() => {
        w || O('x-for ":key" is undefined or invalid', o),
          w.after(B),
          b.after(w),
          w._x_currentIfEl && w.after(w._x_currentIfEl),
          B.before(b),
          b._x_currentIfEl && b.after(b._x_currentIfEl),
          B.remove();
      }),
        w._x_refreshXForScope(c[l.indexOf(x)]);
    }
    for (let f = 0; f < d.length; f++) {
      let [_, x] = d[f],
        b = _ === 'template' ? o : a[_];
      b._x_currentIfEl && (b = b._x_currentIfEl);
      let w = c[x],
        B = l[x],
        W = document.importNode(o.content, !0).firstElementChild,
        dt = z(w);
      ee(W, dt, o),
        (W._x_refreshXForScope = Kn => {
          Object.entries(Kn).forEach(([Bn, Dn]) => {
            dt[Bn] = Dn;
          });
        }),
        y(() => {
          b.after(W), C(W);
        }),
        typeof B == 'object' &&
          O('x-for key cannot be an object, it must be a string or an integer', o),
        (a[B] = W);
    }
    for (let f = 0; f < M.length; f++) a[M[f]]._x_refreshXForScope(c[l.indexOf(M[f])]);
    o._x_prevKeys = l;
  });
}
function qi(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
    n = /^\s*\(|\)\s*$/g,
    r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
    i = e.match(r);
  if (!i) return;
  let o = {};
  o.items = i[2].trim();
  let s = i[1].replace(n, '').trim(),
    a = s.match(t);
  return (
    a
      ? ((o.item = s.replace(t, '').trim()),
        (o.index = a[1].trim()),
        a[2] && (o.collection = a[2].trim()))
      : (o.item = s),
    o
  );
}
function Ot(e, t, n, r) {
  let i = {};
  return (
    /^\[.*\]$/.test(e.item) && Array.isArray(t)
      ? e.item
          .replace('[', '')
          .replace(']', '')
          .split(',')
          .map(s => s.trim())
          .forEach((s, a) => {
            i[s] = t[a];
          })
      : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == 'object'
        ? e.item
            .replace('{', '')
            .replace('}', '')
            .split(',')
            .map(s => s.trim())
            .forEach(s => {
              i[s] = t[s];
            })
        : (i[e.item] = t),
    e.index && (i[e.index] = n),
    e.collection && (i[e.collection] = r),
    i
  );
}
function Wi(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Fn() {}
Fn.inline = (e, { expression: t }, { cleanup: n }) => {
  let r = he(e);
  r._x_refs || (r._x_refs = {}), (r._x_refs[t] = e), n(() => delete r._x_refs[t]);
};
g('ref', Fn);
g('if', (e, { expression: t }, { effect: n, cleanup: r }) => {
  e.tagName.toLowerCase() !== 'template' && O('x-if can only be used on a <template> tag', e);
  let i = m(e, t),
    o = () => {
      if (e._x_currentIfEl) return e._x_currentIfEl;
      let a = e.content.cloneNode(!0).firstElementChild;
      return (
        ee(a, {}, e),
        y(() => {
          e.after(a), C(a);
        }),
        (e._x_currentIfEl = a),
        (e._x_undoIf = () => {
          I(a, u => {
            u._x_effects && u._x_effects.forEach(Ct);
          }),
            a.remove(),
            delete e._x_currentIfEl;
        }),
        a
      );
    },
    s = () => {
      e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
    };
  n(() =>
    i(a => {
      a ? o() : s();
    }),
  ),
    r(() => e._x_undoIf && e._x_undoIf());
});
g('id', (e, { expression: t }, { evaluate: n }) => {
  n(t).forEach(i => Pi(e, i));
});
tt(Qt('@', Zt(q('on:'))));
g(
  'on',
  ne((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
    let o = r ? m(e, r) : () => {};
    e.tagName.toLowerCase() === 'template' &&
      (e._x_forwardEvents || (e._x_forwardEvents = []),
      e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
    let s = qe(e, t, n, a => {
      o(() => {}, { scope: { $event: a }, params: [a] });
    });
    i(() => s());
  }),
);
me('Collapse', 'collapse', 'collapse');
me('Intersect', 'intersect', 'intersect');
me('Focus', 'trap', 'focus');
me('Mask', 'mask', 'mask');
function me(e, t, n) {
  g(t, r =>
    O(
      `You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
      r,
    ),
  );
}
re.setEvaluator(Vt);
re.setReactivityEngine({ reactive: ft, effect: ti, release: ni, raw: h });
var Ui = re,
  Ji = Ui;
export { Ji as m };
