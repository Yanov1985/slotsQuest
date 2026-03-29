import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
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
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100, // Максимум 100 запросов за 60 секунд (Anti-DDoS)
    }]),
    CacheModule.register({
      isGlobal: true,
      ttl: 60000, // Кэшируем на 60 секунд (переопределяется в контроллерах)
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
    JsonLdModule,
    PagesModule, // 🎯 JSON-LD генерация и валидация
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
