import { Client } from "./client";
import { Socket } from "socket.io";
import { IValidate } from "../interfaces/ivalidate";

export class ClientSocketPair implements IValidate {
  constructor(client: Client, socket: Socket) {
    this.client = client;
    this.socket = socket;
  }

  client: Client;
  socket: Socket;

  isValid(): boolean {
    return !!this.client && this.client.isValid() && !!this.socket;
  }
};
