import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { FilterQuoteDto } from './dto/filter-quote.dto';
import {AuthGuard} from '../middleware/bearer-guard'
@Controller('api/v1/quote')
@UseGuards(AuthGuard)
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) { }

  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quoteService.create(createQuoteDto);
  }

  @Get()
  findAll(@Body() filterQuoteDto:FilterQuoteDto) {
    return this.quoteService.findAll(filterQuoteDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quoteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quoteService.update(+id, updateQuoteDto);
  }
  @Patch('/updateVote/:id')
  updateVote(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quoteService.updateVote(+id, updateQuoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quoteService.remove(+id);
  }
}
