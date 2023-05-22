import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma.service';
import { ResponseInterface } from 'libs/models/Response.interface';
import { CreateArticleDto } from 'libs/models/create-article.dto';
import { QueryDto } from 'libs/models/query.dto';

@Injectable()
export class ArticleRepository {
  constructor(private prisma: PrismaService) {}

  async createArticle(data: CreateArticleDto) {
    return await this.prisma.articles.create({
      data: data,
      select: {
        title: true,
        details: true,
        createAt: true,
        category: { select: { title: true } },
      },
    });
  }

  async deleteArticle(id) {
    return await this.prisma.articles.delete({ where: { id: id } });
  }

  async findOneById(id) {
    return await this.prisma.articles.findFirst({ where: { id: id } });
  }

  async getArticle(query: QueryDto) {
    const value = new ResponseInterface(query);
    let where = {};

    if (query.category) {
      const filter = { category: { title: query.category } };
      where = { ...where, ...filter };
    }

    const data = await this.prisma.articles.findMany({
      where: where,
      select: {
        title: true,
        details: true,
        createAt: true,
        category: { select: { title: true } },
      },
      skip: value.skip,
      take: value.resPerPage,
      orderBy: value.orderBy,
    });

    console.log(data);

    const totalArticle = await this.prisma.articles.count({ where: where });

    return value.response(
      totalArticle,
      200,
      '',
      'success',
      data,
      query.orderBy,
      query.type,
    );
  }
}
