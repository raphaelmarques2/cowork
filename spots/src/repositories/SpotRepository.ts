import { Injectable } from '@nestjs/common/decorators';
import { Spot } from '@prisma/client';
import { PrismaService } from 'src/services/Prisma.service';

export type CreateSpotProperties = Omit<Spot, 'id' | 'oid' | 'active'>;

@Injectable()
export class SpotRepository {
  constructor(private prisma: PrismaService) {}

  async findByOid(oid: string): Promise<Spot | null> {
    return this.prisma.spot.findUnique({ where: { oid } });
  }

  async findById(id: number): Promise<Spot | null> {
    return this.prisma.spot.findUnique({ where: { id } });
  }

  async create(spotProps: CreateSpotProperties): Promise<Spot> {
    const spot = await this.prisma.spot.create({
      data: {
        name: spotProps.name,
        active: true,
      },
    });
    return spot;
  }

  async update(spot: Spot): Promise<Spot> {
    return this.prisma.spot.update({
      where: { id: spot.id },
      data: spot,
    });
  }

  async list(): Promise<Spot[]> {
    return this.prisma.spot.findMany();
  }
}
