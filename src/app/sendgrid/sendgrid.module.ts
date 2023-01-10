import { Module } from '@nestjs/common';
import { SendgridService } from './service/sendgrid.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [SendgridService],
})
export class SendgridModule {}
