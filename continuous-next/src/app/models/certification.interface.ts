export interface Certification {
  name: string;
  expired: boolean;
  note?: string;
}

export interface TechToolGroup {
  labelKey: string;
  tools: string[];
}
