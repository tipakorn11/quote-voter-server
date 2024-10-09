import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { FilterQuoteDto } from './dto/filter-quote.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class QuoteService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateQuoteDto): Promise<CreateQuoteDto> {
    return await this.prisma.quote.create({ data });
  }

  async findAll(query: { searchTerm?: string; filter?: any; sortOrder?: 'asc' | 'desc' }): Promise<FilterQuoteDto> {
    const { filter, sortOrder } = query;

    return await this.prisma.quote.findMany({
      where: {
        AND: [
          filter
            ? {
              quote: {
                startsWith: filter,
              },
            }
            : {},
        ],
      },
      orderBy: {
        quote: sortOrder || 'desc',
      },
    });
  }



  async findOne(id: number) {
    return await this.prisma.quote.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateQuoteDto): Promise<UpdateQuoteDto> {
    return this.prisma.quote.update({ where: { id }, data });
  }

  async updateVote(id: number, data: UpdateQuoteDto): Promise<UpdateQuoteDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: data.id },
    });

    const quote = await this.prisma.quote.findUnique({
      where: { id },
    });

    if (!user || !quote) {
      return { error: "User or Quote not found" };
    }

    const hasVoted = user.vote === id;

    let voteChange = 0;
    if (hasVoted) {
      voteChange = -1;
    } else {
      voteChange = 1;
    }

    await this.prisma.quote.update({
      where: { id },
      data: {
        vote: { increment: voteChange },
      },
    });

    await this.prisma.user.update({
      where: { id: data.id },
      data: {
        vote: hasVoted ? null : id,
      },
    });

    return { message: "Vote updated successfully", voteChange };
  }


  remove(id: number) {
    return this.prisma.quote.delete({ where: { id } });
  }
}
