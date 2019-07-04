import { IStatusResult } from "../interfaces/istatus-result";
import { StatusCodes } from "../enums/status-codes";

export abstract class BaseSocketResponse<T> implements IStatusResult {
  status: StatusCodes = StatusCodes.Unknown;
  failureReasons: string[] = [];
  data: T | undefined;
}