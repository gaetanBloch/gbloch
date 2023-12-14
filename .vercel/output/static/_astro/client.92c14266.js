import { e as T, h as N, f as F } from './web.0758af0d.js';
var L =
  t =>
  (i, d, s, { client: a }) => {
    if (
      (window._$HY || (window._$HY = { events: [], completed: new WeakSet(), r: {} }),
      !t.hasAttribute('ssr'))
    )
      return;
    const l = a === 'only' ? T : N;
    let n,
      r = {};
    if (Object.keys(s).length > 0) {
      if (a !== 'only') {
        const e = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, o =>
          o === t
            ? NodeFilter.FILTER_SKIP
            : o.nodeName === 'ASTRO-SLOT'
              ? NodeFilter.FILTER_ACCEPT
              : o.nodeName === 'ASTRO-ISLAND'
                ? NodeFilter.FILTER_REJECT
                : NodeFilter.FILTER_SKIP,
        );
        for (; (n = e.nextNode()); ) r[n.getAttribute('name') || 'default'] = n;
      }
      for (const [e, o] of Object.entries(s))
        r[e] ||
          ((r[e] = document.createElement('astro-slot')),
          e !== 'default' && r[e].setAttribute('name', e),
          (r[e].innerHTML = o));
    }
    const { default: u, ...f } = r,
      c = t.dataset.solidRenderId,
      E = l(() => F(i, { ...d, ...f, children: u }), t, { renderId: c });
    t.addEventListener('astro:unmount', () => E(), { once: !0 });
  };
export { L as default };
