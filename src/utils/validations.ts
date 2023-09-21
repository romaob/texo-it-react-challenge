/**
 * Validate a string year returning the error message if it's invalid
 * @param year
 * @returns {string | null}
 */
export function validateStringYear(year: string): string | null {
    if (year.length === 0) {
        return 'Year is required';
      }
      if (year.length !== 4) {
        return 'Year must be 4 digits';
      }
      if (isNaN(Number(year))) {
        return 'Year must be a number';
      }
      try {
        const yearNumber = Number(year);
        if (yearNumber < 1900 || yearNumber > new Date().getFullYear()) {
          return 'Year must be between 1900 and the present';
        }
        return null;
      } catch (e) {
        return 'Year must be a number';
      }
}