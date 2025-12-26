import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  // CREATE MEMBER
  create(name: string, role: string) {
    return this.prisma.member.create({
      data: { name, role },
    });
  }

  // UPDATE MEMBER ROLE
  async updateRole(id: string, role: string) {
    const member = await this.prisma.member.findUnique({ where: { id } });
    if (!member) throw new NotFoundException('Member not found');

    return this.prisma.member.update({
      where: { id },
      data: { role },
    });
  }

  // GET MEMBER (used for assignment validation)
  findById(id: string) {
    return this.prisma.member.findUnique({ where: { id } });
  }
}
