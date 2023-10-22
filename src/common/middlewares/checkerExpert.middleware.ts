import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckerExpertMiddleware implements NestMiddleware {
  // constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    // set ID param in constant
    // const idExp = req.params.id_exp;
    // // execute function to check if the expert exists
    // const checker = await this.checkExistExpert(idExp);
    // if (!checker) return;
    // // if exist continue process
    // return next(false);
  }

  async getExpertByID(id: string) {
    // const expert = await this.prisma.expert.findUnique({
    //   where: {
    //     id: parseInt(id),
    //   },
    // });
    // return expert;
  }

  async checkExistExpert(idExp: string) {
    // const existExpert = await this.getExpertByID(idExp);
    // if (!existExpert) throw new ForbiddenException('Invalid expert ID ');
    // return true;
  }
}
