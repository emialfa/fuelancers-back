import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUser } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
}
