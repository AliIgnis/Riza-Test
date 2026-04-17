import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollService } from '../../services/scroll.service';
import {
  COMPANY_NAME,
  OWNER_NAME,
  YEARS_OF_EXPERIENCE
} from '../../constants/app.constants';

@Component({
  selector: 'cn-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  private readonly scrollService = inject(ScrollService);

  readonly ownerName = OWNER_NAME;
  readonly companyName = COMPANY_NAME;
  readonly years = YEARS_OF_EXPERIENCE;

  readonly monogram = OWNER_NAME.split(' ').map(part => part.charAt(0)).join('');

  goTo(section: string): void {
    this.scrollService.scrollTo(section);
  }
}
