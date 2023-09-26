import { YEAR_ERRORS, validateStringYear } from '../validations';

describe('validateStringYear', () => {
  it('should return null for a valid year string', () => {
    expect(validateStringYear('2021')).toBeNull();
  });

  it('should return the required error message for an empty year string', () => {
    expect(validateStringYear('')).toBe(YEAR_ERRORS.required);
  });

  it('should return the length error message for a year string with less than 4 digits', () => {
    expect(validateStringYear('21')).toBe(YEAR_ERRORS.length);
  });

  it('should return the length error message for a year string with more than 4 digits', () => {
    expect(validateStringYear('20210')).toBe(YEAR_ERRORS.length);
  });

  it('should return the number error message for a year string with non-numeric characters', () => {
    expect(validateStringYear('abcd')).toBe(YEAR_ERRORS.number);
  });

  it('should return the range error message for a year string before 1900', () => {
    expect(validateStringYear('1899')).toBe(YEAR_ERRORS.range);
  });

  it('should return the range error message for a year string after the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(validateStringYear(`${currentYear + 1}`)).toBe(YEAR_ERRORS.range);
  });

  it('should return the number error message when providing a value that causes a error when calling Number()', () => {
    expect(validateStringYear()).toBe(YEAR_ERRORS.number);
  });
});
