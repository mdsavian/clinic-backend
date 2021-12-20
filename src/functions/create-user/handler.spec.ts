import type { Context, Callback } from 'aws-lambda';
import { main as handler } from './handler';
import { mocks } from './mock';

describe('Create User Handler', () => {
  const context = {} as Context;
  const callback = null as Callback;

  describe("When don't send email", () => {
    it("Should return status 400 and alert email isn't in request", async () => {
      const response = await handler(
        mocks.mockEventWithoutEmail,
        context,
        callback,
      );

      expect(response).toMatchObject({
        body: expect.stringContaining(
          '"message":"You should provide an email to create user"',
        ),
        statusCode: 400,
      });
    });
  });

  describe("When don't send password", () => {
    it("Should return status 400 and alert password isn't in request", async () => {
      const response = await handler(
        mocks.mockEventWithoutPassword,
        context,
        callback,
      );

      expect(response).toMatchObject({
        body: expect.stringContaining(
          '"message":"You should provide a password to create user"',
        ),
        statusCode: 400,
      });
    });
  });
  describe('When is a valid request', () => {
    it('should create an user', async () => {
      const response = await handler(mocks.mockValidEvent, context, callback);

      expect(response).toMatchObject({
        body: expect.stringContaining('"message":"User sucessfully created!'),
        statusCode: 200,
      });
    });
  });
});
