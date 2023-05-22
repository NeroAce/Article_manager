import { Module } from '@nestjs/common';
import { ArticleRepository, CategoryRepository, PrismaService } from 'libs';
import { ArticleController } from './controllers/article.controller';
import { ArticleService } from './services/article.services';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [
    PrismaService,
    ArticleService,
    ArticleRepository,
    CategoryRepository,
  ],
})
export class ArticlesModule {}
