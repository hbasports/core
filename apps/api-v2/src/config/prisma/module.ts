import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@hbasports/prisma/client';

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