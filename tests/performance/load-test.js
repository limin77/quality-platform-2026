import http from 'k6/http';
import { check, sleep } from 'k6';

// 1. Configuration: How heavy is the load?
export const options = {
  // We simulate "Ramping Up" traffic
  stages: [
    { duration: '10s', target: 20 }, // Ramp up to 20 users in 10 seconds
    { duration: '30s', target: 20 }, // Stay at 20 users for 30 seconds
    { duration: '10s', target: 0 },  // Ramp down to 0
  ],
  // Pass if 95% of requests are faster than 500ms
  thresholds: {
    http_req_duration: ['p(95)<500'], 
  },
};

// 2. The Test Logic (What each user does)
export default function () {
  // We hit the public API (SauceDemo doesn't have a real API we can hit hard without blocking, 
  // so we will hit a reliable public test API for this demo: 'https://test-api.k6.io/public/crocodiles/')
  // In a real job, you would put your OWN internal API here.
  
  const res = http.get('https://test-api.k6.io/public/crocodiles/');

  // 3. Validation
  check(res, {
    'status is 200': (r) => r.status === 200,
    'protocol is HTTP/2': (r) => r.proto === 'h2',
  });

  sleep(1);
}