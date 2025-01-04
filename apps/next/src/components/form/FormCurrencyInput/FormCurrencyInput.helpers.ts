import { FormatByCurrencyOptions } from "./FormCurrencyInput.types";

/*
 * Function to format a specific currency
 *
 * @since 0.1.0
 * @param {number} value Formatted currency value
 * @param {FormatByCurrencyOptions} options Object that gets the options to format the currency
 * @param {boolean} points Change the format to points
 * @returns {string} Returns the value of the formatted currency
 */
export const formatByCurrency = (
  value: number,
  options: FormatByCurrencyOptions
) => {
  const { minimumFractionDigits, locale = "en", symbol, ...rest } = options;
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    minimumFractionDigits,
    ...rest
  });

  return formatter
    .formatToParts(value)
    .map(({ type, value }) => {
      if (!symbol) return value;
      switch (type) {
        case "currency":
          return symbol;
        default:
          return value;
      }
    })
    .reduce((string, part) => string + part);
};
