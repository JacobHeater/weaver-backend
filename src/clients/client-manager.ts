import { ClientSocketPair } from "./client-socket-pair";
import { Client } from "../../../weaver-common/src/common/client";
import { objectValues } from '../../../weaver-common/src/helpers/object-helpers';
import markdownTable from 'markdown-table';
import { Socket } from 'socket.io';

export class ClientManager {
  private constructor() { }

  private static readonly _instance = new ClientManager();
  static get Instance(): ClientManager {
    return this._instance;
  }

  private _clientTable: { [key: string]: ClientSocketPair } = {};

  /**
   * Returns the number of connected clients.
   */
  get count(): number {
    return this.clientsToArray().length;
  }

  /**
   * Adds a client socket pair to the mapping table.
   * 
   * @param pair The pair to add to the table.
   */
  addClient(pair: ClientSocketPair): void {
    if (!pair || !pair.isValid()) {
      return;
    }

    this._clientTable[pair.client.id] = pair;
  }

  /**
   * Removes the given client from the mapping table, if
   * it exists.
   * 
   * @param client The client to remove from the table.
   */
  removeClient(client: Client): void {
    if (!client || !client.isValid()) {
      return;
    }

    delete this._clientTable[client.id];
  }

  /**
   * Retrieves a client from the mapping table, if it
   * exists.
   * 
   * @param clientId The id of the client to look up.
   */
  getClient(clientId: string): ClientSocketPair | undefined {
    if (!(clientId || '').trim()) {
      return void 0;
    }

    return this._clientTable[clientId];
  }

  /**
   * Returns the matching client socket pair based
   * on the socket.
   * 
   * @param socket The socket to filter on.
   */
  getClientBySocket(socket: Socket): ClientSocketPair | undefined {
    const pairs = this.clientSocketPairsToArray();
    const match = pairs.find(p => p.socket === socket);

    return match;
  }

  /**
   * Returns the client table to a JSON string.
   */
  clientsToTable(): string {
    let table: any[] = [];
    const cols = Object.keys(new Client());

    table.push(cols);

    const clients = this.clientsToArray();
    const clientValues = clients.map(c => objectValues(c));

    table = table.concat(clientValues);

    return `<pre>${markdownTable(table)}</pre>`;
  }

  /**
   * Returns the clients as a JSON array.
   */
  clientsToJson(): string {
    return JSON.stringify(this.clientsToArray());
  }

  /**
   * Returns the clients as an array.
   */
  clientsToArray(): Client[] {
    return this.clientSocketPairsToArray().map(c => c.client);
  }

  /**
   * Returns the mappings to an array.
   */
  clientSocketPairsToArray(): ClientSocketPair[] {
    const pairs: ClientSocketPair[] = [];

    for (let id in this._clientTable) {
      const pair = this._clientTable[id];

      pairs.push(pair);
    }

    return pairs;
  }

  /**
   * Clears the client mapping table.
   */
  clear(): void {
    this._clientTable = {};
  }
}
