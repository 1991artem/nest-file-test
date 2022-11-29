import { Controller, Get, Res } from '@nestjs/common';
import { Cookies } from './decorators/cookie.decorator';

@Controller()
export class AppController {
  @Get('get-cookie')
  index(@Cookies() cookie, @Res() response) {
    console.log(cookie)
    if (!cookie.token) {
      response.status(302).redirect('/singup');
    } else {
      response.status(302).redirect('/singin');
    }
  }
}
