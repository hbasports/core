import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '../../../prisma/generated/prisma/client';

const prismaProvider = {
    provide: PrismaClient,
    useValue: new PrismaClient()
}

@Global()
@Module({
    providers: [
        {
            provide: PrismaClient,
            useFactory: () => new PrismaClient()
        }
    ],
    exports: [PrismaClient]
})
export class PrismaModule {}