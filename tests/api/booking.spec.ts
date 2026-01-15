import { test, expect } from '@playwright/test';
import { BookingAPI } from '../../src/api/BookingAPI';

test.describe('Backend API Reliability', () => {
  test('Should be able to create a booking (API)', async ({ request }) => {
    const bookingApi = new BookingAPI(request);

    // Act: Create a booking
    const response = await bookingApi.createBooking('Gemini', 'Engineer');

    // Assert: Verify the backend processed it correctly
    expect(response.booking).toBeTruthy();
    expect(response.booking.firstname).toBe('Gemini');
    expect(response.booking.lastname).toBe('Engineer');

    console.log(`✅ Created Booking ID: ${response.bookingid}`);
  });

  test('Should be able to generate an Auth Token', async ({ request }) => {
    const bookingApi = new BookingAPI(request);
    const token = await bookingApi.createToken();

    expect(token).toBeTruthy();
    console.log(`✅ Auth Token: ${token}`);
  });
});
