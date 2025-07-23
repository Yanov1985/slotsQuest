import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { ProvidersPrismaController } from './providers-prisma.controller';
import { ProvidersPrismaService } from './providers-prisma.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [SupabaseModule, PrismaModule],
  controllers: [ProvidersController, ProvidersPrismaController],
  providers: [ProvidersService, ProvidersPrismaService],
  exports: [ProvidersService, ProvidersPrismaService],
})
export class ProvidersModule {}
