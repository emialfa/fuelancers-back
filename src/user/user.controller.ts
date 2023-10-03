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
  id: number;
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

  // NOTE: UploadImage
  @Post('upload-image/:id_user')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param('id_user') dto: string) {
    return this.userService.uploadImage(file, dto);
  }
  // NOTE: UploadImage
  @Post('upload-bg-image/:id_user')
  @UseInterceptors(FileInterceptor('image'))
  async uploadBgImage(@UploadedFile() file: Express.Multer.File, @Param('id_user') dto: string) {
    return this.userService.uploadBgImage(file, dto);
  }
}

// MONGODB MIGRATION

// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
//   UploadedFile,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import { GetUser } from './decorators';
// import { JwtGuard } from '../auth/guard';
// import { UserService } from './user.service';
// import { UpdateUser } from './dto';
// import { FileInterceptor } from '@nestjs/platform-express';

// @UseGuards(JwtGuard)
// @Controller('api/v1/users')
// export class UserController {
//   constructor(private userService: UserService) {}

//   @Get('me')
//   async getMe(@GetUser() user: User) {
//     return this.userService.getUser(user.id);
//   }

//   @Patch('update/:id')
//   async updateUser(@Param('id') id: string, @Body() dto: UpdateUser) {
//     return this.userService.updateUser(id, dto);
//   }

//   @Delete('delete/:id')
//   async deleteUser(@Param('id') id: string) {
//     return this.userService.deleteUser(id);
//   }

//   @Get('profile/:id')
//   async getProfile(@Param('id') id: string) {
//     return this.userService.getProfile(id);
//   }

//   @Post('upload-image/:id_user')
//   @UseInterceptors(FileInterceptor('image'))
//   async uploadImage(@UploadedFile() file: Express.Multer.File, @Param('id_user') dto: string) {
//     return this.userService.uploadImage(file, dto);
//   }

//   @Post('upload-bg-image/:id_user')
//   @UseInterceptors(FileInterceptor('image'))
//   async uploadBgImage(@UploadedFile() file: Express.Multer.File, @Param('id_user') dto: string) {
//     return this.userService.uploadBgImage(file, dto);
//   }
// }
