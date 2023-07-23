import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { handleWithInternalError } from '@/utils';
import { EnvService } from '@shared/env';

@Injectable()
export class CryptService {
    constructor(private readonly envService: EnvService) {}

    async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(parseInt(this.envService.get('CRYPT_SALT_ROUNDS')));
            return await bcrypt.hash(password, salt);
        } catch (error) {
            handleWithInternalError(error);
        }
    }

    async isPasswordCorrect(raw_password: string, encrypted_password: string): Promise<boolean> {
        try {
            return await bcrypt.compare(raw_password, encrypted_password);
        } catch (error) {
            handleWithInternalError(error);
        }
    }
}
