import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExpertiseComponent } from './components/expertise/expertise.component';
import { KeyFiguresComponent } from './components/key-figures/key-figures.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ClientsComponent } from './components/clients/clients.component';
import { SkillsTechComponent } from './components/skills-tech/skills-tech.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

import { ThemeService } from './services/theme.service';
import { ScrollService } from './services/scroll.service';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES
} from './constants/app.constants';

@Component({
  selector: 'cn-root',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ExpertiseComponent,
    KeyFiguresComponent,
    ExperienceComponent,
    ClientsComponent,
    SkillsTechComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly translate = inject(TranslateService);
  private readonly theme = inject(ThemeService);
  private readonly scroll = inject(ScrollService);
  private cleanupObserver?: () => void;

  ngOnInit(): void {
    this.theme.initialize();

    this.translate.addLangs([...SUPPORTED_LANGUAGES]);
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    const initialLang = this.resolveInitialLang();
    this.translate.use(initialLang);
  }

  ngAfterViewInit(): void {
    this.cleanupObserver = this.scroll.observeSections([
      'about', 'expertise', 'experience', 'clients', 'skills', 'contact'
    ]);
  }

  ngOnDestroy(): void {
    this.cleanupObserver?.();
  }

  private resolveInitialLang(): string {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)) {
      return stored;
    }
    const browser = (navigator.language || DEFAULT_LANGUAGE).slice(0, 2);
    return (SUPPORTED_LANGUAGES as readonly string[]).includes(browser) ? browser : DEFAULT_LANGUAGE;
  }
}
