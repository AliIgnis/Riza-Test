import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { YEARS_OF_EXPERIENCE } from '../../constants/app.constants';

@Component({
  selector: 'cn-clients',
  standalone: true,
  imports: [CommonModule, TranslateModule, FadeInDirective],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent {
  readonly years = YEARS_OF_EXPERIENCE;
  readonly clients: string[] = [
    'E.ON',
    'ARD',
    'Lanxess',
    'Volkswagen',
    'Mercedes-Benz',
    'Vodafone',
    'Deutsche Telekom',
    'Henkel',
    'Accenture'
  ];
}
