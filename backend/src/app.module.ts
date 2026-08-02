import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GrammarModule } from './grammar/grammar.module';
import { StoriesModule } from './stories/stories.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { ProgressModule } from './progress/progress.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { NotesModule } from './notes/notes.module';
import { ReviewModule } from './review/review.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
        tlsAllowInvalidCertificates: true,
        serverSelectionTimeoutMS: 30000,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    GrammarModule,
    StoriesModule,
    VocabularyModule,
    ProgressModule,
    BookmarksModule,
    NotesModule,
    ReviewModule,
    LeaderboardModule,
    AdminModule,
  ],
})
export class AppModule {}
