import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { loginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }
  async create(data: CreateUserDto): Promise<CreateUserDto> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {
      ...data,
      password: hashedPassword,  // Only the password is replaced with its hashed version
    };
    return await this.prisma.user.create({ data: userData })
  }

  async login(data: loginUserDto): Promise<loginUserDto> {
    const user = await this.prisma.user.findUnique({ where: { username: data.username } })
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (isMatch) {
      const payload = { username: data.username, password: data.password ,expiry:26400}
      const xsfToken = await this.jwtService.signAsync(payload)
      return ({ username: data.username, xsfToken, status: isMatch })
    }
    else
      return ({ username: data.username, xsfToken: 'asdasd', status: isMatch })
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateUserDto): Promise<UpdateUserDto> {


    return await this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
