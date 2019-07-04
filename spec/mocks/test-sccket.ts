import { Socket } from 'socket.io';

export class TestSocket implements Socket {
  nsp: import("socket.io").Namespace;
  server: import("socket.io").Server;
  adapter: import("socket.io").Adapter;
  id: string;
  request: any;
  client: import("socket.io").Client;
  conn: import("socket.io").EngineSocket;
  rooms: { [id: string]: string; };
  connected: boolean;
  disconnected: boolean;
  handshake: import("socket.io").Handshake;
  json: Socket;
  volatile: Socket;
  broadcast: Socket;

  to(room: string): Socket {
    throw new Error("Method not implemented.");
  }
  in(room: string): Socket {
    throw new Error("Method not implemented.");
  }
  use(fn: (packet: import("socket.io").Packet, next: (err?: any) => void) => void): Socket {
    throw new Error("Method not implemented.");
  }
  send(...args: any[]): Socket {
    throw new Error("Method not implemented.");
  }
  write(...args: any[]): Socket {
    throw new Error("Method not implemented.");
  }
  join(name: string | string[], fn?: ((err?: any) => void) | undefined): Socket {
    throw new Error("Method not implemented.");
  }
  leave(name: string, fn?: Function | undefined): Socket {
    throw new Error("Method not implemented.");
  }
  leaveAll(): void {
    throw new Error("Method not implemented.");
  }
  disconnect(close?: boolean | undefined): Socket {
    throw new Error("Method not implemented.");
  }
  listeners(event: string): Function[] {
    throw new Error("Method not implemented.");
  }
  compress(compress: boolean): Socket {
    throw new Error("Method not implemented.");
  }
  addListener(event: string | symbol, listener: (...args: any[]) => void): this {
    throw new Error("Method not implemented.");
  }
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    throw new Error("Method not implemented.");
  }
  once(event: string | symbol, listener: (...args: any[]) => void): this {
    throw new Error("Method not implemented.");
  }
  removeListener(event: string | symbol, listener: (...args: any[]) => void): this {
    throw new Error("Method not implemented.");
  }
  off(event: string | symbol, listener: (...args: any[]) => void): this {
    throw new Error("Method not implemented.");
  }
  removeAllListeners(event?: string | symbol | undefined): this {
    throw new Error("Method not implemented.");
  }
  setMaxListeners(n: number): this {
    throw new Error("Method not implemented.");
  }
  getMaxListeners(): number {
    throw new Error("Method not implemented.");
  }
  rawListeners(event: string | symbol): Function[] {
    throw new Error("Method not implemented.");
  }
  emit(event: string | symbol, ...args: any[]): boolean {
    throw new Error("Method not implemented.");
  }
  listenerCount(type: string | symbol): number {
    throw new Error("Method not implemented.");
  }
  prependListener(event: string | symbol, listener: (...args: any[]) => void): this {
    throw new Error("Method not implemented.");
  }
  prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this {
    throw new Error("Method not implemented.");
  }
  eventNames(): (string | symbol)[] {
    throw new Error("Method not implemented.");
  }


};
