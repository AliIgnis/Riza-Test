import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { EXPERIENCE_PROJECTS } from '../../constants/app.constants';
import {
  TimelineItemComponent,
  TimelineProject
} from './timeline-item/timeline-item.component';

const PROJECT_TRANSLATION_MAP: Record<string, { key: string; bullets: string[] }> = {
  'eon-atlantis':        { key: 'EXPERIENCE.EON_ATLANTIS',        bullets: ['BULLET_1', 'BULLET_2', 'BULLET_3', 'BULLET_4', 'BULLET_5', 'BULLET_6'] },
  'ard-deinsap':         { key: 'EXPERIENCE.ARD_DEINSAP',         bullets: ['BULLET_1', 'BULLET_2', 'BULLET_3', 'BULLET_4', 'BULLET_5', 'BULLET_6', 'BULLET_7'] },
  'rethink-innovations': { key: 'EXPERIENCE.RETHINK_INNOVATIONS', bullets: ['BULLET_1', 'BULLET_2', 'BULLET_3', 'BULLET_4', 'BULLET_5', 'BULLET_6'] },
  'lanxess-fit':         { key: 'EXPERIENCE.LANXESS_FIT',         bullets: ['BULLET_1', 'BULLET_2', 'BULLET_3', 'BULLET_4', 'BULLET_5', 'BULLET_6'] },
  'eon-esp':             { key: 'EXPERIENCE.EON_ESP',             bullets: ['BULLET_1', 'BULLET_2', 'BULLET_3', 'BULLET_4', 'BULLET_5'] },
  'volkswagen-iportal':  { key: 'EXPERIENCE.VOLKSWAGEN_IPORTAL',  bullets: ['BULLET_1', 'BULLET_2', 'BULLET_3', 'BULLET_4'] },
  'daimler-connectme':   { key: 'EXPERIENCE.DAIMLER_CONNECTME',   bullets: ['BULLET_1', 'BULLET_2', 'BULLET_3', 'BULLET_4'] },
  'vodafone-uk':         { key: 'EXPERIENCE.VODAFONE_UK',         bullets: ['BULLET_1', 'BULLET_2'] },
  'vodafone-de':         { key: 'EXPERIENCE.VODAFONE_DE',         bullets: ['BULLET_1', 'BULLET_2', 'BULLET_3'] },
  'telekom':             { key: 'EXPERIENCE.TELEKOM',             bullets: ['BULLET_1', 'BULLET_2', 'BULLET_3'] },
  'henkel':              { key: 'EXPERIENCE.HENKEL',              bullets: ['BULLET_1', 'BULLET_2', 'BULLET_3'] }
};

@Component({
  selector: 'cn-experience',
  standalone: true,
  imports: [CommonModule, TranslateModule, FadeInDirective, TimelineItemComponent],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {
  readonly projects: TimelineProject[] = EXPERIENCE_PROJECTS.map(p => {
    const meta = PROJECT_TRANSLATION_MAP[p.id];
    return {
      id: p.id,
      translationKey: meta.key,
      bulletKeys: meta.bullets,
      startDate: p.startDate,
      endDate: p.endDate,
      ongoing: p.ongoing
    };
  });

  private readonly expandedIds = signal<Set<string>>(new Set([this.projects[0]?.id ?? '']));

  isExpanded(id: string): boolean {
    return this.expandedIds().has(id);
  }

  toggle(id: string): void {
    const next = new Set(this.expandedIds());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.expandedIds.set(next);
  }

  expandAll(): void {
    this.expandedIds.set(new Set(this.projects.map(p => p.id)));
  }

  collapseAll(): void {
    this.expandedIds.set(new Set());
  }
}
