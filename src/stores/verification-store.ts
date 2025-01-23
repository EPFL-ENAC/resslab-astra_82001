import { defineStore } from 'pinia';

export type SupportType = 'Simp' | 'Fixed' | 'Semi';
export type BridgeComposition = 'Concrete' | 'Composite';
export type BridgeType = 'Slab' | 'Multi' | 'Twin' | 'Box' | 'DalleRoulem';
export type SubTypeTransversal = 'PorteAFaux' | 'DalleEntrePoutres';
export type classResult = 'qG' | 'qG+' | 'Q1G' | 'Q2G' | 'Q1L' | 'Q2L';
export type VerificationType = 'Longitudinal' | 'Transversal';
export type AE = 'V' | 'Mp' | 'Mn' | 'MxMid' | 'MxEdg' | 'M';
export type LaneType = 'Uni2L' | 'Bi2L' | 'Bi4L';
// longitudinal transValue
export type LongValue = 'p0' | 'p1' | 'p2' | 'p3' | 'P1' | 'P2' | 'P3';
// transversal support value
export type TransValue = 'AR0' | 'AR2' | 'BR1' | 'PENC' | 'SENC' | 'SMPL';
export const correspondTransValue = {
  AR0: 'Fixed',
  AR2: 'Semi',
  BR1: 'Simp',
  PENC: 'Fixed',
  SENC: 'Semi',
  SMPL: 'Simp',
};
export const mapTransCantilevr: Record<SupportType, TransValue> = {
  Simp: 'BR1',
  Fixed: 'AR0',
  Semi: 'AR2',
};

export const mapTransBetweenBeams: Record<SupportType, TransValue> = {
  Simp: 'SMPL',
  Fixed: 'PENC',
  Semi: 'SENC',
};
import data from '../assets/data/data.json';
import { Traffic, TrafficClass } from 'src/types/Selected';
import { X } from 'app/dist/spa/assets/index.65332175';

// this is the interface of the data (json) we have StructuralAnalysis[]
interface StructuralAnalysis {
  AE: AE;
  Span: number;
  SubType: BridgeComposition | SubTypeTransversal;
  Support: SupportType;
  Traffic: LaneType;
  Trans: LongValue | TransValue;
  Type: BridgeType;
  VerificationType: VerificationType; // we don't use it
  Width: number;
  Q1G: number;
  Q1L: number;
  Q2G: number;
  Q2L: number;
  qG: number;
  'qG+': number; // Note the quotes due to the + character
}
interface VerificationState {
  selectedLane: LaneType;
  selectedClass: TrafficClass;
  bridgeType: BridgeType | null;
  finalEnabled: boolean;
  dynamicFactorEnabled: boolean;
  bridgeComposition: BridgeComposition;
  goodQualityRoad: boolean;
  beta: number;
  phi: number;
  rBau: boolean;
  // longitidunal
  span: number;
  width: number;
  trans: LongValue;
  // transversal
  isCantileverEnabled: boolean;
  supportType: SupportType;
  spanTransversal: number;
}

// Example usage
// const matrix = [
//   { Width: 12, Span: 70, class: 0.117858204 },
//   { Width: 12, Span: 80, class: 0.132028865 },
//   { Width: 18, Span: 70, class: 0.175164259 },
//   { Width: 18, Span: 80, class: 0.167184639 }
// ];

// const targetWidth = 15;
// const targetSpan = 75;

