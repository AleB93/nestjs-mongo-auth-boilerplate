import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProvider } from './user.model';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProvider],
  exports: [UserService],
})
export class UserModule {}
