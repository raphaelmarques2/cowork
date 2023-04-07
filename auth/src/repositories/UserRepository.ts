import { Injectable } from '@nestjs/common/decorators';
import { CredentialType, User } from '@prisma/client';
import { PrismaService } from 'src/services/Prisma.service';

export type CreateUserProperties = Omit<User, 'id' | 'oid'> & {
  password: string;
};

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findUserAndCredentialsByEmailAndCredentialsType(
    email: string,
    credentialType: CredentialType,
  ) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        credentials: {
          where: { type: credentialType },
          take: 1,
        },
      },
    });
  }

  async findByOid(oid: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { oid } });
  }
  async create(userProps: CreateUserProperties): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: userProps.name,
        email: userProps.email,
        credentials: {
          create: {
            type: CredentialType.BASIC,
            password: userProps.password,
          },
        },
      },
      include: { credentials: true },
    });
    return user;
  }
  async update(user: User): Promise<User> {
    return this.prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  }

  async list(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
