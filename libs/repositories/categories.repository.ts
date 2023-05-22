import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'libs';
import { PrismaService } from 'libs/database/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async createCategories(data: CreateCategoryDto) {
    return this.prisma.categories.create({
      data: data,
      select: { title: true, id: true },
    });
  }

  async findByName(name: string) {
    return await this.prisma.categories.findFirst({ where: { title: name } });
  }
}
