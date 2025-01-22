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

// this is the interface of the data (json) we have StructuralAnalysis[]
interface StructuralAnalysis {
  AE: AE;
  Span: number;
  SubType: BridgeComposition;
  Support: SupportType;
  Traffic: LaneType;
  Trans: LongValue;
  Type: BridgeType;
  VerificationType: VerificationType; // we don't use it
  Width: number;
  Q1G: number;
  Q1L: number;
  Q2G: number;
  Q2L: number;
  qG: number;
  'qG+': number;  // Note the quotes due to the + character
}
interface VerificationState {
  selectedLane: LaneType;
  selectedClass: TrafficClass;
  bridgeType: BridgeType | null;
  bridgeComposition: BridgeComposition;
  goodQualityRoad: boolean;
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
  width: number
) {
  const AE = ['V', 'Mp', 'Mn', 'M'];
  const resultMatrix: Record<string, any[]> = {};
  // subtype,traffic,bridgeType,selectedLane
  // PorteAFaux,Bi2L,1.22,Simp,AR0,M
  AE.forEach((ae) => {
    let filtered = [];
    if (bridgeType !== 'Slab') {
      // for slab we don't have data here ?
      filtered = data.filter(
        (x) =>
          x.Type === bridgeType &&
          x.AE === ae &&
          x.Traffic === traffic &&
          x.SubType === subtype &&
          x.Trans === support
      );
    } else {
      filtered = data.filter(
        (x) =>
          x.Type === bridgeType &&
          x.AE === ae &&
          x.Traffic === traffic &&
          x.SubType === subtype &&
          x.Trans === support
      );
    }

    const widthsAllowed = [
      12, 18, 9, 1.22, 2.33, 3.44, 4.56, 5.67, 6.78, 3, 7.5,
    ];
    // depends on the bridgeType
    // const spansAllowed = [20, 30, 40, 50, 60, 70, 80];\
    if (widthsAllowed.includes(width)) {
      // no interpolation needed
      resultMatrix[ae] = filtered.filter((x) => x.Width === width);
    } else {
      // I guess Width is x1, x2 and Span is y1, y2 ?
      const [p1, p2] = filtered.sort((a, b) => a.Width - b.Width);
      const [p3, p4] = filtered.sort((a, b) => a.Span - b.Span);
      // const [p1, p2, p3, p4] = points.sort((a, b) => a.Width - b.Width || a.Span - b.Span);
      // we need the matrix to have width and span like this: { Width: 18, Span: 80, class: 0.167184639 }
      resultMatrix[ae] = [p1, p2, p3, p4];
    }
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
  y1: number;
  y2: number;
}

function findBoundingPoints(points: StructuralAnalysis[], targetWidth: number, targetSpan: number): boudingPointsResult {
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
  trans: LongValue = 'p0'
): Record<AE, boudingPointsResult> {
  // return for each AE:
  const AE: AE[] = ['V', 'Mp', 'Mn', 'MxMid', 'MxEdg', 'M'];
  const resultMatrix: Record<string, boudingPointsResult> = {};
  // if we want to take traffic lane into account
  //  const filtered = data.filter(x => x.Type === bridgeType && x.Traffic === traffic && x.AE === ae);
  // if we don't want to take traffic lane into account

  AE.forEach((ae) => {
    let filtered: StructuralAnalysis[] = data as StructuralAnalysis[];
    if (bridgeType !== 'Slab') {
      filtered = filtered.filter(
        (x) =>
          x.Type === bridgeType &&
          x.AE === ae &&
          x.SubType === bridgeComposition &&
          x.Trans === trans && x.Traffic === traffic
      );
    } else {
      filtered = filtered.filter(
        (x) => x.Type === bridgeType && x.AE === ae && x.Trans === trans && x.Traffic === traffic
      );
    }

    resultMatrix[ae] = findBoundingPoints(filtered, width, span);
  });

  return resultMatrix;
}

function bilinearInterpolation(
  { p1, p2, p3, p4, x1, x2, y1, y2 } : boudingPointsResult,
  targetWidth: number,
  targetSpan: number
): StructuralAnalysis {
  // cf https://archive.org/details/numericalrecipes0865unse/page/122/mode/2up for more details
  // Find the four surrounding points
  // x is WIDTH, y is SPAN
  const classesToInterpolate: classResult[] = ['qG', 'qG+', 'Q1G', 'Q2G', 'Q1L', 'Q2L'];
  function interpolate(
    className: classResult,
    { p1, p2, p3, p4, x1, x2, y1, y2 } : boudingPointsResult,
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
    acc[className] = interpolate(
      className,
      { p1, p2, p3, p4, x1, x2, y1, y2 },
      targetWidth,
      targetSpan
    );
    return acc;
  }, {} as StructuralAnalysis);

  result['Width'] = targetWidth;
  result['Span'] = targetSpan;
  return result;
}

const getObjectiveTransversalWidth = (state: any) => {
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
    if (state.spanTransversal < 3) {
      return 1.22;
    }
    if (state.spanTransversal >= 3) {
      return 6.78;
    }
  } else {
    if (state.spanTransversal < 3) {
      return NaN;
    }
    if (state.spanTransversal > 12) {
      return NaN;
    }
    if (state.spanTransversal < 7.5) {
      return 3;
    }
    if (state.spanTransversal < 10) {
      return 7.5;
    }
    if (state.spanTransversal <= 12) {
      return 12;
    }
  }
};
const getObjectiveLongitudinalWidth = (state: any) => {
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
    }
    if (state.width <= 12) {
      return 12;
    } else if (
      state.width <= 18 &&
      state.width > 18
    ) {
      // no interpolate
      return state.width;
    } else {
      return NaN;
    }
  } else if (state.bridgeType === 'Twin') {
    if (state.width >= 9 && state.width <= 12) {
      return 9;
    } else {
      return NaN
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

function getSelectedClassKey(state: VerificationState) {
  if (state.selectedClass === 'Class') {
    return 'qG';
  }
  return 'qG+';
}

export const useVerificationStore = defineStore('verification', {
  // STATE_DEFINITION
  state: (): VerificationState => ({
    selectedLane: 'Uni2L', // Traffic: LaneType;
    selectedClass: 'Class',
    bridgeType: 'Box', //Type: BridgeType; default value should be null
    goodQualityRoad: false,
    rBau: false,
    bridgeComposition: 'Composite', // SubType: BridgeComposition;
    span: 30, // Span: number;
    width: 12,  // Width: number;
    trans: 'p0',  // Trans: LongValue;
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
      }
      const resetWidth = () =>  {
        if (this.width < minWidth) {
          this.width = minWidth;
        }
        if (this.width > maxWidth) {
          this.width = maxWidth;
        }
      }
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
    getObjectiveTransversalWidth,
    getObjectiveLongitudinalWidth,
    getMinSpan: (state) => {
        if (state.bridgeType === 'Box') {
          return 20;
        } else if (state.bridgeType === 'Twin') {
          return 20;
        } else if (state.bridgeType === 'Multi') {
          return 20
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
      // should be the same as the one in the state for now.
      const ObjSpan = state.span;
      if (state.bridgeType !== null) {

        const matrix = getMatrixLongitudinal(
          ObjWidth,
          ObjSpan,
          state.selectedLane,
          state.bridgeType,
          state.bridgeComposition,
          state.trans
        );
        const AE: AE[] = ['V', 'M', 'Mn', 'Mp', 'MxMid', 'MxEdg'];
        const interpolatedMatrix: Record<AE, StructuralAnalysis> = AE.reduce((acc, ae) => {
          if (matrix?.[ae]) {
            acc[ae] = bilinearInterpolation(
              matrix[ae],
              ObjWidth,
              ObjSpan
            );
          }
          return acc;
        }, {} as Record<AE, StructuralAnalysis>);
        return {
          // ObjWidth,
          // matrix,
          // realAlphaV: alphaV,
          V: interpolatedMatrix['V'], //matrix['V'],
          M: interpolatedMatrix['M'],
          Mn: interpolatedMatrix['Mn'],
          Mp: interpolatedMatrix['Mp'],
          MxMid: interpolatedMatrix['MxMid'],
          MxEdg: interpolatedMatrix['MxEdg'],
        };
      }
    },
    getTransversalAlpha: (state) => {
      const ObjWidth = getObjectiveTransversalWidth(state);
      if (state.bridgeType !== null) {
        const supportType = state.isCantileverEnabled
          ? mapTransCantilevr[state.supportType]
          : mapTransBetweenBeams[state.supportType];

        const matrix = getMatrixTransversal(
          'DalleRoulem', // state.bridgeType,
          state.isCantileverEnabled
            ? 'PorteAFaux'
            : 'DalleEntrePoutres',
          state.selectedLane,
          supportType,
          ObjWidth
        );
        return {
          V: matrix['V'],
          M: matrix['M'],
          Mn: matrix['Mn'],
          Mp: matrix['Mp'],
        };
      }
    },
    getLane: (state) => state.selectedLane,
    getBridgeType: (state) => state.bridgeType,
    getSelectedClass: (state) => state.selectedClass,
    getSelectedClassKey,
  },
});
