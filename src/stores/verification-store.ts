import { defineStore } from 'pinia';
import { setTransitionHooks } from 'vue';

export type SupportType = 'Simp' | 'Fixed' | 'Semi';
export type BridgeType = 'Slab' | 'Multi' | 'Twin' | 'Box';
export type LaneType = 'Uni2L' | 'Bi2L' | 'Bi4L';
import data from '../assets/data/data.json';
import { Traffic, TrafficClass } from 'src/types/Selected';
// import { computed } from 'vue';
interface VerificationState {
  selectedLane: LaneType;
  selectedClass: TrafficClass;
  bridgeType: BridgeType;
  longitudinal: {
    isEnabled: boolean;
    span: number;
    width: number;
  };
  transversal: {
    isEnabled: boolean;
    isCantileverEnabled: boolean;
    supportType: SupportType;
    span: number;
  };
  // Add more verification-related state here as needed
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

function getMatrixOrValueFromJson(width: number, span: number, traffic: Traffic, bridgeType: BridgeType, selectedClass: TrafficClass, ae: string) {
  // if we want to take traffic lane into account
  //  const filtered = data.filter(x => x.Type === bridgeType && x.Traffic === traffic && x.AE === ae);
  // if we don't want to take traffic lane into account
 const filtered = data.filter(x => x.Type === bridgeType && x.AE === ae);

 if ([10, 12, 15, 18].includes(width) && [70, 80].includes(span)) {
  // no interpolation needed
  return filtered.filter(x => x.Width === width && x.Span === span);
 }
 else {
  // find the 4 closest points
  const points = filtered.map(x => ({ Width: x.Width, Span: x.Span, class: x[selectedClass]}));
  // sort by width, then by span so that points looks always like this:
  // instead of using a or, I should first find two closest points on Width, then two closest points on Span
  const [p1, p2] = points.sort((a, b) => a.Width - b.Width);
  const [p3, p4] = points.sort((a, b) => a.Span - b.Span);
  // const [p1, p2, p3, p4] = points.sort((a, b) => a.Width - b.Width || a.Span - b.Span);
  // we need the matrix to have width and span like this: { Width: 18, Span: 80, class: 0.167184639 }
  return [p1, p2, p3, p4];
 }
}

function bilinearInterpolation(matrix, targetWidth, targetSpan) {
  // cf https://archive.org/details/numericalrecipes0865unse/page/122/mode/2up for more details
  // Find the four surrounding points
  // x is WIDTH, y is SPAN
  // sort by width, then by span so that points looks always like this:

  /*
    [
      { Width: 12, Span: 70, class: 0.117858204 },
      { Width: 12, Span: 80, class: 0.132028865 },
      { Width: 18, Span: 70, class: 0.175164259 },
      { Width: 18, Span: 80, class: 0.167184639 }
    ]
  */
  const points = matrix.sort((a, b) => a.Width - b.Width || a.Span - b.Span);
  const [p1, p2, p3, p4] = points;
  //    [q11, q12, q21, q22] = points.map(p => p.class); // basically the same as below

  // Calculate the interpolation weights
  const x1 = p1.Width, x2 = p3.Width;
  const y1 = p1.Span, y2 = p2.Span;
  const Q11 = p1.class, Q12 = p2.class, Q21 = p3.class, Q22 = p4.class;

  // We find the linear interpolation of function f at (x, y₁) using the values of f at (x₁, y₁) and (x₂, y₁) which are Q₁₁ and Q₂₁ respectively:
  const R1 = ((x2 - targetWidth) / (x2 - x1)) * Q11 + ((targetWidth - x1) / (x2 - x1)) * Q21;
  // We find the linear interpolation of f at (x, y₂) using the values of f at (x₁, y₂) and (x₂, y₂) which are Q₁₂ and Q₂₂ respectively:
  const R2 = ((x2 - targetWidth) / (x2 - x1)) * Q12 + ((targetWidth - x1) / (x2 - x1)) * Q22;

  // Finally, we find the linear interpolation at (x, y) using the interpolated values of f at (x, y₁) and (x, y₂):
  const P = ((y2 - targetSpan) / (y2 - y1)) * R1 + ((targetSpan - y1) / (y2 - y1)) * R2;

  return P;
}

/*
Bilinear interpolation is used to estimate a value at a point \((x, y)\) within a rectangle defined by four known values \(Q_{11}\), \(Q_{12}\), \(Q_{21}\), and \(Q_{22}\), corresponding to the corners \((x_1, y_1)\), \((x_1, y_2)\), \((x_2, y_1)\), and \((x_2, y_2)\), respectively.

The general formula for bilinear interpolation is:

\[
f(x, y) = \frac{1}{(x_2 - x_1)(y_2 - y_1)} \Big[ Q_{11}(x_2 - x)(y_2 - y) + Q_{21}(x - x_1)(y_2 - y) + Q_{12}(x_2 - x)(y - y_1) + Q_{22}(x - x_1)(y - y_1) \Big]
\]

When \(y_1 = y_2\), the points \((x_1, y_1)\) and \((x_2, y_2)\) collapse along the horizontal line \(y_1\), making interpolation along the \(y\)-direction undefined or unnecessary.

In this special case:
1. The interpolation reduces to **linear interpolation along the x-axis** between \(Q_{11}\) and \(Q_{21}\) (or between \(Q_{12}\) and \(Q_{22}\), depending on the point):
   \[
   f(x, y_1) = \frac{(x_2 - x)Q_{11} + (x - x_1)Q_{21}}{x_2 - x_1}
   \]

2. Since \(y_1 = y_2\), the result is independent of \(y\), and the interpolation simplifies to the linear interpolation above.

Thus, bilinear interpolation degenerates to a simple 1D linear interpolation when \(y_1 = y_2\).
*/



// Example usage
// const interpolatedValue = bilinearInterpolation(matrix, targetWidth, targetSpan);
// console.error('interpolated', interpolatedValue);


const getObjectiveTransversalWidth = (state: any) => {
  //   dalle_de_roulement:
  //     porte_a_faux:
  //       'l< 1.22': not possible
  //       interpolate_in_between_values: ''
  //       'l> 6.78': not possible
  //     dalle_entre_poutre:
  //       'l< 3': not possible
  //       interpolate_in_between_values: ''
  //       'l> 12': not possible
  if (state.transversal.isCantileverEnabled) {
    return 1.22;
  } else {
    return 6.78;
  }
};
const getObjectiveLongitudinalWidth = (state: any) => {
  // type_to_width:
  //   box:
  //     'l < 9': not possible
  //     '9 <l< 12': use value for 12
  //     '12<l< 18': interpolate
  //     'l> 18': Not possible
  //   twin:
  //     '9 <l< 12': use value for 9
  //   multi:
  //     'l< 10.8': not possible
  //     'l> 10.8': same as 10.8 (because of different beam analysis explicitly indicated)
  //   slab:
  //     'l=9': not possible
  //     '9 <l< 18': interpolate
  //     'l> 18': not possible

  if (state.bridgeType === 'Box') {
    if (state.longitudinal.width < 12) {
      return 12;
    } else if ((state.longitudinal.width < 18) && (state.longitudinal.width > 12)) {
      // interpolate
      return state.longitudinal.width;
    } else {
      return 18;
    }

  } else if (state.bridgeType === 'Twin') {
    return 9;
  } else if (state.bridgeType === 'Multi') {
    return 10.8;
  } else if (state.bridgeType === 'Slab') {
    // interpolate
    return state.longitudinal.width;
  }
}

export const useVerificationStore = defineStore('verification', {
  state: (): VerificationState => ({
    selectedLane: 'Uni2L',
    selectedClass: 'Class',
    bridgeType: 'Box',
    longitudinal: {
      isEnabled: true,
      span: 80,
      width: 9
    },
    // Initialize more verification-related state here as needed
    transversal: {
      isCantileverEnabled: false,
      isEnabled: true,
      span: 8,
      supportType: 'Simp',
    }
  }),

  actions: {
    setLane(lane: LaneType) {
      this.selectedLane = lane;
    },
    setBridgeType(bridgeType: BridgeType) {
      this.bridgeType = bridgeType;
    },
    setLongitudinalEnabled(enabled: boolean) {
      this.longitudinal.isEnabled = enabled;
    },
    setLongitudinalSpan(span: number) {
      this.longitudinal.span = span;
    },
    setLongitudinalWidth(width: number) {
      this.longitudinal.width = width;
    },
    updateLongitudinalDimensions(span: number, width: number) {
      this.longitudinal.span = span;
      this.longitudinal.width = width;
    },
    setTransversalEnabled(enabled: boolean) {
      this.transversal.isEnabled = enabled;
    },
    setTransversalSpan(span: number) {
      this.transversal.span = span;
    },
    updateTransversalDimensions(span: number) {
      this.transversal.span = span;
    },
    setTransversalCantileverEnabled(enabled: boolean) {
      this.transversal.isCantileverEnabled = enabled;
    },
    setTransversalSupportType(supportType: SupportType) {
      this.transversal.supportType = supportType;
    }
  },

  getters: {
    getLongitudinalConfig: (state) => state.longitudinal,
    getObjectiveTransversalWidth,
    getObjectiveLongitudinalWidth,
    getLongitudinalAlpha: (state) => {

      const selectedJson = data.filter(x =>
        x.Type === state.bridgeType &&
        // x.Width === state.longitudinal?.width &&
        x.Span === state.longitudinal?.span &&
        x.Traffic === state.selectedLane
        // x.Support === state.selectedSupport &&
        // x.Trans === state.Trans?.value &&
      );
      console.log(selectedJson);
      const ObjWidth = getObjectiveLongitudinalWidth(state);
      const matrix = getMatrixOrValueFromJson(ObjWidth, state.longitudinal.span, state.selectedLane, state.bridgeType, state.selectedClass, 'V');
      // need to filter AE V, Mn, MxMid, MxEdg, Mp
      try {

        let alphaV = 0;
        if (matrix.length === 1) {
          alphaV = matrix?.[0]?.[state.selectedClass];
        } else {
          alphaV = bilinearInterpolation(matrix, ObjWidth, state.longitudinal.span);
        }
      } catch (e) {
        console.error(e);
      }
      return ({
      ObjWidth,
      matrix,
      // realAlphaV: alphaV,
      alphaV: selectedJson.filter(x => x.AE === 'V')?.[0]?.[state.selectedClass],
      alphaMn: selectedJson.filter(x => x.AE === 'Mn')?.[0]?.[state.selectedClass],
      alphaMp: selectedJson.filter(x => x.AE === 'Mp')?.[0]?.[state.selectedClass],
      alphaMxMid: selectedJson.filter(x => x.AE === 'MxMid')?.[0]?.[state.selectedClass],
      alphaMxEdg: selectedJson.filter(x => x.AE === 'MxEdg')?.[0]?.[state.selectedClass]
    })},
    getTransversalAlpha: (state) => {
      return ({
        alphaV: 0.3,
        alphaMn: 0.3,
        alphaMp: 0.3,
        alphaMxMid: 0.3,
        alphaMxEdg: 0.3,
      })
    },
    getLane: (state) => state.selectedLane,
    getBridgeType: (state) => state.bridgeType,
    getSelectedClass: (state) => state.selectedClass,
    getTransversalConfig: (state) => state.transversal,
  }


});
