import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';

@Processor('message-queue')
export class MessageConsumer {
  constructor(@InjectQueue('message-queue') private queue: Queue) {}
  @Process('message-job')
  readOperationJob(job: Job<unknown>) {
    console.log(job);
  }

  @Process('count')
  async countJob() {
    console.log(await this.queue.count());
  }

  @Process('failed')
  async getFailedJobDatas() {
    const failedJob: Job[] = await this.queue.getFailed();
    failedJob.map((job) => {
      console.log(job.data);
    });
  }

  @Process('completed')
  async getCompletedJobDatas(): Promise<Job[]> {
    return this.queue.getCompleted();
  }
}
