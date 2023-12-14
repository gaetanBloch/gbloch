import { m as o } from './module.esm.0b549d28.js';
window.Alpine = o;
o.start();
function d(n) {
  const e = n ? 'dark' : 'light',
    t = window.document.documentElement;
  t.classList.remove(e === 'dark' ? 'light' : 'dark'), t.classList.add(e);
}
window.changeTheme = d;
