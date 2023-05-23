import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma.service';
import { CreateRoleDto } from 'libs/models/create-roles.dto';

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}

  async createRoles(data: CreateRoleDto) {
    return await this.prisma.roles.create({ data: data });
  }
  async getByName(name: string) {
    return await this.prisma.roles.findFirst({ where: { name: name } });
  }

  async createUserRole(roleid: number, userid: number) {
    const data = {
      userid: userid,
      roleid: roleid,
    };
    return await this.prisma.userroles.create({ data: data });
  }

  async getUserRole(userid: number) {
    return await this.prisma.userroles.findMany({
      where: { userid: userid },
      select: { roles: { select: { name: true } } },
    });
  }
}
