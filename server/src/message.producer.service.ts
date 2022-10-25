import { UsefulService } from 'src/useful/useful.service';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import Bull, { Queue, Job } from 'bull';

@Injectable()
export class MessageProducerService {
  constructor(@InjectQueue('message-queue') private queue: Queue) {}

  async sendMessage(message: string) {
    const result = message.replace(/\n/g, '');
    const job = await this.queue.add('message-job', result);
    return job;
  }

  async myFirst() {
    console.log(this.queue.isReady);
  }
}
