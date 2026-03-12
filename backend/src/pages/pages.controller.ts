import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { PagesService } from './pages.service';

@Controller('api/pages')
export class PagesController {
    constructor(private readonly pagesService: PagesService) { }

    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.pagesService.findOne(slug);
    }

    @Put(':slug')
    update(@Param('slug') slug: string, @Body() updateData: any) {
        return this.pagesService.update(slug, updateData);
    }
}
