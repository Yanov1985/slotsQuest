import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProvidersPrismaService } from './providers-prisma.service';

@Controller('api/prisma/providers')
export class ProvidersPrismaController {
  constructor(private readonly providersPrismaService: ProvidersPrismaService) {}

  @Get()
  async findAll() {
    return this.providersPrismaService.findAll();
  }

  @Get('top')
  async getTopProviders(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.providersPrismaService.getTopProviders(limitNum);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.providersPrismaService.findBySlug(slug);
  }

  @Get(':slug/slots')
  async getProviderSlots(@Param('slug') slug: string) {
    const provider = await this.providersPrismaService.findWithSlots(slug);
    return provider ? provider.slots : [];
  }

  @Get(':slug/stats')
  async getProviderStats(@Param('slug') slug: string) {
    return this.providersPrismaService.getProviderStats(slug);
  }
}