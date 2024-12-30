/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { FindAllQueryDto } from './dto/query-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(query: FindAllQueryDto) {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        isActive: true,
        Role: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    const user = this.prisma.user.findUnique({
      where: { id },
    });

    return this.prisma.user.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    try {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          isActive: false,
        },
      });
    } catch (error) {
      throw new Error('User not found');
    }
  }
}
