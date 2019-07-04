import { TestSocket } from '../mocks/test-sccket';
import { Client } from '../../../weaver-common/src/common/client';
import { ClientSocketPair } from '../../src/clients/client-socket-pair';
import { ClientManager } from '../../src/clients/client-manager';
import uuid from 'uuid/v4';

test('Client manager should add a new ClientSocketPair to the mapping table', () => {
  const socket = new TestSocket();
  const client = new Client(uuid());

  client.computerName = uuid();

  const pair = new ClientSocketPair(client, socket);

  expect(pair.socket).toEqual(socket);
  expect(pair.client).toEqual(client);

  ClientManager.Instance.addClient(pair);

  const lookup = ClientManager.Instance.getClient(client.id);

  if (lookup) {
    expect(lookup).toBeDefined();
    expect(pair).toEqual(lookup);
    expect(pair.client).toEqual(lookup.client);
    expect(pair.socket).toEqual(lookup.socket);
  } else {
    fail();
  }
});

test('ClientManager should not add a ClientSocketPair to the mapping table when Client is invalid.', () => {
  const socket = new TestSocket();
  const client = new Client();

  const pair = new ClientSocketPair(client, socket);

  ClientManager.Instance.addClient(pair);

  const lookup = ClientManager.Instance.getClient(client.id);

  expect(lookup).toBeUndefined();
});

test('ClientManager should not add a ClientSocketPair to the mapping table when Socket is invalid.', () => {
  const socket: any = undefined;
  const client = new Client();

  const pair = new ClientSocketPair(client, socket);

  ClientManager.Instance.addClient(pair);

  const lookup = ClientManager.Instance.getClient(client.id);

  expect(lookup).toBeUndefined();
});
