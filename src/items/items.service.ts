import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Status } from '@prisma/client';

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
    const existsWorkItem = await this.prismaService.workItem.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!existsWorkItem) {
      throw new NotFoundException('workItem not found');
    }

    // 🔐 Handle status update through transition rules
    if (data.status && data.status !== existsWorkItem.status) {
      await this.updateStatus(id, data.status);
    }

    // 📝 Update remaining fields (exclude status to avoid double update)
    const { status, ...rest } = data;

    return this.prismaService.workItem.update({
      where: { id },
      data: rest,
    });
  }

  async updateStatus(workItemId: string, newStatus: Status) {
    const ALLOWED_STATUS_TRANSITIONS: Record<Status, readonly Status[]> = {
      OPEN: ['IN_PROGRESS'],
      IN_PROGRESS: ['DONE'],
      DONE: [],
    };

    const workItem = await this.prismaService.workItem.findUnique({
      where: { id: workItemId },
    });

    if (!workItem) {
      throw new NotFoundException('Work item not found');
    }

    const currentStatus = workItem.status;
    const allowedNextStatuses = ALLOWED_STATUS_TRANSITIONS[currentStatus];

    if (!allowedNextStatuses.includes(newStatus)) {
      throw new BadRequestException(
        `Invalid status transition: ${currentStatus} → ${newStatus}`,
      );
    }

    return this.prismaService.workItem.update({
      where: { id: workItemId },
      data: { status: newStatus },
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
