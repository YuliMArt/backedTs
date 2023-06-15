import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Res,
  Body,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { createUserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createUserDTO: createUserDTO) {
    console.log(createUserDTO);
    const user = await this.userService.addUser(createUserDTO);
    return res.status(HttpStatus.OK).json({ message: 'success', user });
  }
  @Get('/')
  async getUsers(@Res() res) {
    const products = await this.userService.getAll();
    res.status(HttpStatus.OK).json(products);
  }
  @Get('/:id')
  async getUser(@Res() res, @Param('id') id) {
    const user = await this.userService.getUser(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    res.status(HttpStatus.OK).json(user);
  }
  @Delete('/delete/:id')
  async deleteUser(@Res() res, @Param('id') id) {
    await this.userService.deleteUser(id);
    res.status(HttpStatus.OK).json({ messae: 'eliminado exitoso' });
  }
  @Put('/update/:id')
  async updateUser(
    @Res() res,
    @Body() createUserDTO: createUserDTO,
    @Param('id') id,
  ) {
    const updatedProduct = await this.userService.updateUser(id, createUserDTO);
    return res.status(HttpStatus.OK).json({
      updatedProduct,
    });
  }
}
