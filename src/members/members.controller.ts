import { Controller, Post, Patch, Body, Param, Get } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/createMember.dto';
import { UpdateMemberDto } from './dto/updateRole.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  // POST /members
  @Post()
  createMember(@Body() dto: CreateMemberDto) {
    return this.membersService.create(dto.name, dto.role);
  }

  // PATCH /members/:id/role
  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.membersService.updateRole(id, dto.role);
  }

  @Get()
  getAllMembers() {
    return this.membersService.findAll();
  }
}
