import { IValidate } from "../interfaces/ivalidate";

export class Client implements IValidate {
  constructor(id?: string) {
    this.id = id || '';
  }

  id: string = '';
  computerName: string = '';
  emailAddress: string = '';
  userPrincipalName: string = '';

  /**
   * Returns a boolean indicating if the
   * client is valid.
   */
  isValid(): boolean {
    return !!(this.id || '').trim() && !!(this.computerName || '').trim();
  }
}