function getMatrixTransversal(
  bridgeType: BridgeType,
  subtype: SubTypeTransversal,
  traffic: Traffic,
  support: TransValue,
  span: number
): Record<AE, boudingPointsResult> {
  // return for each AE:
  const AE: AE[] = ['V', 'Mp', 'Mn', 'MxMid', 'MxEdg', 'M'];
  const resultMatrix: Record<string, boudingPointsResult> = {};
  // if we want to take traffic lane into account
  //  const filtered = data.filter(x => x.Type === bridgeType && x.Traffic === traffic && x.AE === ae);
  // if we don't want to take traffic lane into account

  AE.forEach((ae) => {
    let filtered: StructuralAnalysis[] = data as StructuralAnalysis[];
    /* example of line
      {
          "VerificationType": "Transversal",
          "Type": "DalleRoulem",
          "SubType": "PorteAFaux",
          "Traffic": "Bi2L",
          "Width": 4.56,
          "Support": "SimpForM",
          "Trans": "AR2",
          "AE": "M",
          "Span": 4.56,
          "Q1G": 0.55,
          "Q2G": 0.55,
          "qG+": 0.37781819,
          "qG": 0.307675407,
          "Q1L": 0.55,
          "Q2L": 0.4
        },
      */
    if (bridgeType !== 'Slab') {
      // we need to convert support
      // for slab we don't have data here ?
      filtered = filtered.filter(
        (x) =>
          x.Type === bridgeType &&
          x.SubType === subtype &&
          x.Trans === support &&
          x.Traffic === traffic &&
          x.AE === ae
      );
    } else {
      filtered = filtered.filter(
        (x) =>
          x.Type === bridgeType &&
          x.AE === ae &&
          x.Traffic === traffic &&
          x.SubType === subtype &&
          x.Trans === support
      );
    }

    resultMatrix[ae] = findBoundingPoints1D(filtered, span);
  });

  return resultMatrix;
}

interface boudingPointsResult {
  p1?: StructuralAnalysis;
  p2?: StructuralAnalysis;
  p3?: StructuralAnalysis;
  p4?: StructuralAnalysis;
  x1: number;
  x2: number;
  y1?: number;
  y2?: number;
}

function findBoundingPoints1D(
  points: StructuralAnalysis[],
  targetSpan: number
): boudingPointsResult {
  // Find the closest span values on either side of targetSpan
  const spans = [...new Set(points.map((p) => p.Span))].sort((a, b) => a - b);
  const s1 = spans.reduce(
    (prev, curr) => (curr <= targetSpan && curr > prev ? curr : prev),
    -Infinity
  );
  const s2 = spans.reduce(
    (prev, curr) => (curr >= targetSpan && curr < prev ? curr : prev),
    Infinity
  );

  // Find the two corner points
  const Q1 = points.find((p) => p.Span === s1);
  const Q2 = points.find((p) => p.Span === s2);

  return {
    p1: Q1, // bottom
    p2: Q2, // top
    x1: s1,
    x2: s2,
  };
}

function findBoundingPoints(
  points: StructuralAnalysis[],
  targetWidth: number,
  targetSpan: number
): boudingPointsResult {
  // Find the closest width values on either side of targetWidth
  const widths = [...new Set(points.map((p) => p.Width))].sort((a, b) => a - b);
  const w1 = widths.reduce(
    (prev, curr) => (curr <= targetWidth && curr > prev ? curr : prev),
    -Infinity
  );
  const w2 = widths.reduce(
    (prev, curr) => (curr >= targetWidth && curr < prev ? curr : prev),
    Infinity
  );

  // Find the closest span values on either side of targetSpan
  const spans = [...new Set(points.map((p) => p.Span))].sort((a, b) => a - b);
  const s1 = spans.reduce(
    (prev, curr) => (curr <= targetSpan && curr > prev ? curr : prev),
    -Infinity
  );
  const s2 = spans.reduce(
    (prev, curr) => (curr >= targetSpan && curr < prev ? curr : prev),
    Infinity
  );

  // Find the four corner points
  const Q11 = points.find((p) => p.Width === w1 && p.Span === s1);
  const Q12 = points.find((p) => p.Width === w1 && p.Span === s2);
  const Q21 = points.find((p) => p.Width === w2 && p.Span === s1);
  const Q22 = points.find((p) => p.Width === w2 && p.Span === s2);

  return {
    p1: Q11, // bottom-left
    p2: Q12, // top-left
    p3: Q21, // bottom-right
    p4: Q22, // top-right
    x1: w1,
    x2: w2,
    y1: s1,
    y2: s2,
  };
}

