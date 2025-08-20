import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { MechanicsService } from './mechanics.service';
import { CreateMechanicDto, UpdateMechanicDto, MechanicQueryDto } from './dto/mechanic.dto';

@Controller('api/mechanics')
export class MechanicsController {
  constructor(private readonly mechanicsService: MechanicsService) {}

  @Get()
  async findAll(@Query() query: MechanicQueryDto) {
    return this.mechanicsService.findAll(query);
  }

  @Get('popular')
  async findPopular(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.mechanicsService.findPopular(limitNum);
  }

  @Get('featured')
  async findFeatured(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.mechanicsService.findFeatured(limitNum);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mechanicsService.findOne(id);
  }

  @Get(':id/slots')
  async findSlotsByMechanic(@Param('id', ParseIntPipe) id: number) {
    return this.mechanicsService.findSlotsByMechanic(id);
  }

  @Post()
  async create(@Body() createDto: CreateMechanicDto) {
    return this.mechanicsService.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateMechanicDto,
  ) {
    return this.mechanicsService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.mechanicsService.remove(id);
  }

  @Post(':id/slots/:slotId')
  async addMechanicToSlot(
    @Param('id', ParseIntPipe) id: number,
    @Param('slotId') slotId: string,
  ) {
    return this.mechanicsService.addMechanicToSlot(slotId, id);
  }

  @Delete(':id/slots/:slotId')
  async removeMechanicFromSlot(
    @Param('id', ParseIntPipe) id: number,
    @Param('slotId') slotId: string,
  ) {
    return this.mechanicsService.removeMechanicFromSlot(slotId, id);
  }
}