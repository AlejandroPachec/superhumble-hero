import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Ejam! Hire me! You will not regret it!';
  }
}
