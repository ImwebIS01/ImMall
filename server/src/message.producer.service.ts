import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import Bull, { Queue, Job } from 'bull';

@Injectable()
export class MessageProducerService {
  constructor(@InjectQueue('message-queue') private queue: Queue) {}

  async sendMessage(message: string) {
    const job = await this.queue.add('message-job', message);
    return job;
  }

  async myFirst() {
    console.log(this.queue.isReady);
  }
}
