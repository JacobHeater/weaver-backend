import { Socket } from "socket.io";
import { EXECUTE_SCRIPT, POST_EXECUTE_SCRIPT } from '../../../../weaver-common/src/common/events';
import { EOL } from 'os';

export async function executeScript(socket: Socket, runLineByLine: boolean, script: string[]): Promise<string | string[]> {
  return new Promise<string | string[]>((resolve, reject) => {
    if (runLineByLine) {
      let processedLines: number = 0;
      const ioLines: string[] = [];

      socket.on(POST_EXECUTE_SCRIPT, (io: string) => {
        ioLines.push(io);
        processedLines++;

        if (processedLines == script.length) {
          socket.removeAllListeners(EXECUTE_SCRIPT);
          socket.removeAllListeners(POST_EXECUTE_SCRIPT);
          resolve(ioLines);
        }
      });

      for (const line of script) {
        socket.emit(EXECUTE_SCRIPT, line);
      }
    } else {
      const batchScript = script.join(EOL);

      socket.on(POST_EXECUTE_SCRIPT, (io: string) => {
        socket.removeAllListeners(EXECUTE_SCRIPT);
        socket.removeAllListeners(POST_EXECUTE_SCRIPT);
        resolve(io);
      });

      socket.emit(EXECUTE_SCRIPT, batchScript);
    }
  });
};
