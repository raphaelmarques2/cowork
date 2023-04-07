import { Spot } from '@prisma/client';

export class SpotDto {
  id: string;
  name: string;
  active: boolean;

  constructor(spot: Spot) {
    this.id = spot.oid;
    this.active = spot.active;
    this.name = spot.name;
  }
}
