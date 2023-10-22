import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from './decorators';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { UpdateUser } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

enum Role {
  USER,
  TECHNICIAN,
  ADMIN,
}

type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  hash: string;
  role: Role;
  phone: number | null;
  firstName: string | null;
  lastName: string | null;
};

@UseGuards(JwtGuard)
@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('')
  async get() {
    return this.userService.getUsers();
  }
  @Get('me')
  async getMe(@GetUser() user: User) {
    return this.userService.getUser(user.id);
  }
  @Patch('update/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUser) {
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
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @GetUser() user: User) {
    return this.userService.uploadImage(file, user.id);
  }
  @Post('upload-bg-image/')
  @UseInterceptors(FileInterceptor('image'))
  async uploadBgImage(@UploadedFile() file: Express.Multer.File, @GetUser() user: User) {
    return this.userService.uploadBgImage(file, user.id);
  }
}
