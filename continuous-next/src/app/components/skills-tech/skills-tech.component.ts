import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { Certification, TechToolGroup } from '../../models/certification.interface';
import { LanguageSkill } from '../../models/language-skill.interface';

@Component({
  selector: 'cn-skills-tech',
  standalone: true,
  imports: [CommonModule, TranslateModule, FadeInDirective],
  templateUrl: './skills-tech.component.html',
  styleUrls: ['./skills-tech.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsTechComponent {
  readonly methods: string[] = [
    'SAFe', 'Scrum', 'Kanban', 'Lean', 'DevOps',
    'Scrum@Scale', 'LeSS', 'Design Thinking', 'Management 3.0',
    'OKR', 'Spotify Model', 'Prince2 Agile', 'Hybrid',
    'Agile Assessment', 'Product Management'
  ];

  readonly tools: TechToolGroup[] = [
    { labelKey: 'SKILLS.TECH_PM_LABEL',        tools: ['Jira', 'Confluence', 'MS365'] },
    { labelKey: 'SKILLS.TECH_COLLAB_LABEL',    tools: ['Miro', 'Whiteboard', 'Conceptboard'] },
    { labelKey: 'SKILLS.TECH_ANALYTICS_LABEL', tools: ['QlikView', 'Tableau', 'Power BI'] },
    { labelKey: 'SKILLS.TECH_CLOUD_LABEL',     tools: ['Azure', 'AWS'] },
    { labelKey: 'SKILLS.TECH_ERP_LABEL',       tools: ['Salesforce (CRM)', 'SAP S/4HANA (ERP)', 'SAP Solution Manager (ALM)'] }
  ];

  readonly certifications: Certification[] = [
    { name: 'Scrum Master (PSM)',                                     expired: false },
    { name: 'Kanban System Design',                                   expired: false },
    { name: 'Lean Six Sigma Yellow Belt',                             expired: false },
    { name: 'Agile Requirements Specialist',                          expired: false },
    { name: 'SAP 2004s Business Intelligence',                        expired: false },
    { name: 'SAFe Program Consultant (SPC) 4.5',                      expired: true  },
    { name: 'SAFe PM/Product Owner (POPM) 4.5',                       expired: true  },
    { name: 'SAFe Advanced Scrum Master (SASM) 4.5',                  expired: true  },
    { name: 'Agile Delivery for ERP Systems',                         expired: false, note: 'EDUCATION_SELF_DEVELOPED' },
    { name: 'OKR',                                                    expired: false, note: 'EDUCATION_HANDS_ON' },
    { name: 'Prince2 Agile',                                          expired: false, note: 'EDUCATION_HANDS_ON' },
    { name: 'Spotify Model',                                          expired: false, note: 'EDUCATION_HANDS_ON' }
  ];

  readonly languages: LanguageSkill[] = [
    { nameKey: 'SKILLS.LANG_GERMAN',     levelKey: 'SKILLS.LANG_GERMAN_LEVEL',     proficiency: 5,   maxProficiency: 5 },
    { nameKey: 'SKILLS.LANG_ENGLISH',    levelKey: 'SKILLS.LANG_ENGLISH_LEVEL',    proficiency: 4.5, maxProficiency: 5 },
    { nameKey: 'SKILLS.LANG_TURKISH',    levelKey: 'SKILLS.LANG_TURKISH_LEVEL',    proficiency: 4,   maxProficiency: 5 },
    { nameKey: 'SKILLS.LANG_PORTUGUESE', levelKey: 'SKILLS.LANG_PORTUGUESE_LEVEL', proficiency: 1.5, maxProficiency: 5 }
  ];

  dotsForLanguage(lang: LanguageSkill): ('full' | 'half' | 'empty')[] {
    const result: ('full' | 'half' | 'empty')[] = [];
    for (let i = 1; i <= lang.maxProficiency; i++) {
      if (lang.proficiency >= i) result.push('full');
      else if (lang.proficiency >= i - 0.5) result.push('half');
      else result.push('empty');
    }
    return result;
  }
}
