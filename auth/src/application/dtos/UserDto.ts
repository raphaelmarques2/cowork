import { User } from '@prisma/client';

export class UserDto {
  id: string;
  name: string;
  email: string;

  constructor(user: User) {
    this.id = user.oid;
    this.name = user.name;
    this.email = user.email;
  }
}
