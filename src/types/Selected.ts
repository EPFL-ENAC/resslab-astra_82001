export type TrafficClass = 'ClassOW' | 'Class';
export type TrafficClassOption = { value: TrafficClass, label: string };

export type Types = 'Box' | 'Twin' | 'Multi' | 'Slab';

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

export type AE =  'V' | 'Mp' | 'Mn' | 'MxMid' | 'MxEdg' |'M';
export type Traffic = 'Uni2L' | 'Bi2L' | 'Bi4L'

export interface DataValue {
  Type: Types
  SubType: string
  Width: string
  Support: string
  Trans: string // p0, p1, p2, p3
  AE: AE
  Traffic: Traffic
  Span: number
  ClassOW: number
  Class: number
}

export type SelectedKeys = keyof Selected;
export type SelectedValues = Selected[SelectedKeys];

export type DataValueKeys = keyof DataValue;
export type DataValueValues = DataValue[DataValueKeys];
