import type { Context, Callback } from 'aws-lambda';
import { main as handler } from './handler';
import mockEvent from './mock.json';

describe('Create User Handler', () => {
  const context = {} as Context;
  const callback = null as Callback;

  describe("When don't send email", () => {
    it("Should return status 400 and alert email isn't in request", async () => {
      const mockEventWithoutEmail = {
        headers: { 'Content-Type': 'application/json' },
        body: '{"password": "teste@123"}',
      };

      const response = await handler(mockEventWithoutEmail, context, callback);

      expect(response).toMatchObject({
        body: '{"message":"You should provide an email to create user","event":{"headers":{"Content-Type":"application/json"},"body":{"password":"teste@123"}}}',
        statusCode: 400,
      });
    });
  });

  describe("When don't send password", () => {
    it("Should return status 400 and alert password isn't in request", async () => {
      const mockEventWithoutEmail = {
        headers: { 'Content-Type': 'application/json' },
        body: '{"email":"teste@gmail.com"}',
      };

      const response = await handler(mockEventWithoutEmail, context, callback);

      expect(response).toMatchObject({
        body: '{"message":"You should provide a password to create user","event":{"headers":{"Content-Type":"application/json"},"body":{"email":"teste@gmail.com"}}}',
        statusCode: 400,
      });
    });
  });
  //   it('should create an user', async () => {
  //     const response = await handler(mockEvent, context, callback);
  // console.
  //     // expect(response).toMatchObject({
  //     //   body: '{"message":"Hello Frederic, welcome to the exciting Serverless world!","event":{"headers":{"Content-Type":"application/json"},"body":{"name":"Frederic"}}}',
  //     //   statusCode: 200,
  //     // });
  //   });
});
