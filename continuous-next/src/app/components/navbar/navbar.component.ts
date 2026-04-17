import { ChangeDetectionStrategy, Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';
import { ScrollService } from '../../services/scroll.service';
import { NavLink } from '../../models/nav-link.interface';
import {
  COMPANY_NAME,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  THEME_DARK
} from '../../constants/app.constants';

@Component({
  selector: 'cn-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  readonly theme = inject(ThemeService);
  readonly scrollService = inject(ScrollService);

  readonly companyName = COMPANY_NAME;
  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);
  readonly currentLang = signal(this.translate.currentLang || this.translate.defaultLang);

  readonly navLinks: NavLink[] = [
    { id: 'about', sectionId: 'about', labelKey: 'NAV.ABOUT' },
    { id: 'expertise', sectionId: 'expertise', labelKey: 'NAV.EXPERTISE' },
    { id: 'experience', sectionId: 'experience', labelKey: 'NAV.EXPERIENCE' },
    { id: 'clients', sectionId: 'clients', labelKey: 'NAV.CLIENTS' },
    { id: 'skills', sectionId: 'skills', labelKey: 'NAV.SKILLS' },
    { id: 'contact', sectionId: 'contact', labelKey: 'NAV.CONTACT' }
  ];

  readonly supportedLanguages = [...SUPPORTED_LANGUAGES];

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(e => this.currentLang.set(e.lang));
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  goTo(sectionId: string): void {
    this.scrollService.scrollTo(sectionId);
    this.closeMenu();
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  isDark(): boolean {
    return this.theme.theme() === THEME_DARK;
  }

  setLanguage(lang: string): void {
    if (lang === this.currentLang()) return;
    this.translate.use(lang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  }

  isActive(sectionId: string): boolean {
    return this.scrollService.activeSection() === sectionId;
  }
}
