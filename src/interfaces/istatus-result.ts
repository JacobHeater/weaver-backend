import { StatusCodes } from "../enums/status-codes";

export interface IStatusResult {
  status: StatusCodes;
  failureReasons: string[]
};
