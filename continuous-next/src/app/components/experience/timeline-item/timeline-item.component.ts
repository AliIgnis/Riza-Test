import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface TimelineProject {
  id: string;
  translationKey: string;
  bulletKeys: string[];
  startDate: string;
  endDate: string;
  ongoing: boolean;
}

@Component({
  selector: 'cn-timeline-item',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineItemComponent {
  private readonly translate = inject(TranslateService);

  @Input({ required: true }) project!: TimelineProject;
  @Input() expanded = false;
  @Output() readonly toggle = new EventEmitter<string>();

  onToggle(event: Event): void {
    event.preventDefault();
    this.toggle.emit(this.project.id);
  }

  onKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle.emit(this.project.id);
    }
  }

  dateLabel(): string {
    const end = this.project.ongoing
      ? this.translate.instant('EXPERIENCE.PRESENT')
      : this.formatDate(this.project.endDate);
    return `${this.formatDate(this.project.startDate)} – ${end}`;
  }

  formatDate(iso: string): string {
    if (!iso || iso === 'present') return iso;
    const [year, month] = iso.split('-');
    return `${month}/${year}`;
  }

  duration(): string {
    const start = new Date(this.project.startDate + '-01');
    const end = this.project.ongoing || this.project.endDate === 'present'
      ? new Date()
      : new Date(this.project.endDate + '-01');

    const totalMonths =
      (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const safeMonths = Math.max(1, totalMonths);
    const years = Math.floor(safeMonths / 12);
    const months = safeMonths % 12;

    if (years > 0 && months > 0) {
      return this.translate.instant('EXPERIENCE.DURATION_YEARS_MONTHS', { years, months });
    }
    if (years > 0) {
      return this.translate.instant('EXPERIENCE.DURATION_YEARS', { years });
    }
    return this.translate.instant('EXPERIENCE.DURATION_MONTHS', { months: safeMonths });
  }
}
