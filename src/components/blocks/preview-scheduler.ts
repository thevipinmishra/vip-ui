const maxLoading = 2;
const maxLive = 24;
const loadTimeout = 8000;

const waiting = new Map<Element, () => void>();
const loading = new Map<Element, number>();
const live = new Map<Element, () => void>();
let pumping = false;

function whenIdle(callback: () => void) {
  if (typeof window.requestIdleCallback === "function")
    window.requestIdleCallback(callback, { timeout: 300 });
  else window.setTimeout(callback, 16);
}

function distance(element: Element) {
  const rect = element.getBoundingClientRect();
  if (rect.bottom < 0) return -rect.bottom;
  if (rect.top > window.innerHeight) return rect.top - window.innerHeight;
  return 0;
}

function pump() {
  pumping = false;
  while (loading.size < maxLoading && waiting.size > 0) {
    let next: Element | undefined;
    let nearest = Number.POSITIVE_INFINITY;
    for (const element of waiting.keys()) {
      const value = distance(element);
      if (value < nearest) {
        nearest = value;
        next = element;
      }
    }
    if (!next) return;
    const start = waiting.get(next);
    waiting.delete(next);
    const element = next;
    loading.set(
      element,
      window.setTimeout(() => settle(element), loadTimeout),
    );
    start?.();
  }
}

function schedule() {
  if (pumping) return;
  pumping = true;
  whenIdle(pump);
}

function settle(element: Element) {
  const timer = loading.get(element);
  if (timer === undefined) return;
  window.clearTimeout(timer);
  loading.delete(element);
  schedule();
}

export function requestPreview(element: Element, start: () => void) {
  waiting.set(element, start);
  schedule();
  return () => {
    waiting.delete(element);
  };
}

export function retainPreview(element: Element, evict: () => void) {
  settle(element);
  live.delete(element);
  live.set(element, evict);
  if (live.size <= maxLive) return;
  let farthest: Element | undefined;
  let farthestDistance = 0;
  for (const candidate of live.keys()) {
    if (candidate === element) continue;
    const value = distance(candidate);
    if (value > farthestDistance) {
      farthestDistance = value;
      farthest = candidate;
    }
  }
  if (!farthest) return;
  const release = live.get(farthest);
  live.delete(farthest);
  release?.();
}

export function releasePreview(element: Element) {
  waiting.delete(element);
  live.delete(element);
  settle(element);
}
