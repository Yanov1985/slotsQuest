import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { SlotsModule } from './slots/slots.module';
import { ProvidersModule } from './providers/providers.module';
import { CategoriesModule } from './categories/categories.module';
import { FeaturesModule } from './features/features.module';
import { ThemesModule } from './themes/themes.module';
import { MechanicsModule } from './mechanics/mechanics.module';
import { BonusesModule } from './bonuses/bonuses.module';
import { PrismaModule } from './prisma/prisma.module';
import { JsonLdModule } from './jsonld/jsonld.module'; // 🎯 Модуль JSON-LD для SEO

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SupabaseModule,
    SlotsModule,
    ProvidersModule,
    CategoriesModule,
    FeaturesModule,
    ThemesModule,
    MechanicsModule,
    BonusesModule,
    JsonLdModule, // 🎯 JSON-LD генерация и валидация
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
