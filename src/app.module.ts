import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { QuoteModule } from './quote/quote.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './middleware/constants';
@Module({
  imports: [UserModule, QuoteModule, PrismaModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [],
  providers: [],
})
export class AppModule { }
