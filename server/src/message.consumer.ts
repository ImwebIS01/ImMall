import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { MasterDatabaseService } from './database/master.database.service';

@Processor('message-queue')
export class MessageConsumer {
  constructor(
    @InjectQueue('message-queue') private queue: Queue,
    private readonly masterDatabaseService: MasterDatabaseService
  ) {}
  @Process('send-query')
  async readOperationJob(job: Job<string>) {
    const con = await this.masterDatabaseService.getConnection();
    try {
      const sql: string = job.data;
      await con.query(sql);
      console.log('Success to send query \n', sql);
    } catch (error) {
      throw error;
    } finally {
      con.release();
    }
  }
}
