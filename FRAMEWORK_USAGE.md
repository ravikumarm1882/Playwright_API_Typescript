# Playwright API Testing Framework

This project is a robust, generic API testing framework using Playwright and TypeScript.

## Key Features
- Centralized API context and config management
- Reusable request/response validation utilities
- Data-driven, maintainable tests
- Environment variable support
- JSON schema validation for API responses

## Project Structure
```
src/
  api/
    apiClient.ts         # API client abstraction
    baseApiTest.ts       # Base class for API tests
    request.ts           # Request builder
    response.ts          # Response wrapper
    validationUtils.ts   # Status & schema validation
  utilities/
    env.ts               # Environment config loader
tests/
  api-example.spec.ts    # Example test using the framework
  fixtures.ts            # Playwright fixtures for API
```

test-data/
  post.json              # Example test data

## Usage

### 1. Configure Environment
Create a `.env` file at the project root:
```
BASE_URL=https://jsonplaceholder.typicode.com
```

### 2. Write a Test
Example (`tests/api-example.spec.ts`):
```typescript
import { test as base, expect } from '@playwright/test';
import { BaseApiTest } from '../src/api/baseApiTest';
import { validateStatus, validateJsonSchema } from '../src/api/validationUtils';

const postSchema = { /* ...schema... */ };

base.describe('Example API Test', () => {
  let apiTest: BaseApiTest;
  base.beforeAll(async () => { apiTest = new BaseApiTest(); await apiTest.init(); });
  base.afterAll(async () => { await apiTest.dispose(); });

  base('GET /posts/1 returns valid post', async () => {
    const response = await apiTest.apiContext.get('/posts/1');
    validateStatus(response, 200);
    await validateJsonSchema(response, postSchema);
    const data = await response.json();
    expect(data.id).toBe(1);
  });
});
```

### 3. Run Tests
```sh
npm test
```

### 4. View Reports
```sh
npm run test:report
npm run show-report
```

## Extending the Framework
- Add new request/response utilities in `src/api/`
- Add more test data in `test-data/`
- Use fixtures for advanced setup/teardown

---

For more, see Playwright's [API testing docs](https://playwright.dev/docs/api-testing).
