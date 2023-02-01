import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from './decorators';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { UpdateUser } from './dto';

@UseGuards(JwtGuard)
@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('update/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUser) {
    console.log(dto);
    return this.userService.updateUser(id, dto);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Get('profile/:id')
  async getProfile(@Param('id') id: string) {
    return this.userService.getProfile(id);
  }
}
