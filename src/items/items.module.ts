import { Module } from '@nestjs/common';
import { ItemController } from './items.controller';
import { ItemsService } from './items.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ItemController], // 👈 controller registered here
  providers: [PrismaService, ItemsService], // 👈 service registered here
})
export class ItemsModule {}
