import { Controller, Post, Patch, Body, Param } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  // POST /members
  @Post()
  createMember(@Body() body: { name: string; role: string }) {
    return this.membersService.create(body.name, body.role);
  }

  // PATCH /members/:id/role
  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body() body: { role: string }) {
    return this.membersService.updateRole(id, body.role);
  }
}
