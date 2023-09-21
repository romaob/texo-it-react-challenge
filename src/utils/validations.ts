export const YEAR_ERRORS ={
    required: 'Year is required',
    length: 'Year must be 4 digits',
    number: 'Year must be a number',
    range: 'Year must be between 1900 and the present'
}

/**
 * Validate a string year returning the error message if it's invalid
 * @param year
 * @returns {string | null}
 */
export function validateStringYear(year: string): string | null {
    try {
      if (year.length === 0) {
        return YEAR_ERRORS.required;
      }
      if (year.length !== 4) {
        return YEAR_ERRORS.length;
      }
      if (isNaN(Number(year))) {
        return YEAR_ERRORS.number;
      }
      const yearNumber = Number(year);
      if (yearNumber < 1900 || yearNumber > new Date().getFullYear()) {
        return YEAR_ERRORS.range;
      }
      return null;
    } catch (e) {
      return YEAR_ERRORS.number;
    }
}