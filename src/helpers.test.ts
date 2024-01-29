import { validateInput, shortenPublicHoliday } from './helpers';

const validCountry = 'GB';
const invalidCountry = 'XYZ';
const validYear = new Date().getFullYear();
const invalidYear = validYear - 1;

const mockShortPublicHoliday = {
  name: "New Year's Day",
  localName: "New Year's Day",
  date: '2024-01-01',
};

const mockLongPublicHistoryData = {
  date: validYear + '-01-01',
  localName: "New Year's Day",
  name: "New Year's Day",
  countryCode: validCountry,
  fixed: false,
  global: true,
  counties: null,
  launchYear: null,
  types: ['Public'],
};

describe('Validation functions', () => {
  test('validate input with supported country and current year', () => {
    const input = { year: validYear, country: validCountry };
    expect(validateInput(input)).toBe(true);
  });

  test('validate input with unsupported country', () => {
    const input = { year: validYear, country: invalidCountry };
    expect(() => validateInput(input)).toThrowError(
      `Country provided is not supported, received: ${invalidCountry}`
    );
  });

  test('validate input with invalid year', () => {
    const input = { year: invalidYear, country: validCountry };
    expect(() => validateInput(input)).toThrowError(
      `Year provided not the current, received: ${invalidYear}`
    );
  });

  test('shorten public holiday', () => {
    const result = shortenPublicHoliday(mockLongPublicHistoryData);
    expect(result).toEqual({
      name: mockShortPublicHoliday.name,
      localName: mockShortPublicHoliday.localName,
      date: mockShortPublicHoliday.date,
    });
  });
});
