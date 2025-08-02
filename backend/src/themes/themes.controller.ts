import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ThemesService } from './themes.service';
import { CreateThemeDto, UpdateThemeDto, ThemeQueryDto } from './dto/theme.dto';

@Controller('api/themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Get()
  async findAll(@Query() query: ThemeQueryDto) {
    try {
      const data = await this.themesService.findAll(query);
      return { data };
    } catch (error) {
      throw new HttpException(
        `Failed to fetch themes: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('popular')
  async findPopular() {
    try {
      const data = await this.themesService.findPopular();
      return { data };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch popular themes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('featured')
  async findFeatured() {
    try {
      const data = await this.themesService.findFeatured();
      return { data };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch featured themes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const theme = await this.themesService.findOne(id);
      if (!theme) {
        throw new HttpException('Theme not found', HttpStatus.NOT_FOUND);
      }
      return { data: theme };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch theme',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/slots')
  async findSlotsByTheme(@Param('id') id: string) {
    try {
      const slots = await this.themesService.findSlotsByTheme(id);
      return { data: slots };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch slots by theme',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() createThemeDto: CreateThemeDto) {
    try {
      const theme = await this.themesService.create(createThemeDto);
      return { data: theme };
    } catch (error) {
      throw new HttpException(
        `Failed to create theme: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateThemeDto: UpdateThemeDto,
  ) {
    try {
      const theme = await this.themesService.update(id, updateThemeDto);
      return { data: theme };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Theme not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        `Failed to update theme: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.themesService.remove(id);
      return { message: 'Theme deleted successfully' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Theme not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        `Failed to delete theme: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}