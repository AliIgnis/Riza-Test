import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { FADE_IN_ROOT_MARGIN, FADE_IN_THRESHOLD } from '../constants/app.constants';

@Directive({
  selector: '[cnFadeIn]',
  standalone: true,
  host: { class: 'cn-fade-in' }
})
export class FadeInDirective implements OnInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.host.nativeElement.classList.add('is-visible');
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      this.host.nativeElement.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: FADE_IN_THRESHOLD, rootMargin: FADE_IN_ROOT_MARGIN }
    );

    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
