import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Get,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/createItem.dto';
import { AssignItemDto } from './dto/assignItem.dto';
import { UpdateItemDto } from './dto/updateItem.dto';
import { FindAllItemsDto } from './dto/findAllItems.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemsService: ItemsService) {}

  // Read Items
  @Get()
  async getItems(@Query() query: FindAllItemsDto) {
    return this.itemsService.getItems(query);
  }

  @Get(':id')
  async getItemsById(@Param('id') id: string) {
    return this.itemsService.getItemsById(id);
  }

  // CREATE work item
  @Post()
  createWorkItem(@Body() dto: CreateItemDto) {
    if (!dto.title) {
      throw new BadRequestException('title is required');
    }

    return this.itemsService.create(dto.title, dto.memberId, dto.description);
  }

  @Post('assign')
  assignworkItems(@Body() dto: AssignItemDto) {
    return this.itemsService.assignWorkItem(dto.workItemId, dto.memberId);
  }

  // UPDATE work item
  @Patch(':id')
  updateWorkItem(
    @Param('id') id: string,
    @Body()
    dto: UpdateItemDto,
  ) {
    return this.itemsService.update(id, dto);
  }

  // DELETE work item
  @Delete(':id')
  deleteWorkItem(@Param('id') id: string) {
    return this.itemsService.delete(id);
  }
}
