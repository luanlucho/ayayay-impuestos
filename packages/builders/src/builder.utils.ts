// Builder utils

export const genBiasBoolean = (bias = 0.5) => {
  return Math.random() <= bias;
};
