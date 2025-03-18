import { Module } from '@nestjs/common';
import { TestService } from './service';

@Module({
  imports: [],
  providers: [TestService],
  exports: [TestService],
})
export class TestModule {}
