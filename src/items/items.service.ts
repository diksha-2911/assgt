import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  // CREATE
  async create(title: string, memberName: string, description?: string) {
    const memberId = await this.prismaService.member.findFirst({
      where: { name: memberName },
    });
    return this.prismaService.workItem.create({
      data: {
        title,
        description,
        status: 'OPEN',
        createdBy: {
          connect: {
            id: memberId?.id || '', // Replace with actual default member ID
          },
        }, // default value
      },
    });
  }

  //ASSIGN WORK ITEM
  async assignWorkItem(workItemId: string, memberName: string) {
    const member = await this.prismaService.member.findFirst({
      where: { name: memberName },
    });

    return await this.prismaService.workItem.update({
      where: { id: workItemId },
      data: {
        assignedTo: {
          connect: {
            id: member?.id || '', // Replace with actual default member ID
          },
        },
      },
    });
  }

  // UPDATE
  async update(
    id: string,
    data: {
      title?: string;
      description?: string;
      status?: 'OPEN' | 'IN_PROGRESS' | 'DONE';
    },
  ) {
    const exists = await this.prismaService.workItem.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('workItem not found');
    }

    return this.prismaService.workItem.update({
      where: { id },
      data,
    });
  }

  async getItems() {
    return await this.prismaService.workItem.findMany();
  }

  async getItemsById(id: string) {
    return await this.prismaService.workItem.findUnique({
      where: { id },
    });
  }

  // DELETE
  async delete(id: string) {
    const exists = await this.prismaService.workItem.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('workItem not found');
    }

    return this.prismaService.workItem.delete({
      where: { id },
    });
  }
}
