import { Role } from './role';
export class User {
  id: number;
  username: string;
  password: string;
  fullname: string;
  email: string | null;
  roles: Role[]; // Roles are represented as an array of Role objects

  constructor(
    id: number,
    username: string,
    password: string,
    fullname: string,
    email: string | null,
    roles: Role[],
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.fullname = fullname;
    this.email = email;
    this.roles = roles;
  }
}
