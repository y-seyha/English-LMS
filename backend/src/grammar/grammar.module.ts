import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GrammarController } from './grammar.controller';
import { GrammarService } from './grammar.service';
import { GrammarUnit, GrammarUnitSchema } from './schemas/grammar-unit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GrammarUnit.name, schema: GrammarUnitSchema }]),
  ],
  controllers: [GrammarController],
  providers: [GrammarService],
  exports: [GrammarService],
})
export class GrammarModule {}
