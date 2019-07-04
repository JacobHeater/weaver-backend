import { ClientSocketPair } from "./client-socket-pair";
import { Client } from "../../../weaver-common/src/common/client";
import { objectValues } from '../../../weaver-common/src/helpers/object-helpers';
import markdownTable from 'markdown-table';

export class ClientManager {
  private constructor() { }

  public static readonly Instance = new ClientManager();
  private readonly _clientTable: { [key: string]: ClientSocketPair } = {};

  /**
   * Adds a client socket pair to the mapping table.
   * 
   * @param pair The pair to add to the table.
   */
  public addClient(pair: ClientSocketPair): void {
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
  public removeClient(client: Client): void {
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
  public getClient(clientId: string): ClientSocketPair | undefined {
    if (!(clientId || '').trim()) {
      return void 0;
    }

    return this._clientTable[clientId];
  }

  /**
   * Returns the client table to a JSON string.
   */
  public clientsToTable(): string {
    const table: any[] = [];
    const cols = Object.keys(new Client());

    table.push(cols);

    for (let id in this._clientTable) {
      const client = this._clientTable[id].client;
      const values = objectValues(client);

      table.push(values);
    }

    return `<pre>${markdownTable(table)}</pre>`;
  }
}
