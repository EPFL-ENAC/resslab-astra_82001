export type TrafficClass = 'ClassOW' | 'Class';
export type TrafficClassOption = { value: TrafficClass, label: string };

export type Option = { value: string, label: string };
export type Options = Option[];


export interface Selected {
  Type?: string;
  SubType?: string;
  Width?: Option;
  Layout?: string;
  Support?: string;
  Trans?: string;
  AE?: string;
  Traffic?: string;
  TrafficClass?: TrafficClassOption;
  Span?: number;
}

export type SelectedKeys = keyof Selected;
export type SelectedValues = Selected[SelectedKeys];
