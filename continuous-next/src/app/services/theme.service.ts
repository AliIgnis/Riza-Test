import { Injectable, signal } from '@angular/core';
import {
  THEME_DARK,
  THEME_LIGHT,
  THEME_STORAGE_KEY
} from '../constants/app.constants';

type Theme = typeof THEME_LIGHT | typeof THEME_DARK;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly currentTheme = signal<Theme>(THEME_LIGHT);
  readonly theme = this.currentTheme.asReadonly();

  initialize(): void {
    const stored = this.readStored();
    const preferred = stored ?? this.systemPreference();
    this.applyTheme(preferred);
  }

  toggle(): void {
    const next: Theme = this.currentTheme() === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    this.applyTheme(next);
    this.persist(next);
  }

  isDark(): boolean {
    return this.currentTheme() === THEME_DARK;
  }

  private applyTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  private readStored(): Theme | null {
    if (typeof window === 'undefined') return null;
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === THEME_DARK || value === THEME_LIGHT ? value : null;
  }

  private persist(theme: Theme): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  private systemPreference(): Theme {
    if (typeof window === 'undefined' || !window.matchMedia) return THEME_LIGHT;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
  }
}
