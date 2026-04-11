import { Module } from '@nestjs/common';
import { CasinosController } from './casinos.controller';

@Module({
  controllers: [CasinosController]
})
export class CasinosModule {}
