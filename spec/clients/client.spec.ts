import { Client } from "../../src/clients/client";
import uuid from 'uuid/v4';

test('Client.isValid() should return false when id is not set.', () => {
  const client = new Client();

  expect(client.isValid()).toBeFalsy();
});

test('Client.isValid() should return false when id is set, but computer name is not set.', () => {
  const client = new Client(uuid());

  expect(client.isValid()).toBeFalsy();
});

test('Client.isValid() should return true when id and computerName are set.', () => {
  const client = new Client(uuid());

  client.computerName = uuid();

  expect(client.isValid()).not.toBeFalsy();
});
