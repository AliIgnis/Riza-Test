import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { KeyFigure } from '../../models/key-figure.interface';
import {
  BROADCASTERS_GO_LIVE,
  PRODUCTS_HANDED_OVER,
  PRODUCT_TEAMS_ONBOARDED,
  SCRUM_TEAM_MEMBERS_LED,
  STAT_COUNTER_DURATION_MS,
  SUBJECT_MATTER_EXPERTS_MANAGED,
  YEARS_OF_EXPERIENCE
} from '../../constants/app.constants';

@Component({
  selector: 'cn-key-figures',
  standalone: true,
  imports: [CommonModule, TranslateModule, FadeInDirective],
  templateUrl: './key-figures.component.html',
  styleUrls: ['./key-figures.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyFiguresComponent implements AfterViewInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChildren('figureValue') figureRefs?: QueryList<ElementRef<HTMLSpanElement>>;

  readonly figures: KeyFigure[] = [
    { id: 'years',        value: YEARS_OF_EXPERIENCE,          suffix: '+', labelKey: 'KEY_FIGURES.YEARS_LABEL' },
    { id: 'teams',        value: PRODUCT_TEAMS_ONBOARDED,      suffix: '+', labelKey: 'KEY_FIGURES.TEAMS_LABEL' },
    { id: 'members',      value: SCRUM_TEAM_MEMBERS_LED,       suffix: '',  labelKey: 'KEY_FIGURES.MEMBERS_LABEL' },
    { id: 'experts',      value: SUBJECT_MATTER_EXPERTS_MANAGED, suffix: '+', labelKey: 'KEY_FIGURES.EXPERTS_LABEL' },
    { id: 'broadcasters', value: BROADCASTERS_GO_LIVE,         suffix: '',  labelKey: 'KEY_FIGURES.BROADCASTERS_LABEL' },
    { id: 'products',     value: PRODUCTS_HANDED_OVER,         suffix: '+', labelKey: 'KEY_FIGURES.PRODUCTS_LABEL' }
  ];

  readonly displayValues: number[] = this.figures.map(() => 0);
  private animated = false;
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      this.figures.forEach((f, i) => (this.displayValues[i] = f.value));
      this.cdr.markForCheck();
      return;
    }

    if (!('IntersectionObserver' in window) || !this.figureRefs) {
      this.figures.forEach((f, i) => (this.displayValues[i] = f.value));
      this.cdr.markForCheck();
      return;
    }

    const first = this.figureRefs.first;
    if (!first) return;

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.animated) {
            this.animated = true;
            this.observer?.disconnect();
            this.runCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    this.observer.observe(first.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private runCounters(): void {
    const startTime = performance.now();
    const duration = STAT_COUNTER_DURATION_MS;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      this.figures.forEach((f, i) => {
        this.displayValues[i] = Math.round(f.value * eased);
      });
      this.cdr.markForCheck();

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }
}
