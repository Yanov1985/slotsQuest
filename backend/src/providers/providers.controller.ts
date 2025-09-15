import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProvidersService } from './providers.service';

@Controller('api/providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get()
  async getAllProviders() {
    try {
      return await this.providersService.getAllProviders();
    } catch (error) {
      console.error('Providers error:', error);
      throw new HttpException(
        `Failed to fetch providers: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('admin/all')
  async getAllProvidersForAdmin() {
    return this.providersService.getAllProvidersForAdmin();
  }

  @Get(':slug')
  async getProviderBySlug(@Param('slug') slug: string) {
    try {
      const provider = await this.providersService.getProviderBySlug(slug);
      if (!provider) {
        throw new HttpException('Provider not found', HttpStatus.NOT_FOUND);
      }
      return provider;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch provider',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':slug/slots')
  async getProviderSlots(@Param('slug') slug: string) {
    try {
      return await this.providersService.getProviderSlots(slug);
    } catch {
      throw new HttpException(
        'Failed to fetch provider slots',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createProvider(@Body() providerData: any) {
    return this.providersService.createProvider(providerData);
  }

  @Put(':id')
  async updateProvider(@Param('id') id: string, @Body() providerData: any) {
    return this.providersService.updateProvider(id, providerData);
  }

  @Delete(':id')
  async deleteProvider(@Param('id') id: string) {
    return this.providersService.deleteProvider(id);
  }
}
