import { defineStore } from 'pinia';
import { setTransitionHooks } from 'vue';

export type SupportType = 'Simp' | 'Fixed' | 'Semi';
export type BridgeType = 'Slab' | 'Multi' | 'Twin' | 'Box';
export type LaneType = 'Uni2L' | 'Bi2L' | 'Bi4L';
interface VerificationState {
  selectedLane: LaneType;
  bridgeType: BridgeType;
  longitudinal: {
    isEnabled: boolean;
    span: number;
    width: number;
    alphaQV: number;
    alphaQMneg: number;
    alphaQMpos: number;
  };
  transversal: {
    isEnabled: boolean;
    isCantileverEnabled: boolean;
    supportType: SupportType;
    span: number;
    alphaQV: number;
    alphaQMneg: number;
    alphaQMpos: number;
  };
  // Add more verification-related state here as needed
}


export const useVerificationStore = defineStore('verification', {
  state: (): VerificationState => ({
    selectedLane: 'Uni2L',
    bridgeType: 'Box',
    longitudinal: {
      isEnabled: true,
      span: 80,
      width: 9,
      alphaQV: 0,
      alphaQMneg: 0,
      alphaQMpos: 0
    },
    // Initialize more verification-related state here as needed
    transversal: {
      isCantileverEnabled: false,
      isEnabled: true,
      span: 8,
      alphaQV: 0,
      supportType: 'Simp',
      alphaQMneg: 0,
      alphaQMpos: 0,
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
    setLongitudinalAlphaQV(value: number) {
      this.longitudinal.alphaQV = value;
    },
    setLongitudinalAlphaQMneg(value: number) {
      this.longitudinal.alphaQMneg = value;
    },
    setLongitudinalAlphaQMpos(value: number) {
      this.longitudinal.alphaQMpos = value;
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
    setTransversalAlphaQV(value: number) {
      this.transversal.alphaQV = value;
    },
    setTransversalAlphaQMneg(value: number) {
      this.transversal.alphaQMneg = value;
    },
    setTransversalAlphaQMpos(value: number) {
      this.transversal.alphaQMpos = value;
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
    getLane: (state) => state.selectedLane,
    getBridgeType: (state) => state.bridgeType,
    getTransversalConfig: (state) => state.transversal,
  }
});
