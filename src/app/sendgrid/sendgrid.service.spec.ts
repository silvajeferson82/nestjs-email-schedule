import { Test, TestingModule } from '@nestjs/testing';
import { SendgridService } from './service/sendgrid.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { SendEmailInterface } from './interface/send-email.interface';

describe('SendgridService', () => {
  let sendGridService: SendgridService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendgridService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    sendGridService = module.get<SendgridService>(SendgridService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(sendGridService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('sendMail', () => {
    it('should send an email with success', async () => {
      //Arrange
      const data: SendEmailInterface = {
        personalizations: [
          {
            to: [
              {
                name: 'Cliente',
                email: 'cliente@email.com',
              },
            ],
          },
        ],
        from: {
          email: 'jefersonsilva.contato@gmail.com',
          name: 'Jeferson',
        },
        reply_to: {
          email: 'jefersonsilva.contato@gmail.com',
          name: 'Suporte',
        },
        subject: 'Sua fatura chegou!',
        content: [
          {
            type: 'text/html',
            value: '<p>Sua fatura chegou</p>',
          },
        ],
      };
      jest
        .spyOn(httpService, 'post')
        .mockReturnValueOnce(of({ status: 202, statusText: 'ACCEPTED', config: {}, headers: {}, data: '' }));
      //Act
      const result = await sendGridService.sendEmail(data);
      //Assert
      expect(result).toBeTruthy();
      expect(httpService.post).toBeCalledTimes(1);
    });
  });
});
