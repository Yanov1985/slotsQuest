# Prisma ORM Integration

This document describes the Prisma ORM integration in the SlotQuest backend application.

## Overview

Prisma ORM has been integrated alongside the existing Supabase client to provide:
- Type-safe database operations
- Advanced query capabilities
- Database schema management
- Prisma Studio for database administration

## Setup

### Dependencies
- `prisma` - Prisma CLI and schema management
- `@prisma/client` - Prisma client for database operations

### Configuration

The Prisma configuration is located in `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### Environment Variables

- `DATABASE_URL` - Prisma Accelerate connection string
- `DIRECT_URL` - Direct PostgreSQL connection string

## Database Schema

The schema defines three main models:

### Provider
- `id` - UUID primary key
- `name` - Provider name
- `slug` - URL-friendly identifier
- `description` - Provider description
- `logoUrl` - Logo image URL
- `websiteUrl` - Official website
- `isActive` - Active status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp
- `slots` - One-to-many relationship with slots

### SlotCategory
- `id` - UUID primary key
- `name` - Category name
- `slug` - URL-friendly identifier
- `description` - Category description
- `isActive` - Active status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp
- `slots` - One-to-many relationship with slots

### Slot
- `id` - UUID primary key
- `name` - Slot name
- `slug` - URL-friendly identifier
- `providerId` - Foreign key to provider
- `categoryId` - Foreign key to category
- `description` - Slot description
- `thumbnailUrl` - Thumbnail image URL
- `screenshots` - Array of screenshot URLs
- `rtp` - Return to Player percentage
- `volatility` - Volatility level
- `minBet` - Minimum bet amount
- `maxBet` - Maximum bet amount
- `reels` - Number of reels
- `rows` - Number of rows
- `paylines` - Number of paylines
- `features` - Array of special features
- `theme` - Slot theme
- `releaseDate` - Release date
- `isMobileCompatible` - Mobile compatibility
- `isDemoAvailable` - Demo availability
- `rating` - User rating
- `playCount` - Number of plays
- `isActive` - Active status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp
- `provider` - Many-to-one relationship with provider
- `category` - Many-to-one relationship with category

## Services

### PrismaService
Core service that extends PrismaClient and handles connection lifecycle.

### SlotsPrismaService
Provides slot-related database operations:
- `findAll()` - Get all slots with pagination
- `findBySlug()` - Get slot by slug
- `findByProvider()` - Get slots by provider
- `findByCategory()` - Get slots by category
- `incrementPlayCount()` - Increment play counter
- `updateRating()` - Update slot rating
- `getPopularSlots()` - Get most played slots
- `getTopRatedSlots()` - Get highest rated slots

### ProvidersPrismaService
Provides provider-related database operations:
- `findAll()` - Get all providers
- `findBySlug()` - Get provider by slug
- `findWithSlots()` - Get provider with slots
- `getProviderStats()` - Get provider statistics
- `getTopProviders()` - Get top providers by rating

## API Endpoints

### Slots (Prisma)
- `GET /api/prisma/slots` - Get all slots
- `GET /api/prisma/slots/popular` - Get popular slots
- `GET /api/prisma/slots/top-rated` - Get top-rated slots
- `GET /api/prisma/slots/category/:categorySlug` - Get slots by category
- `GET /api/prisma/slots/:slug` - Get slot by slug
- `POST /api/prisma/slots/:slug/play` - Increment play count
- `POST /api/prisma/slots/:slug/rate` - Update rating

### Providers (Prisma)
- `GET /api/prisma/providers` - Get all providers
- `GET /api/prisma/providers/top` - Get top providers
- `GET /api/prisma/providers/:slug` - Get provider by slug
- `GET /api/prisma/providers/:slug/slots` - Get provider slots
- `GET /api/prisma/providers/:slug/stats` - Get provider statistics

## Prisma Studio

Prisma Studio provides a web-based database administration interface.

### Starting Prisma Studio
```bash
npm run db:studio
# or
npx prisma studio
```

Prisma Studio will be available at `http://localhost:5555`

## Available Scripts

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:pull` - Pull schema from database
- `npm run db:studio` - Start Prisma Studio
- `npm run db:migrate` - Run database migrations
- `npm run db:reset` - Reset database

## Benefits

1. **Type Safety** - Full TypeScript support with generated types
2. **Performance** - Optimized queries with Prisma Accelerate
3. **Developer Experience** - Intuitive API and excellent tooling
4. **Database Management** - Visual interface with Prisma Studio
5. **Flexibility** - Works alongside existing Supabase client

## Usage Example

```typescript
import { SlotsPrismaService } from './slots-prisma.service';

@Controller('slots')
export class SlotsController {
  constructor(private slotsPrismaService: SlotsPrismaService) {}

  @Get('popular')
  async getPopularSlots() {
    return this.slotsPrismaService.getPopularSlots(10);
  }
}
```

This integration provides a modern, type-safe alternative to direct SQL queries while maintaining compatibility with the existing Supabase infrastructure.