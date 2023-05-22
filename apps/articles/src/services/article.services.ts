import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository, ArticleRepository, CreateCategoryDto } from 'libs';
import { CreateArticleDto } from 'libs/models/create-article.dto';
import { IdDto } from 'libs/models/id.dto';
import { QueryDto } from 'libs/models/query.dto';

@Injectable()
export class ArticleService {
  constructor(
    private categoryRepository: CategoryRepository,
    private articleRepository: ArticleRepository,
  ) {}

  async createArticle(data: CreateArticleDto) {
    try {
      const sendData = await this.articleRepository.createArticle(data);
      return {
        code: '200',
        message: '',
        status: 'success',
        data: sendData,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createCategory(data: CreateCategoryDto) {
    try {
      const find = await this.categoryRepository.findByName(data.title);
      if (!find) {
        const sendData = await this.categoryRepository.createCategories(data);
        return {
          code: '200',
          message: '',
          status: 'success',
          data: sendData,
        };
      } else {
        throw new BadRequestException('Category already exists!');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllArticle(query: QueryDto) {
    return await this.articleRepository.getArticle(query);
  }

  async deleteArticle(id) {
    const newId = parseInt(id);
    const find = await this.articleRepository.findOneById(newId);
    console.log(find);
    if (find) {
      const sendData = await this.articleRepository.deleteArticle(newId);
      return {
        code: '200',
        message: '',
        status: 'success',
        data: sendData,
      };
    } else {
      throw new NotFoundException('Article  does not exists!');
    }
  }

  async findOneArticle(id) {
    const newId = parseInt(id);
    const find = await this.articleRepository.findOneById(newId);
    console.log(find);
    if (find) {
      return {
        code: '200',
        message: '',
        status: 'success',
        data: find,
      };
    } else {
      throw new NotFoundException('Article  does not exists!');
    }
  }
}
