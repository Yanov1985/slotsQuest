import { Module } from '@nestjs/common';
import { SlotsController } from './slots.controller';
import { SlotsService } from './slots.service';
import { SlotsPrismaController } from './slots-prisma.controller';
import { SlotsPrismaService } from './slots-prisma.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [SupabaseModule, PrismaModule],
  controllers: [SlotsController, SlotsPrismaController],
  providers: [SlotsService, SlotsPrismaService],
  exports: [SlotsService, SlotsPrismaService],
})
export class SlotsModule {}
