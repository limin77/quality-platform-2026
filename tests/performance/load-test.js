import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 50 }, // Ramp to 50 users
    { duration: '30s', target: 50 }, // Stay at 50
    { duration: '10s', target: 0 }, // Ramp down
  ],
  thresholds: {
    // We require 95% of requests to be faster than 500ms
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/');

  check(res, {
    'status is 200': (r) => r.status === 200,
    // Removed HTTP/2 check because this public API uses HTTP/1.1
  });

  sleep(1);
}
