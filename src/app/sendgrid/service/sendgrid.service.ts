import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { SendEmailInterface } from '../interface/send-email.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SendgridService {
  constructor(private readonly httpService: HttpService) {}

  async sendEmail(data: SendEmailInterface): Promise<boolean> {
    const url = 'https://api.sendgrid.com/v3/mail/send';
    const config = {
      headers: {
        Authorization: 'Bearer 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',
      },
    };
    const response = await lastValueFrom(this.httpService.post(url, data, config));
    console.log(response.data);
    return response.status === HttpStatus.ACCEPTED;
  }
}
