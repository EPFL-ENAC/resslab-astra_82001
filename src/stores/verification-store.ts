import { defineStore } from 'pinia';

interface VerificationState {
  selectedLane: 'uni2l'| 'bi2l' | 'uni4l' | 'bi4l';
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
    span: number;
    width: number;
    alphaQV: number;
    alphaQMneg: number;
    alphaQMpos: number;
  };
  // Add more verification-related state here as needed
}

export const useVerificationStore = defineStore('verification', {
  state: (): VerificationState => ({
    selectedLane: 'uni2l',
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
      isEnabled: true,
      span: 80,
      width: 9,
      alphaQV: 0,
      alphaQMneg: 0,
      alphaQMpos: 0,
    }
  }),

  actions: {
    setLane(lane: 'uni2l'| 'bi2l' | 'uni4l' | 'bi4l') {
      this.selectedLane = lane;
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
    setTransversalWidth(width: number) {
      this.transversal.width = width;
    },
    updateTransversalDimensions(span: number, width: number) {
      this.transversal.span = span;
      this.transversal.width = width;
    },
    setTransversalAlphaQV(value: number) {
      this.transversal.alphaQV = value;
    },
    setTransversalAlphaQMneg(value: number) {
      this.transversal.alphaQMneg = value;
    },
    setTransversalAlphaQMpos(value: number) {
      this.transversal.alphaQMpos = value;
    }
  },

  getters: {
    getLongitudinalConfig: (state) => state.longitudinal,
    getLane: (state) => state.selectedLane,
    getTransversalConfig: (state) => state.transversal,
  }
});
