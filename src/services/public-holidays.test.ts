import axios from 'axios';
import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays,
} from './public-holidays.service';
import { SUPPORTED_COUNTRIES } from '../config';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';
import { shortenPublicHoliday } from '../helpers';

const mockYear: number = new Date().getFullYear();
const mockCountryCode: string = SUPPORTED_COUNTRIES[0];

describe('Unit tests for Public Holiday services', () => {
  const mockData = [
    {
      date: mockYear + '-01-01',
      localName: "New Year's Day",
      name: "New Year's Day",
      countryCode: mockCountryCode,
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: ['Public'],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('get list of public holidays', async () => {
    const axiosSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce({ data: mockData });

    const result = await getListOfPublicHolidays(mockYear, mockCountryCode);

    expect(axiosSpy).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${mockYear}/${mockCountryCode}`
    );
    expect(result).toEqual(mockData.map(shortenPublicHoliday));

    axiosSpy.mockRestore();
  });

  test('check if today is a public holiday', async () => {
    const axiosSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce({ status: 200 });

    const result = await checkIfTodayIsPublicHoliday(mockCountryCode);

    expect(axiosSpy).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${mockCountryCode}`
    );
    expect(result).toBe(true);

    axiosSpy.mockRestore();
  });

  test('get next public holidays', async () => {
    const axiosSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce({ data: mockData });

    const result = await getNextPublicHolidays(mockCountryCode);

    expect(axiosSpy).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${mockCountryCode}`
    );
    expect(result).toEqual(mockData.map(shortenPublicHoliday));

    axiosSpy.mockRestore();
  });

  test('handles errors', async () => {
    const axiosSpy = jest
      .spyOn(axios, 'get')
      .mockRejectedValueOnce(new Error('Mocked error'));

    const result = await getListOfPublicHolidays(mockYear, mockCountryCode);

    expect(axiosSpy).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${mockYear}/${mockCountryCode}`
    );
    expect(result).toEqual([]);

    axiosSpy.mockRestore();
  });
});

describe('Integration tests for Public Holiday services', () => {
  test('should get list of public holidays', async () => {
    const response = await getListOfPublicHolidays(mockYear, mockCountryCode);

    expect(response).toBeDefined();
  });

  test('should return true if today is a pubilc holiday for a specific country, else return false', async () => {
    const response = await checkIfTodayIsPublicHoliday(mockCountryCode);

    if (response) {
      expect(response).toBeTruthy();
    } else {
      expect(response).toBeFalsy();
    }
  });

  test('should get the next pubilc holidays for a specific country', async () => {
    const resposne = await getNextPublicHolidays(mockCountryCode);

    expect(resposne).toBeDefined();
  });
});
