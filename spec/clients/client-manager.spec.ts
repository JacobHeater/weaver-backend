import { SocketMock } from '../mocks/socket-mock';
import { Client } from '../../../weaver-common/src/common/client';
import { ClientSocketPair } from '../../src/clients/client-socket-pair';
import { ClientManager } from '../../src/clients/client-manager';
import uuid from 'uuid/v4';

test('Client manager should add a new ClientSocketPair to the mapping table', () => {
  const socket = new SocketMock();
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
  const socket = new SocketMock();
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

test('ClientManager should return the connected clients as a JSON array', () => {
  ClientManager.Instance.clear();

  generateClients().forEach(c => ClientManager.Instance.addClient(c));

  try {
    JSON.parse(ClientManager.Instance.clientsToJson());
  } catch (e) {
    fail(e);
  }
});

test('ClientManager should return the connected clients as a markdown table.', () => {
  ClientManager.Instance.clear();

  generateClients().forEach(c => ClientManager.Instance.addClient(c));

  try {
    JSON.parse(ClientManager.Instance.clientsToTable());
    fail();
  } catch (e) { }

  const table = ClientManager.Instance.clientsToTable();

  expect(table).not.toEqual('');
  expect(table).not.toBeFalsy();
});

test('ClientManager should return the connected clients as an array', () => {
  ClientManager.Instance.clear();

  generateClients().forEach(c => ClientManager.Instance.addClient(c));

  const arr = ClientManager.Instance.clientsToArray();

  expect(Array.isArray(arr)).toEqual(true);
  expect(arr.length).toBeGreaterThan(0);
});

function generateClients(): ClientSocketPair[] {
  const pairs: ClientSocketPair[] = [];

  for (let i = 0; i < 10; i++) {
    const client = new Client(uuid());

    client.computerName = uuid();

    const socket = new SocketMock();
    const pair = new ClientSocketPair(client, socket);

    pairs.push(pair);
  }

  return pairs;
}
