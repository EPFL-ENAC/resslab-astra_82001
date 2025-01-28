export const roundCeilWith2Decimals = (value?: number) => {
  if (!value) return 'N/A';

  // Convert to string to check decimal places
  const strValue = value.toString();
  const decimalPlaces = strValue.includes('.')
    ? strValue.split('.')[1].length
    : 0;

  // If more than 3 decimal places, round to 2
  if (decimalPlaces > 3) {
    return Math.round(value * 100) / 100;
  }

  // Otherwise return original value
  return value;
};
