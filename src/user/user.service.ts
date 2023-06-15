import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDTO } from './dto/user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUser(userId: number): Promise<User> {
    const user = await this.userModel.findOneBy({ id: userId });
    return user;
  }
  async addUser(user: createUserDTO): Promise<User> {
    const newUser = this.userModel.create(user);
    return await this.userModel.save(newUser);
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userModel.delete(userId);
  }
  async updateUser(
    userId: number,
    updateUserDto: createUserDTO,
  ): Promise<User> {
    const user = await this.userModel.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const updatedUser = Object.assign(user, updateUserDto);

    return this.userModel.save(updatedUser);
  }
}
