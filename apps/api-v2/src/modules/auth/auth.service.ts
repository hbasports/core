import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly logger: Logger) {}

  createUser(user) {
    this.logger.log('Creating a user');
  }
}
