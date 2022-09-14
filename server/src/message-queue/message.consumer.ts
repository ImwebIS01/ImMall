import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job, Queue } from 'bull';
import { createPool } from 'mysql2';
import { Pool } from 'mysql2/promise';
import { DatabaseService } from '../database/database.service';

@Processor('message-queue')
@Injectable()
export class MessageConsumer {
  private pool: Pool;
  constructor(
    @InjectQueue('message-queue') private readonly queue: Queue,
    private readonly databaseService: DatabaseService
  ) {}
  @Process('message-job')
  readOperationJob(job: Job<unknown>) {
    console.log(job);
  }

  @Process('send-query')
  async sendQuery(job: Job<string>) {
    const con = await this.databaseService.getConnection();
    console.log(job.data);
  }
}
