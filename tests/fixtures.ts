import { test as base } from '@playwright/test';
import { ApiClient } from '../src/api/apiClient';
import { Request } from '../src/api/request';
import { Response } from '../src/api/response';
import { env } from '../src/utilities/env';

// Extend base test with fixtures for request and response
const test = base.extend<{
  apiClient: ApiClient;
  requestObj: Request;
  responseObj: Response;
}>({
  apiClient: async ({}, use) => {
    const client = await ApiClient.create(env.baseURL);
    await use(client);
  },
  requestObj: async ({}, use) => {
    // Example: default GET request, can be overridden in tests
    const req = new Request(env.baseURL, 'GET');
    await use(req);
  },
  responseObj: async ({}, use) => {
    // Placeholder, will be set in test after sending request
    await use(undefined as any);
  }
});

export { test, Request, Response };
