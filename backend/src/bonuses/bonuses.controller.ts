import { Controller, Get, Post, Put, Delete, Param, Query, Body, ParseIntPipe } from '@nestjs/common';
import { BonusesService } from './bonuses.service';
import { CreateBonusDto, UpdateBonusDto, BonusQueryDto } from './dto/bonus.dto';

@Controller('api/bonuses')
export class BonusesController {
  constructor(private readonly bonusesService: BonusesService) {}

  @Get()
  findAll(@Query() query: BonusQueryDto) {
    return this.bonusesService.findAll(query);
  }

  @Get('popular')
  findPopular(@Query('limit') limit?: number) {
    return this.bonusesService.findPopular(Number(limit) || 10);
  }

  @Get('featured')
  findFeatured(@Query('limit') limit?: number) {
    return this.bonusesService.findFeatured(Number(limit) || 10);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bonusesService.findOne(id);
  }

  @Get(':id/slots')
  findSlots(@Param('id', ParseIntPipe) id: number) {
    return this.bonusesService.findSlotsByBonus(id);
  }

  @Post()
  create(@Body() createBonusDto: CreateBonusDto) {
    return this.bonusesService.create(createBonusDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBonusDto: UpdateBonusDto) {
    return this.bonusesService.update(id, updateBonusDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bonusesService.remove(id);
  }

  @Post(':id/slots/:slotId')
  addBonusToSlot(
    @Param('id', ParseIntPipe) id: number,
    @Param('slotId') slotId: string,
  ) {
    return this.bonusesService.addBonusToSlot(slotId, id);
  }

  @Delete(':id/slots/:slotId')
  removeBonusFromSlot(
    @Param('id', ParseIntPipe) id: number,
    @Param('slotId') slotId: string,
  ) {
    return this.bonusesService.removeBonusFromSlot(slotId, id);
  }
}