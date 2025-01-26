import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DATABASE_CONNECTION } from './database-connection';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          user: configService.get('DB_USER'),
          host: configService.get('DB_HOST'),
          database: configService.get('DB_NAME'),
          password: configService.get('DB_PASSWORD'),
          port: configService.get('DB_PORT'),
        });

        return drizzle(pool, {
          schema: {},
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class DatabaseModule {}