function getMatrixLongitudinal(
  width: number,
  span: number,
  traffic: Traffic,
  bridgeType: BridgeType,
  bridgeComposition: BridgeComposition,
  trans: LongValue = 'p0',
  support?: SupportType
): Record<AE, boudingPointsResult> | Record<AE, boudingPointsResult>[] {
  // return for each AE:
  const AE: AE[] = ['V', 'Mp', 'Mn', 'MxMid', 'MxEdg', 'M'];
  const resultMatrix: Record<AE, boudingPointsResult> = {
    V: {} as boudingPointsResult,
    Mp: {} as boudingPointsResult,
    Mn: {} as boudingPointsResult,
    MxMid: {} as boudingPointsResult,
    MxEdg: {} as boudingPointsResult,
    M: {} as boudingPointsResult,
  };
  const resultMatrixSemi: Record<AE, boudingPointsResult>[] = [];
  if (bridgeType === 'Slab' && support === 'Simp') {
    const resFixed: Record<AE, boudingPointsResult> = {
      V: {} as boudingPointsResult,
      Mp: {} as boudingPointsResult,
      Mn: {} as boudingPointsResult,
      MxMid: {} as boudingPointsResult,
      MxEdg: {} as boudingPointsResult,
      M: {} as boudingPointsResult,
    };
    const resSemi: Record<AE, boudingPointsResult> = {
      V: {} as boudingPointsResult,
      Mp: {} as boudingPointsResult,
      Mn: {} as boudingPointsResult,
      MxMid: {} as boudingPointsResult,
      MxEdg: {} as boudingPointsResult,
      M: {} as boudingPointsResult,
    };
    resultMatrixSemi[0] = resFixed;
    resultMatrixSemi[1] = resSemi;
  }
  // if we want to take traffic lane into account
  //  const filtered = data.filter(x => x.Type === bridgeType && x.Traffic === traffic && x.AE === ae);
  // if we don't want to take traffic lane into account

  AE.forEach((ae: AE) => {
    let filtered: StructuralAnalysis[] = data as StructuralAnalysis[];
    if (bridgeType !== 'Slab') {
      filtered = filtered.filter(
        (x) =>
          x.Type === bridgeType &&
          x.AE === ae &&
          x.SubType === bridgeComposition &&
          x.Trans === trans &&
          x.Traffic === traffic
      );
      resultMatrix[ae] = findBoundingPoints(filtered, width, span);
    } else {
      // WE ONLY have FIXED and SEMI for slab, not Simp, Simp is alias for highest value

      /* aliases, not real values
        Semi = <= 50% Mfully fixed --> we use Semi
        Simp = 50% Mfully fixed <= Msupport <= Mfully fixed --> we use highest alpha between the SEMI and FIXED
        Fixed = Msupport = Mfully fixed --> we used fixed Fixed
      */
      if (support != 'Simp') {
        filtered = filtered.filter(
          (x) =>
            x.Type === bridgeType &&
            x.AE === ae &&
            x.Trans === trans &&
            x.Traffic === traffic &&
            x.Support === support
        );
        resultMatrix[ae] = findBoundingPoints(filtered, width, span);
      } else {
        const filteredSemi = filtered.filter((x) => x.Support === 'Semi');
        const filteredFixed = filtered.filter((X) => X.Support === 'Fixed');
        const semi = findBoundingPoints(filteredSemi, width, span);
        const fixed = findBoundingPoints(filteredFixed, width, span);
        resultMatrixSemi[0][ae] = fixed;
        resultMatrixSemi[1][ae] = semi;
      }
    }
  });

  if (bridgeType === 'Slab' && support === 'Simp') {
    return resultMatrixSemi;
  }
  return resultMatrix;
}

