import { Controller, Get, Redirect } from '@nestjs/common';

import { SkipAuth } from '@shared/decorators';

@Controller()
export class AppController {
    @SkipAuth()
    @Get()
    @Redirect('/docs')
    getApp(): string {
        return 'Redirecting to the API documentation...';
    }
}
