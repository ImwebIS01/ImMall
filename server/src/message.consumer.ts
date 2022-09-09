import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('message-queue')
export class MessageConsumer {
  @Process('message-job')
  readOperationJob(job: Job<unknown>) {
    console.log(job.data);
  }
}
