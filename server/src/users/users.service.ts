import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'> | null> {
    return this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: number): Promise<Omit<User, 'password'> | null> {
    return this.prisma.user.delete({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
