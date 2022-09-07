import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';

@Injectable()
export class MessageProducerService {
  constructor(@InjectQueue('message-queue') private queue: Queue) {}

  async sendMessage(message: string) {
    try {
      this.queue.on('error', () => {
        console.log('error');
      });
      console.log(this.queue);

      const job: Job<any> = await this.queue.add({
        text: message,
      });
      console.log(job);
    } catch (error) {
      throw error;
    }
  }
}
