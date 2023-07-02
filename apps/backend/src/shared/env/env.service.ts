import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { isDevelopment, isProduction, isTest } from '@config/env.config';

@Injectable()
export class EnvService extends ConfigService {
    constructor() {
        super();
    }

    get<T extends keyof NodeJS.ProcessEnv>(property: T): NodeJS.ProcessEnv[T] {
        return super.get(property as string);
    }

    get isDevelopment(): boolean {
        return isDevelopment();
    }

    get isProduction(): boolean {
        return isProduction();
    }

    get isTest(): boolean {
        return isTest();
    }
}
