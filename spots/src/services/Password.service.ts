import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPassword(userPassword: string): Promise<string> {
    const hashed = await hash(userPassword, 10);
    return hashed;
  }

  async checkPasswords(
    userPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isValid = await compare(userPassword, hashedPassword);
    return isValid;
  }
}
