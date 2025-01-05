// CountrySelect helper functions and data

import CONSTANTS from "config/constants";

export const options = CONSTANTS.SUPPORTED_COUNTRIES.map(country => {
  const { name, code } = country;
  return { label: name, value: code };
});
