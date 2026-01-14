import { APIRequestContext, expect } from '@playwright/test';

export class BookingAPI {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // Action: Create a Token (Needed for "Admin" actions)
  async createToken() {
    const response = await this.request.post('https://restful-booker.herokuapp.com/auth', {
      data: {
        username: "admin",
        password: "password123"
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    return body.token;
  }

  // Action: Create a Booking
  async createBooking(firstName: string, lastName: string) {
    const response = await this.request.post('https://restful-booker.herokuapp.com/booking', {
      data: {
        firstname: firstName,
        lastname: lastName,
        totalprice: 1000,
        depositpaid: true,
        bookingdates: {
          checkin: "2026-01-01",
          checkout: "2026-02-01"
        },
        additionalneeds: "Breakfast"
      }
    });
    expect(response.status()).toBe(200);
    return await response.json();
  }
}