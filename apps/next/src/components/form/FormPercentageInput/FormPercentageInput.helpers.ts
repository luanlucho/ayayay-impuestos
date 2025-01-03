// FormPercentageInput helper functions

export const formatPercentageInput = (value: number) => {
  return `${trimNumberToFourDecimals(value)}%`;
};

const trimNumberToFourDecimals = (value: number) => {
  const numberString = value.toString();
  const decimalPosition = numberString.indexOf(".");

  if (decimalPosition !== -1 && numberString.length - decimalPosition - 1 > 4) {
    return parseFloat(value.toFixed(4));
  } else {
    return value;
  }
};
