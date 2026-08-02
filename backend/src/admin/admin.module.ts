import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminGateway } from './admin.gateway';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UserProgress, UserProgressSchema } from '../progress/schemas/user-progress.schema';
import { QuizAttempt, QuizAttemptSchema } from '../progress/schemas/quiz-attempt.schema';
import { GrammarUnit, GrammarUnitSchema } from '../grammar/schemas/grammar-unit.schema';
import { Story, StorySchema } from '../stories/schemas/story.schema';
import { VocabularyWord, VocabularyWordSchema } from '../vocabulary/schemas/vocabulary-word.schema';
import { Bookmark, BookmarkSchema } from '../bookmarks/schemas/bookmark.schema';
import { Note, NoteSchema } from '../notes/schemas/note.schema';
import { ReviewItem, ReviewItemSchema } from '../review/schemas/review-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserProgress.name, schema: UserProgressSchema },
      { name: QuizAttempt.name, schema: QuizAttemptSchema },
      { name: GrammarUnit.name, schema: GrammarUnitSchema },
      { name: Story.name, schema: StorySchema },
      { name: VocabularyWord.name, schema: VocabularyWordSchema },
      { name: Bookmark.name, schema: BookmarkSchema },
      { name: Note.name, schema: NoteSchema },
      { name: ReviewItem.name, schema: ReviewItemSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminGateway],
})
export class AdminModule {}
