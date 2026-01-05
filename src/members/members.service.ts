import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  // CREATE MEMBER
  create(name: string, role: string) {
    return this.prisma.$transaction(async (tx) => {
      return tx.member.create({
        data: { name, role },
      });
    });
  }

  // UPDATE MEMBER ROLE
  async updateRole(id: string, role: string) {
    return this.prisma.$transaction(async (tx) => {
      const member = await tx.member.findUnique({
        where: { id },
        select: { id: true },
      });

      if (!member) {
        throw new NotFoundException('Member not found');
      }

      return tx.member.update({
        where: { id },
        data: { role },
      });
    });
  }

  // GET MEMBER (used for assignment validation)
  findAll() {
    return this.prisma.member.findMany();
  }
}
