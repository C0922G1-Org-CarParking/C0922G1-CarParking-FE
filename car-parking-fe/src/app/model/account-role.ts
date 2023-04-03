import {Role} from './role';

export interface AccountRole {
  accountRoleId: number;
  account: Account;
  role: Role;
}
