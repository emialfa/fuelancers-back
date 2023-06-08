import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseError, ResponseGet, ResponseOK } from 'src/common/responses/responses';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUser } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private config: ConfigService) { }

  async getUser(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          email: true,
          first_name: true,
          last_name: true,
          phone: true,
          role: true,
          id: true,
          picture: true,
          bg_photo: true,
          expert: {
            select: {
              id: true,
            },
          },
          profile: {
            select: {
              id: true,
            },
          },
        },
      });

      return ResponseGet(user);
    } catch (error) {
      console.log(error);
      ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }
  async getProfile(id: string) {
    // find profile that user id is equal to id args

    const profile = await this.prisma.profile.findUnique({
      where: {
        user_id: parseInt(id),
      },
    });

    if (!profile) throw new ForbiddenException('User profile not found');

    return profile;
  }

  async updateUser(id: string, dto: UpdateUser) {
    // check if the user exist
    await this.checkExistUser(id);

    // find profile that user id is equal to id args
    await this.prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...dto,
      },
    });

    return {
      success: 'Updated user.',
    };
  }

  async deleteUser(id: string) {
    // check if the user id exist
    await this.checkExistUser(id);

    // delete user profile
    await this.prisma.profile.delete({
      where: {
        user_id: parseInt(id),
      },
    });

    // delete user account by ID
    await this.prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    return {
      success: 'Deleted user.',
    };
  }

  async checkExistUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) throw new ForbiddenException('User not found');
  }

  // NOTE: UPLOAD IMAGE
  async uploadImage(file: Express.Multer.File, dto: string) {
    const isValidatedType = this.validateTypeFiles(file);
    if (!isValidatedType) {
      return ResponseError('Invalid file format.', HttpStatus.FORBIDDEN);
    }

    try {
      const url_img = await this.uploadImageOnImgBB(file);

      await this.prisma.user.update({
        where: {
          id: parseInt(dto),
        },
        data: {
          picture: url_img,
        },
      });

      return ResponseOK('Image uploaded Successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  // NOTE: UPLOAD IMAGE
  async uploadBgImage(file: Express.Multer.File, dto: string) {
    const isValidatedType = this.validateTypeFiles(file);
    if (!isValidatedType) {
      return ResponseError('Invalid file format.', HttpStatus.FORBIDDEN);
    }

    try {
      const url_img = await this.uploadImageOnImgBB(file);

      await this.prisma.user.update({
        where: {
          id: parseInt(dto),
        },
        data: {
          bg_photo: url_img,
        },
      });

      return ResponseOK('Image uploaded Successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async uploadImageOnImgBB(file: Express.Multer.File) {
    const blob = new Blob([file.buffer], { type: file.mimetype });
    const formData = new FormData();
    formData.append('image', blob, file.originalname);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${this.config.get('KEY_IMGBB')}`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const result: any = await response.json();

    return result.data.image.url;
  }

  validateTypeFiles(file: Express.Multer.File) {
    const mimeType: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
    let isValidatedType = true;
    if (!mimeType.includes(file.mimetype)) {
      isValidatedType = false;
    }

    return isValidatedType;
  }
}
