import { Module } from '@nestjs/common';
import { GlossaryController } from './glossary.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GlossaryController],
})
export class GlossaryModule {}
