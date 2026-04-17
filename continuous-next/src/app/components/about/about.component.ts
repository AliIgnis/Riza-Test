import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FadeInDirective } from '../../directives/fade-in.directive';
import {
  ACCENTURE_YEARS,
  COMPANY_NAME,
  PUBLIC_SECTOR_YEARS
} from '../../constants/app.constants';

@Component({
  selector: 'cn-about',
  standalone: true,
  imports: [CommonModule, TranslateModule, FadeInDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  readonly companyName = COMPANY_NAME;
  readonly accentureYears = ACCENTURE_YEARS;
  readonly publicYears = PUBLIC_SECTOR_YEARS;

  readonly roleKeys = [
    'ABOUT.ROLE_1', 'ABOUT.ROLE_2', 'ABOUT.ROLE_3',
    'ABOUT.ROLE_4', 'ABOUT.ROLE_5', 'ABOUT.ROLE_6',
    'ABOUT.ROLE_7', 'ABOUT.ROLE_8', 'ABOUT.ROLE_9'
  ];
}
