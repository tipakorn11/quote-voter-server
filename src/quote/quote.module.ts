import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  controllers: [QuoteController],
  providers: [QuoteService],
  imports: [PrismaModule]
})
export class QuoteModule {
}
