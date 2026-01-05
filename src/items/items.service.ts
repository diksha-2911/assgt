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
    // ✅ keep transaction SHORT
    return this.prismaService.$transaction(async (tx) => {
      const member = await tx.member.findFirst({
        where: { name: memberName },
        select: { id: true },
      });

      if (!member) {
        throw new NotFoundException('Creator member not found');
      }
      return tx.workItem.create({
        data: {
          title,
          description,
          status: 'OPEN',
          createdBy: {
            connect: { id: member.id },
          },
        },
      });
    });
  }

  //ASSIGN WORK ITEM
  async assignWorkItem(workItemId: string, memberName: string) {
    return this.prismaService.$transaction(async (tx) => {
      const workItem = await tx.workItem.findUnique({
        where: { id: workItemId },
      });

      if (!workItem) {
        throw new NotFoundException('Work item not found');
      }

      const member = await tx.member.findFirst({
        where: { name: memberName },
      });

      if (!member) {
        throw new NotFoundException('Member not found');
      }
      return tx.workItem.update({
        where: { id: workItemId },
        data: {
          assignedTo: {
            connect: { id: member.id },
          },
        },
      });
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
    return this.prismaService.$transaction(async (tx) => {
      const workItem = await tx.workItem.findUnique({
        where: { id },
        select: { status: true },
      });

      if (!workItem) {
        throw new NotFoundException('workItem not found');
      }

      // 🔐 Validate status transition (NO DB UPDATE HERE)
      if (data.status && data.status !== workItem.status) {
        this.updateStatus(workItem.status, data.status);
      }

      // 📝 Update remaining fields (exclude status to avoid double update)
      const { status, ...rest } = data;

      // ✅ Single update call
      return tx.workItem.update({
        where: { id },
        data: rest,
      });
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
    return this.prismaService.$transaction(async (tx) => {
      const workItem = await tx.workItem.findUnique({
        where: { id },
        select: { id: true },
      });

      if (!workItem) {
        throw new NotFoundException('workItem not found');
      }

      return tx.workItem.delete({
        where: { id },
      });
    });
  }
}
