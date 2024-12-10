import { defineStore } from 'pinia';

interface VerificationState {
  longitudinal: {
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
    longitudinal: {
      isEnabled: true,
      span: 80,
      width: 9,
      alphaQV: 0,
      alphaQMneg: 0,
      alphaQMpos: 0
    }
  }),

  actions: {
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
    }
  },

  getters: {
    getLongitudinalConfig: (state) => state.longitudinal,
  }
});
