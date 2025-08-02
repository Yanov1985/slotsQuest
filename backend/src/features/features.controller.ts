import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { CreateFeatureDto, UpdateFeatureDto, FeatureQueryDto } from './dto/feature.dto';

@Controller('api/features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  async findAll(@Query() query: FeatureQueryDto) {
    return this.featuresService.findAll(query);
  }

  @Get('popular')
  async findPopular(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.featuresService.findPopular(limitNum);
  }

  @Get('featured')
  async findFeatured(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.featuresService.findFeatured(limitNum);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.featuresService.findOne(id);
  }

  @Get(':id/slots')
  async findSlotsByFeature(@Param('id', ParseIntPipe) id: number) {
    return this.featuresService.findSlotsByFeature(id);
  }

  @Post()
  async create(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featuresService.create(createFeatureDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFeatureDto: UpdateFeatureDto,
  ) {
    return this.featuresService.update(id, updateFeatureDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.featuresService.remove(id);
  }
}