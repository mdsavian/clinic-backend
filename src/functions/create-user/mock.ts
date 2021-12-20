const mockValidEvent = {
  headers: { 'Content-Type': 'application/json' },
  body: '{"email": "teste@gmail.com", "password": "teste@123"}',
};

const mockEventWithoutEmail = {
  headers: { 'Content-Type': 'application/json' },
  body: '{"password": "teste@123"}',
};

const mockEventWithoutPassword = {
  headers: { 'Content-Type': 'application/json' },
  body: '{"email": "teste@gmail.com"}',
};

export const mocks = {
  mockValidEvent,
  mockEventWithoutEmail,
  mockEventWithoutPassword,
};