function linearInterpolation(
  state: VerificationState,
  { p1, p2, x1, x2 }: boudingPointsResult,
  targetSpan: number
) {
  const classesToInterpolate: classResult[] = [
    'qG',
    'qG+',
    'Q1G',
    'Q2G',
    'Q1L',
    'Q2L',
  ];

  function interpolate(
    className: classResult,
    { p1, p2, x1, x2 }: boudingPointsResult,
    targetWidth: number
  ): number {
    const Q1 = p1?.[className] ?? NaN; // bottom-left
    const Q2 = p2?.[className] ?? NaN; // top-left

    if (x1 === x2) {
      // If both coordinates are equal, just return any of the values
      // as they should all be the same
      return Q1;
    }

    return Q1 + ((targetWidth - x1) / (x2 - x1)) * (Q2 - Q1);
  }

  return classesToInterpolate.reduce((acc, className) => {
    acc[className] = getFinalAlphaQ(state, interpolate(className, { p1, p2, x1, x2 }, targetSpan));
    return acc;
  }, {} as StructuralAnalysis);
}

function bilinearInterpolation(
  state: VerificationState,
  { p1, p2, p3, p4, x1, x2, y1, y2 }: boudingPointsResult,
  targetWidth: number,
  targetSpan: number
): StructuralAnalysis {
  // cf https://archive.org/details/numericalrecipes0865unse/page/122/mode/2up for more details
  // Find the four surrounding points
  // x is WIDTH, y is SPAN
  const classesToInterpolate: classResult[] = [
    'qG',
    'qG+',
    'Q1G',
    'Q2G',
    'Q1L',
    'Q2L',
  ];
  function interpolate(
    className: classResult,
    { p1, p2, p3, p4, x1, x2, y1, y2 }: boudingPointsResult,
    targetWidth: number,
    targetSpan: number
  ): number {
    const Q11 = p1?.[className] ?? NaN; // bottom-left
    const Q12 = p2?.[className] ?? NaN; // top-left
    const Q21 = p3?.[className] ?? NaN; // bottom-right
    const Q22 = p4?.[className] ?? NaN; // top-right
    // Handle edge cases where coordinates are equal
    if (x1 === x2 && y1 === y2) {
      // If both coordinates are equal, just return any of the values
      // as they should all be the same
      return Q11;
    }

    if (x1 === x2) {
      // Linear interpolation along y-axis only
      return (
        ((y2 - targetSpan) / (y2 - y1)) * Q11 +
        ((targetSpan - y1) / (y2 - y1)) * Q12
      );
    }

    if (y1 === y2) {
      // Linear interpolation along x-axis only
      return (
        ((x2 - targetWidth) / (x2 - x1)) * Q11 +
        ((targetWidth - x1) / (x2 - x1)) * Q21
      );
    }

    // Standard bilinear interpolation when no coordinates are equal
    const R1 =
      ((x2 - targetWidth) / (x2 - x1)) * Q11 +
      ((targetWidth - x1) / (x2 - x1)) * Q21;

    const R2 =
      ((x2 - targetWidth) / (x2 - x1)) * Q12 +
      ((targetWidth - x1) / (x2 - x1)) * Q22;

    const P =
      ((y2 - targetSpan) / (y2 - y1)) * R1 +
      ((targetSpan - y1) / (y2 - y1)) * R2;

    return P;
  }

  const result = classesToInterpolate.reduce((acc, className) => {
    acc[className] = getFinalAlphaQ(state, interpolate(
      className,
      { p1, p2, p3, p4, x1, x2, y1, y2 },
      targetWidth,
      targetSpan
    ));
    return acc;
  }, {} as StructuralAnalysis);

  result['Width'] = targetWidth;
  result['Span'] = targetSpan;
  return result;
}

