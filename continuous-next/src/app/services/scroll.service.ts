import { Injectable, signal } from '@angular/core';
import { NAVBAR_HEIGHT_PX } from '../constants/app.constants';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly active = signal<string>('');
  readonly activeSection = this.active.asReadonly();

  scrollTo(sectionId: string): void {
    if (typeof document === 'undefined') return;
    const target = document.getElementById(sectionId);
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const top = window.scrollY + rect.top - NAVBAR_HEIGHT_PX;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
  }

  observeSections(sectionIds: string[]): () => void {
    if (typeof document === 'undefined' || !('IntersectionObserver' in window)) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          this.active.set(visible.target.id);
        }
      },
      { rootMargin: `-${NAVBAR_HEIGHT_PX}px 0px -50% 0px`, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }
}
