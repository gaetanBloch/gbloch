export function attachEvent(selector, event, fn) {
  const matches = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
  if (matches?.length) {
    matches.forEach(elem => {
      elem.addEventListener(event, e => fn(e, elem), false);
    });
  }
}
