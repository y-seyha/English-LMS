import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VocabularyController } from './vocabulary.controller';
import { VocabularyService } from './vocabulary.service';
import { VocabularyWord, VocabularyWordSchema } from './schemas/vocabulary-word.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VocabularyWord.name, schema: VocabularyWordSchema }]),
  ],
  controllers: [VocabularyController],
  providers: [VocabularyService],
  exports: [VocabularyService],
})
export class VocabularyModule {}
