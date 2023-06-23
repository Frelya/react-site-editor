import { Controller, Get, Redirect } from '@nestjs/common';

import { APP_HOST } from '@shared/constants';

@Controller()
export class AppController {
    @Get()
    @Redirect('/docs')
    getApp(): string {
        return APP_HOST;
    }
}