const getObjectiveTransversalSpan = (state: any) => {
  //   dalle_de_roulement:
  //     PorteAFaux:
  //       'l< 1.22': not possible
  //       interpolate_in_between_values: ''
  //       'l> 6.78': not possible
  //     dalle_entre_poutre:
  //       'l< 3': not possible
  //       interpolate_in_between_values: ''
  //       'l> 12': not possible
  if (state.isCantileverEnabled) {
    if (state.spanTransversal < 1.22) {
      return NaN;
    }
    if (state.spanTransversal > 6.78) {
      return NaN;
    }
    return state.spanTransversal;
  } else {
    if (state.spanTransversal < 3) {
      return NaN;
    }
    if (state.spanTransversal > 12) {
      return NaN;
    }
    return state.spanTransversal;
  }
};
const getObjectiveLongitudinalWidth = (state: VerificationState) => {
  //   box:
  //     'l < 9': not possible
  //     '9 <=l<= 12': use value for 12
  //     '12 < l <= 18': use value for 18
  //     'l > 18': Not possible
  //   twin:
  //     '9 <= l <= 12': use value for 9
  //   multi:
  //     'l< 10.8': not possible
  //     'l>= 10.8': same as 10.8 (because of different beam analysis explicitly indicated)
  //   slab:
  //     'l < 9': not possible
  //     'l == 9': use value for 9
  //     '9 < l <= 18': use value for 18
  //     'l > 18': not possible

  if (state.bridgeType === 'Box') {
    if (state.width < 9) {
      return NaN;
    } else if (state.width <= 12) {
      return 12;
    } else if (state.width <= 18) {
      return 18;
    } else {
      return NaN;
    }
  } else if (state.bridgeType === 'Twin') {
    if (state.width >= 9 && state.width <= 12) {
      return 9;
    } else {
      return NaN;
    }
  } else if (state.bridgeType === 'Multi') {
    if (state.width < 10.8) {
      return NaN;
    } else {
      return 10.8;
    }
  } else if (state.bridgeType === 'Slab') {
    if (state.width < 9) {
      return NaN;
    }
    if (state.width == 9) {
      return 9;
    }
    if (state.width <= 18 && state.width > 9) {
      return 18;
    }
    if (state.width > 18) {
      return NaN;
    }
  }
};


function getPhi(state: VerificationState) {
    // show phycal options for bridge with a span <= 20m
    /*
    ** 𝐿 ≤ 10 𝑚, 𝑐𝑎𝑙 = 1.15
    ** 10 < 𝐿 ≤ 20 𝑚, 𝜑𝑐𝑎𝑙 = 1.15 − 0.015 ∙ (𝐿 − 10)
    ** 𝐿 > 20 𝑚, 𝜑𝑐𝑎𝑙 = 1.00
    ** Par défaut c'est 1.00
    */
    // const defaultPhyCalOptions = [{ label: 'Φ1.00', value: 1.0 }];

    const defaultGoodRoadPhyCal = 1.0;
    const defaultSmallRoadPhyCal = 1.15;
    if (state.span === null) {
      return defaultGoodRoadPhyCal;
    }
    if (state.span === undefined) {
      return defaultGoodRoadPhyCal;
    }
    // 10 < 𝐿 ≤ 20 𝑚, 𝜑𝑐𝑎𝑙 = 1.15 − 0.015 ∙ (𝐿 − 10)
    let phyCalDynamicValue =
      defaultSmallRoadPhyCal - 0.015 * (state.span - 10);
    if (state.span <= 10) {
      phyCalDynamicValue = defaultSmallRoadPhyCal; // 𝐿 ≤ 10 𝑚, 𝑐𝑎𝑙 = 1.15
    }
    if (state.span >= 20) {
      phyCalDynamicValue = defaultGoodRoadPhyCal; // 𝐿 > 20 𝑚, 𝜑𝑐𝑎𝑙 = 1.00
    }

    if (state.goodQualityRoad === true) {
      phyCalDynamicValue = defaultGoodRoadPhyCal;
    }
    if (phyCalDynamicValue === undefined) {
      return defaultGoodRoadPhyCal;
    }
    return phyCalDynamicValue;
}

