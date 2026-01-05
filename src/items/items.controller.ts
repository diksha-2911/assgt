import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemController {
  constructor(private readonly itemsService: ItemsService) {}

  // Read Items
  @Get()
  async getItems() {
    return this.itemsService.getItems();
  }

  @Get(':id')
  async getItemsById(@Param('id') id: string) {
    return this.itemsService.getItemsById(id);
  }

  // CREATE work item
  @Post()
  createWorkItem(
    @Body() body: { memberName: string; title?: string; description?: string },
  ) {
    if (!body.title) {
      throw new BadRequestException('title is required');
    }

    return this.itemsService.create(
      body.title,
      body.memberName,
      body.description,
    );
  }

  @Post('assign')
  assignworkItems(@Body() body: { workItemId: string; memberName: string }) {
    return this.itemsService.assignWorkItem(body.workItemId, body.memberName);
  }

  // UPDATE work item
  @Patch(':id')
  updateWorkItem(
    @Param('id') id: string,
    @Body()
    body: {
      title?: string;
      description?: string;
      status?: 'OPEN' | 'IN_PROGRESS' | 'DONE';
    },
  ) {
    return this.itemsService.update(id, body);
  }

  // DELETE work item
  @Delete(':id')
  deleteWorkItem(@Param('id') id: string) {
    return this.itemsService.delete(id);
  }
}
