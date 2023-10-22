import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseError, ResponseGet, ResponseOK } from 'src/common/responses/responses';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { UpdateUser } from './dto';
import { ConfigService } from '@nestjs/config';
import FormData from 'form-data';
import axios from 'axios';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private config: ConfigService,
  ) {}

  async getUsers() {
    try {
      const user = await this.userModel.find();

      return ResponseGet(user);
    } catch (error) {
      console.log(error);
      ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async getUser(id: string) {
    try {
      const user = await this.userModel
        .findById(id)
        .select('email firstName lastName phone role id picture bgPhoto');

      return ResponseGet(user);
    } catch (error) {
      console.log(error);
      ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async getProfile(id: string) {
    const profile = await this.userModel.findById(id).exec();

    if (!profile) throw new ForbiddenException('User profile not found');

    return profile;
  }

  async updateUser(id: string, dto: UpdateUser) {
    // check if the user exists
    await this.checkExistUser(id);

    // find profile that user id is equal to id args
    await this.userModel.findByIdAndUpdate(id, { ...dto }).exec();

    return {
      success: 'Updated user.',
    };
  }

  async deleteUser(id: string) {
    // check if the user id exists
    await this.checkExistUser(id);

    // delete user profile
    await this.userModel.findByIdAndDelete(id).exec();

    return {
      success: 'Deleted user.',
    };
  }

  async checkExistUser(id: string) {
    const user = await this.userModel.findById(id);

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

      await this.userModel.findByIdAndUpdate(
        dto,
        {
          picture: url_img,
        },
        { new: true },
      );

      return ResponseOK('Image uploaded Successfully');
    } catch (error) {
      console.log(error);
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

      await this.userModel.findByIdAndUpdate(
        dto,
        {
          bgPhoto: url_img,
        },
        { new: true },
      );

      return ResponseOK('Image uploaded Successfully');
    } catch (error) {
      return ResponseError(error, HttpStatus.FORBIDDEN);
    }
  }

  async uploadImageOnImgBB(file: Express.Multer.File) {
    // const blob = new Blob([file.buffer], { type: file.mimetype });
    const formData = new FormData();
    formData.append('image', file.buffer, file.originalname);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${this.config.get('KEY_IMGBB')}`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      },
    );

    return response.data.data.image.url;
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
