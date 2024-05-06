export default class User {
  private _username: string;

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  private _password: string;
  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  private _roleId: number;
  get roleId(): number {
    return this._roleId;
  }

  set roleId(value: number) {
    this._roleId = value;
  }

  constructor(username: string, password: string, roleId?: number) {
    this._username = username;
    this._password = password;
    this._roleId = roleId;
  }
}
