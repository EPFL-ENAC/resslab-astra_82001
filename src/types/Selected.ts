export type TrafficClass = 'ClassOW' | 'Class';
export type TrafficClassOption = { value: TrafficClass, label: string };

export type Option = { value: string, label: string };
export type OptionNumber = { value: number, label: string };
export type Options = Option[];


export interface Selected {
  Type?: Option;
  SubType?: Option;
  Width?: Option;
  Layout?: Option;
  Support?: Option;
  Trans?: Option;
  AE?: Option;
  Traffic?: Option;
  TrafficClass?: TrafficClassOption;
  Span?: OptionNumber;
}

export type SelectedKeys = keyof Selected;
export type SelectedValues = Selected[SelectedKeys];
