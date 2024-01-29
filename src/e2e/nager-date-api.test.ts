import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from '../config';
import { LongWeekend } from '../types';

const year: number = new Date().getFullYear();
const countryCode: string = SUPPORTED_COUNTRIES[0];

describe('e2e test for /LongWeekend API call', () => {
  test('should return status code 200', async () => {
    const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
      `/LongWeekend/${year}/${countryCode}`
    );
    expect(status).toEqual(200);
    body.forEach((data: LongWeekend) => {
      expect(data).toEqual({
        startDate: expect.any(String),
        endDate: expect.any(String),
        dayCount: expect.any(Number),
        needBridgeDay: expect.any(Boolean),
      });
    });
  });

  describe('e2e test for /Version API call', () => {
    test('should return status code 200 and a list of available countries', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        '/Version'
      );
      expect(status).toEqual(200);
      expect(body).toEqual({
        name: expect.any(String),
        version: expect.any(String),
      });
    });
  });
});
