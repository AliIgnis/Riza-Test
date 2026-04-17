import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { ExpertiseArea } from '../../models/expertise-area.interface';
import {
  BROADCASTERS_GO_LIVE,
  SCRUM_TEAM_MEMBERS_LED,
  SUBJECT_MATTER_EXPERTS_MANAGED
} from '../../constants/app.constants';

@Component({
  selector: 'cn-expertise',
  standalone: true,
  imports: [CommonModule, TranslateModule, FadeInDirective],
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpertiseComponent {
  readonly members = SCRUM_TEAM_MEMBERS_LED;
  readonly experts = SUBJECT_MATTER_EXPERTS_MANAGED;
  readonly broadcasters = BROADCASTERS_GO_LIVE;

  readonly areas: ExpertiseArea[] = [
    { id: 'scaled',       iconPath: 'scaling',        titleKey: 'EXPERTISE.AREA_1_TITLE', textKey: 'EXPERTISE.AREA_1_TEXT' },
    { id: 'transform',    iconPath: 'transform',      titleKey: 'EXPERTISE.AREA_2_TITLE', textKey: 'EXPERTISE.AREA_2_TEXT' },
    { id: 'sap',          iconPath: 'database',       titleKey: 'EXPERTISE.AREA_3_TITLE', textKey: 'EXPERTISE.AREA_3_TEXT' },
    { id: 'rollout',      iconPath: 'globe',          titleKey: 'EXPERTISE.AREA_4_TITLE', textKey: 'EXPERTISE.AREA_4_TEXT' },
    { id: 'strategic',    iconPath: 'compass',        titleKey: 'EXPERTISE.AREA_5_TITLE', textKey: 'EXPERTISE.AREA_5_TEXT' },
    { id: 'leadership',   iconPath: 'people',         titleKey: 'EXPERTISE.AREA_6_TITLE', textKey: 'EXPERTISE.AREA_6_TEXT' }
  ];

  getInterpolation(id: string): Record<string, number> {
    if (id === 'scaled') return { members: this.members, experts: this.experts };
    if (id === 'rollout') return { broadcasters: this.broadcasters };
    return {};
  }
}
