import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BlogsController],
})
export class BlogsModule {}
