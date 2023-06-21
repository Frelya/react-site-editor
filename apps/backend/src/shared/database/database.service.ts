import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { DatabaseClient } from './database.types';

@Injectable()
export class DatabaseService extends DatabaseClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
