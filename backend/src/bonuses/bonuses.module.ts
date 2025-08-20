import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BonusesController } from './bonuses.controller';
import { BonusesService } from './bonuses.service';

@Module({
  imports: [PrismaModule],
  controllers: [BonusesController],
  providers: [BonusesService],
  exports: [BonusesService],
})
export class BonusesModule {}