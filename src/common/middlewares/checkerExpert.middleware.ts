import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckerExpertMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // set ID param in constant
    const idExp = req.params.id_exp;

    // execute function to check if the expert exists
    const checker = await this.checkExistExist(idExp);
    if (!checker) return;

    // if exist continue process
    return next(false);
  }

  async getExpertByID(id: string) {
    const expert = await this.prisma.expert.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return expert;
  }

  async checkExistExist(idExp: string) {
    const existExpert = await this.getExpertByID(idExp);

    if (!existExpert) throw new ForbiddenException('Invalid expert ID ');

    return true;
  }
}
