import { test as base, expect } from '@playwright/test';
import { BaseApiTest } from '../src/api/baseApiTest';
import { validateStatus, validateJsonSchema } from '../src/utilities/validationUtils';
import { ApiLogger } from '../src/api/apiLogger';
import { TestDataLoader } from '../src/utilities/testDataLoader';

const postSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    userId: { type: 'number' },
    title: { type: 'string' },
    body: { type: 'string' }
  },
  required: ['id', 'userId', 'title', 'body']
};

base.describe('API CRUD Operations (Robust)', () => {
  let apiTest: BaseApiTest;
  let postData: any;
  let patchData: any;
  let putData: any;
  let createdId: number;

  base.beforeAll(async () => {
    apiTest = new BaseApiTest();
    await apiTest.init();
    postData = await TestDataLoader.loadJson('test-data/post.json');
    patchData = { title: 'patched title' };
    putData = { ...postData, title: 'updated title' };
  });

  base.afterAll(async () => {
    await apiTest.dispose();
  });

  base('GET /posts returns posts array', async () => {
    await ApiLogger.logRequest('GET', '/posts');
    const response = await apiTest.apiContext.get('/posts');
    await ApiLogger.logResponse(response);
    validateStatus(response, 200);
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/json');
  });

  base('POST /posts creates a post', async () => {
    await ApiLogger.logRequest('POST', '/posts', undefined, postData);
    const response = await apiTest.apiContext.post('/posts', { data: postData });
    await ApiLogger.logResponse(response);
    validateStatus(response, 201);
    await validateJsonSchema(response, postSchema);
    const data = await response.json();
    expect(data).toHaveProperty('id');
    createdId = data.id;
    expect(response.headers()['content-type']).toContain('application/json');
  });

  base('PATCH /posts/1 updates a post', async () => {
    await ApiLogger.logRequest('PATCH', '/posts/1', undefined, patchData);
    const response = await apiTest.apiContext.patch('/posts/1', { data: patchData });
    await ApiLogger.logResponse(response);
    validateStatus(response, 200);
    const data = await response.json();
    expect(data.title).toBe(patchData.title);
    expect(response.headers()['content-type']).toContain('application/json');
  });

  base('PUT /posts/1 replaces a post', async () => {
    await ApiLogger.logRequest('PUT', '/posts/1', undefined, putData);
    const response = await apiTest.apiContext.put('/posts/1', { data: putData });
    await ApiLogger.logResponse(response);
    validateStatus(response, 200);
    const data = await response.json();
    expect(data.title).toBe(putData.title);
    expect(response.headers()['content-type']).toContain('application/json');
  });
});
