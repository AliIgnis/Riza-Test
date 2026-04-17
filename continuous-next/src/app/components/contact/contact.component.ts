import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FadeInDirective } from '../../directives/fade-in.directive';
import {
  EMAIL_SUBJECT_DE,
  EMAIL_SUBJECT_EN,
  OWNER_EMAIL,
  OWNER_LOCATION_CITY,
  OWNER_PHONE,
  OWNER_WEBSITE
} from '../../constants/app.constants';

@Component({
  selector: 'cn-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, FadeInDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {
  private readonly translate = inject(TranslateService);

  readonly email = OWNER_EMAIL;
  readonly phone = OWNER_PHONE;
  readonly website = OWNER_WEBSITE;
  readonly location = OWNER_LOCATION_CITY;

  private readonly currentLang = signal(this.translate.currentLang || this.translate.defaultLang);

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(e => this.currentLang.set(e.lang));
  }

  mailtoHref(): string {
    const subject = this.currentLang() === 'de' ? EMAIL_SUBJECT_DE : EMAIL_SUBJECT_EN;
    return `mailto:${this.email}?subject=${encodeURIComponent(subject)}`;
  }

  phoneHref(): string {
    return `tel:${this.phone.replace(/\s/g, '')}`;
  }

  websiteHref(): string {
    return `https://${this.website}`;
  }
}
