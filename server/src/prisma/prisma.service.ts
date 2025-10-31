// src/prisma/prisma.service.ts

import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('\x1b[32m✓ Database connected successfully\x1b[0m');
    } catch (error) {
      this.logger.error('\x1b[31m✗ Database connection failed\x1b[0m', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('\x1b[33m✓ Database disconnected successfully\x1b[0m');
    } catch (error) {
      this.logger.error('\x1b[31m✗ Database disconnection failed\x1b[0m', error);
      throw error;
    }
  }
}
