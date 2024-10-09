import { PartialType } from '@nestjs/mapped-types';
import { CreateQuoteDto } from './create-quote.dto';

export class FilterQuoteDto extends PartialType(CreateQuoteDto) {
    searchTerm?: string;
    filter?: Record<string, any>;
    sortOrder?: 'asc' | 'desc';
}