function getFinalAlphaQ(state: VerificationState, currentAlphaQ: number): number {
  const minAlphaQ = state.selectedClass === 'ClassOW' ? 0.3001 : 0.3001;

  let alphaQ = currentAlphaQ ?? minAlphaQ;
  if (state.dynamicFactorEnabled) {
    alphaQ = getPhi(state) * alphaQ;
  }

  if (alphaQ < minAlphaQ && state.finalEnabled) {
    alphaQ = minAlphaQ;
  }
  // we apply the beta 4.7 factor after the minAlphaQ check
  if (state.beta  === 4.7 && state.dynamicFactorEnabled) {
    alphaQ = 1.07 * alphaQ; // 7% increase
  }

  return alphaQ;
}

function getSelectedClassKey(state: VerificationState) {
  if (state.selectedClass === 'Class') {
    return 'qG';
  }
  return 'qG+';
}

export const useVerificationStore = defineStore('verification', {
  // STATE_DEFINITION
  // let alphaQ2 = ref(0.35);
  // let alphaQ1 = ref(0.55);
  state: (): VerificationState => ({
    selectedLane: 'Uni2L', // Traffic: LaneType;
    selectedClass: 'Class',
    bridgeType: 'Box', //Type: BridgeType; default value should be null
    finalEnabled: true,
    dynamicFactorEnabled: true,
    goodQualityRoad: false,
    beta: 4.2,
    phi: 1.0,
    rBau: false,
    bridgeComposition: 'Composite', // SubType: BridgeComposition;
    span: 30, // Span: number;
    width: 12, // Width: number;
    trans: 'p0', // Trans: LongValue;
    isCantileverEnabled: false,
    spanTransversal: 3,
    supportType: 'Simp', // Support: SupportType;
  }),

  actions: {
    setLane(lane: LaneType) {
      this.selectedLane = lane;
    },
    setGoodQualityRoad(goodQualityRoad: boolean) {
      this.goodQualityRoad = goodQualityRoad;
    },
    setRBAU(roadBau: boolean) {
      this.rBau = roadBau;
    },
    setBeta(beta: number) {
      this.beta = beta;
    },
    setPhi(phi: number) {
      this.phi = phi;
    },
    setSelectedClass(selectedClass: TrafficClass) {
      this.selectedClass = selectedClass;
    },
    setBridgeType(bridgeType: BridgeType) {
      this.bridgeType = bridgeType;
      // reset the following when the bridge type changes
      // - selectedLane
      // - bridgeComposition
      // - span
      // - width
      // - trans
      // - supportType
      const minSpan = this.getMinSpan;
      const maxSpan = this.getMaxSpan;
      const minWidth = this.getMinWidth;
      const maxWidth = this.getMaxWidth;
      const resetSpan = () => {
        if (this.span < minSpan) {
          this.span = minSpan;
        }
        if (this.span > maxSpan) {
          this.span = maxSpan;
        }
      };
      const resetWidth = () => {
        if (this.width < minWidth) {
          this.width = minWidth;
        }
        if (this.width > maxWidth) {
          this.width = maxWidth;
        }
      };
      if (bridgeType === 'Box') {
        // selectedLane could be all values
        this.bridgeComposition = 'Composite';
        resetSpan();
        resetWidth();
        this.trans = 'p0';
      }

      if (bridgeType === 'Twin') {
        if (this.selectedLane === 'Bi4L') {
          this.selectedLane = 'Uni2L';
        }
        resetSpan();
        resetWidth();
        this.trans = 'p0';
      }

      if (bridgeType === 'Multi') {
        if (this.selectedLane === 'Bi4L') {
          this.selectedLane = 'Uni2L';
        }
        this.bridgeComposition = 'Composite';
        resetSpan();
        resetWidth();
        this.trans = 'P1';
      }

      if (bridgeType === 'Slab') {
        // this.bridgeComposition = 'Long'; // WE don't do that because we don't use it for slab in getMatrixLongitudinal
        resetSpan();
        resetWidth();
        this.trans = 'p1';
        this.isCantileverEnabled = false;
        if (this.supportType === 'Simp') {
          this.supportType = 'Semi';
        }
      }
    },
    setBridgeComposition(composition: BridgeComposition) {
      this.bridgeComposition = composition;
    },
    setLongitudinalSpan(span: number) {
      this.span = span;
    },
    setLongitudinalWidth(width: number) {
      this.width = width;
    },
    setLongitudinalTrans(trans: LongValue) {
      this.trans = trans;
    },
    updateLongitudinalDimensions(span: number, width: number) {
      this.span = span;
      this.width = width;
    },
    setTransversalSpan(span: number) {
      this.spanTransversal = span;
    },
    updateTransversalDimensions(span: number) {
      this.spanTransversal = span;
    },
    setTransversalCantileverEnabled(enabled: boolean) {
      this.isCantileverEnabled = enabled;
      // check bound of spanTransversal
      const minSpan = this.getMinSpanTransversal;
      const maxSpan = this.getMaxSpanTransversal;
      if (this.spanTransversal < minSpan) {
        this.spanTransversal = minSpan;
      }
      if (this.spanTransversal > maxSpan) {
        this.spanTransversal = maxSpan;
      }
    },
    setTransversalSupportType(supportType: SupportType) {
      this.supportType = supportType;
    },
  },

  /* Example of a line
 {
    "VerficicationType": "Longitudinal",
    "Type": "Box",
    "SubType": "Composite",
    "Traffic": "Uni2L",
    "Width": 12,
    "Support": "Simp",
    "Trans": "p0",
    "AE": "V",
    "Span": 70,
    "Q1G": 0.55,
    "Q2G": 0.35,
    "qG+": 0.251763803,
    "qG": 0.200938343,
    "Q1L": 0.55,
    "Q2L": 0.4
  },

*/

  getters: {
    getObjectiveTransversalSpan,
    getObjectiveLongitudinalWidth,
    getPhi,
    getMinSpanTransversal: (state) => {
      // state.isCantileverEnabled
      //       ? 'PorteAFaux'
      //       : 'DalleEntrePoutres',
      if (state.isCantileverEnabled) {
        return 1.22;
      } else {
        return 3;
      }
    },
    getMaxSpanTransversal: (state) => {
      // state.isCantileverEnabled
      //       ? 'PorteAFaux'
      //       : 'DalleEntrePoutres',
      if (state.isCantileverEnabled) {
        return 6.78;
      } else {
        return 12;
      }
    },
    getMinSpan: (state) => {
      if (state.bridgeType === 'Box') {
        return 20;
      } else if (state.bridgeType === 'Twin') {
        return 20;
      } else if (state.bridgeType === 'Multi') {
        return 20;
      } else if (state.bridgeType === 'Slab') {
        return 4;
      }
      // else if (state.bridgeType === 'DalleRoulem') {
      //   return 1.22;
      // }
      return 9;
    },
    getMaxSpan: (state) => {
      if (state.bridgeType === 'Box') {
        return 80;
      } else if (state.bridgeType === 'Twin') {
        return 80;
      } else if (state.bridgeType === 'Multi') {
        return 30;
      } else if (state.bridgeType === 'Slab') {
        return 30;
      }
      //  else if (state.bridgeType === 'DalleRoulem') {
      //   return 12;
      // }
      return 18;
    },
    getMaxWidth: (state) => {
      if (state.bridgeType === 'Box') {
        return 18;
      } else if (state.bridgeType === 'Twin') {
        return 12;
      } else if (state.bridgeType === 'Multi') {
        return 18;
      } else if (state.bridgeType === 'Slab') {
        return 18;
      }
      return 18;
    },
    getMinWidth: (state) => {
      if (state.bridgeType === 'Box') {
        return 9;
      } else if (state.bridgeType === 'Twin') {
        return 9;
      } else if (state.bridgeType === 'Multi') {
        return 10.8;
      } else if (state.bridgeType === 'Slab') {
        return 9;
      }
      return 9;
    },

    getBridgeComposition: (state) => state.bridgeComposition,
    getLongitudinalAlpha: (state) => {
      const ObjWidth = getObjectiveLongitudinalWidth(state);
      const ObjSpan = state.span;
      if (state.bridgeType !== null) {
        const matrix = getMatrixLongitudinal(
          ObjWidth,
          ObjSpan,
          state.selectedLane,
          state.bridgeType,
          state.bridgeComposition,
          state.trans,
          state.supportType
        );
        // if we have slab and support is Simp we need highest value between Semi and Fixed so we need to interpolate for both
        if (Array.isArray(matrix)) {
          // Special case for Slab with Simp support - need to interpolate both Semi and Fixed values
          const matrixArray = matrix as Record<AE, boudingPointsResult>[];
          const fixedMatrix = matrixArray[0];
          const semiMatrix = matrixArray[1];

          const AE: AE[] = ['V', 'M', 'Mn', 'Mp', 'MxMid', 'MxEdg'];
          const interpolatedMatrixFixed = AE.reduce((acc, ae) => {
            if (fixedMatrix?.[ae]) {
              acc[ae] = bilinearInterpolation(
                state,
                fixedMatrix[ae],
                ObjWidth,
                ObjSpan
              );

            }
            return acc;
          }, {} as Record<AE, StructuralAnalysis>);

          const interpolatedMatrixSemi = AE.reduce((acc, ae) => {
            if (semiMatrix?.[ae]) {
              acc[ae] = bilinearInterpolation(
                state,
                semiMatrix[ae],
                ObjWidth,
                ObjSpan
              );
            }
            return acc;
          }, {} as Record<AE, StructuralAnalysis>);

          // return [interpolatedMatrixFixed, interpolatedMatrixSemi];
          // Compare the corresponding values from Fixed and Semi matrices and return the one with higher values
          return AE.reduce((acc, ae) => {
            const fixedValue =
              interpolatedMatrixFixed[ae]?.[getSelectedClassKey(state)] ??
              -Infinity;
            const semiValue =
              interpolatedMatrixSemi[ae]?.[getSelectedClassKey(state)] ??
              -Infinity;
            acc[ae] =
              fixedValue > semiValue
                ? interpolatedMatrixFixed[ae]
                : interpolatedMatrixSemi[ae];
            return acc;
          }, {} as Record<AE, StructuralAnalysis>);
        } else {
          const AE: AE[] = ['V', 'M', 'Mn', 'Mp', 'MxMid', 'MxEdg'];
          const interpolatedMatrix: Record<AE, StructuralAnalysis> = AE.reduce(
            (acc, ae) => {
              if (matrix?.[ae]) {
                acc[ae] = bilinearInterpolation(state, matrix[ae], ObjWidth, ObjSpan);
              }
              return acc;
            },
            {} as Record<AE, StructuralAnalysis>
          );
          return interpolatedMatrix;
        }
      }
    },
    getTransversalAlpha: (state) => {
      const ObjSpan = getObjectiveTransversalSpan(state);
      if (state.bridgeType !== null) {
        const supportType = state.isCantileverEnabled
          ? mapTransCantilevr[state.supportType]
          : mapTransBetweenBeams[state.supportType];

        const matrix = getMatrixTransversal(
          'DalleRoulem', // state.bridgeType,
          state.isCantileverEnabled ? 'PorteAFaux' : 'DalleEntrePoutres',
          state.selectedLane,
          supportType,
          ObjSpan
        );
        const AE: AE[] = ['V', 'M', 'Mn', 'Mp', 'MxMid', 'MxEdg'];
        const interpolatedMatrix: Record<AE, StructuralAnalysis> = AE.reduce(
          (acc, ae) => {
            if (matrix?.[ae]) {
              acc[ae] = linearInterpolation(state, matrix[ae], ObjSpan);
            }
            return acc;
          },
          {} as Record<AE, StructuralAnalysis>
        );
        return interpolatedMatrix;
      }
    },
    getLane: (state) => state.selectedLane,
    getBridgeType: (state) => state.bridgeType,
    getSelectedClass: (state) => state.selectedClass,
    getSelectedClassKey,
  },
});
