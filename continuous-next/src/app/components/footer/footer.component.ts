import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollService } from '../../services/scroll.service';
import { NavLink } from '../../models/nav-link.interface';
import {
  COMPANY_NAME,
  OWNER_EMAIL,
  OWNER_LOCATION_CITY,
  OWNER_NAME,
  OWNER_PHONE
} from '../../constants/app.constants';

@Component({
  selector: 'cn-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  private readonly scrollService = inject(ScrollService);

  readonly ownerName = OWNER_NAME;
  readonly companyName = COMPANY_NAME;
  readonly email = OWNER_EMAIL;
  readonly phone = OWNER_PHONE;
  readonly location = OWNER_LOCATION_CITY;

  readonly links: NavLink[] = [
    { id: 'about',      sectionId: 'about',      labelKey: 'NAV.ABOUT' },
    { id: 'expertise',  sectionId: 'expertise',  labelKey: 'NAV.EXPERTISE' },
    { id: 'experience', sectionId: 'experience', labelKey: 'NAV.EXPERIENCE' },
    { id: 'skills',     sectionId: 'skills',     labelKey: 'NAV.SKILLS' },
    { id: 'contact',    sectionId: 'contact',    labelKey: 'NAV.CONTACT' }
  ];

  goTo(section: string): void {
    this.scrollService.scrollTo(section);
  }
}
