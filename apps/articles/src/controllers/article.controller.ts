import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ArticleService } from '../services/article.services';
import { CreateArticleDto } from 'libs/models/create-article.dto';
import { CreateCategoryDto } from 'libs';
import { QueryDto } from 'libs/models/query.dto';
import { IdDto } from 'libs/models/id.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post('/create')
  async createArticle(@Body() data: CreateArticleDto) {
    return await this.articleService.createArticle(data);
  }

  @Post('/create/category')
  async createCategory(@Body() data: CreateCategoryDto) {
    return await this.articleService.createCategory(data);
  }

  @Get()
  async getArticles(@Query() query: QueryDto) {
    return await this.articleService.getAllArticle(query);
  }

  @Get('/delete/:id')
  async deleteArticle(@Param('id') id) {
    return await this.articleService.deleteArticle(id);
  }

  @Get('detail/:id')
  async articleDetail(@Param('id') id) {
    return await this.articleService.findOneArticle(id);
  }
}
