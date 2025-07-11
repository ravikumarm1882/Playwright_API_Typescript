import { test } from './fixtures';
import { expect } from '@playwright/test';
import { Request } from '../src/api/request';
import { Response } from '../src/api/response';

// Example: Using withBody and withHeaders

test('POST /posts with body and headers', async ({ apiClient }) => {
  const req = new Request('/posts', 'POST')
    .withBody({ title: 'foo', body: 'bar', userId: 1 })
    .withHeaders({ 'Content-Type': 'application/json' });
  const res = await apiClient.send(req);
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('id');
});

// Example: Using fromJsonFile

test('POST /posts with body from JSON file', async ({ apiClient }) => {
  const req = await Request.fromJsonFile('/posts', 'POST', './test-data/post.json', {
    'Content-Type': 'application/json'
  });
  const res = await apiClient.send(req);
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('id');
});
