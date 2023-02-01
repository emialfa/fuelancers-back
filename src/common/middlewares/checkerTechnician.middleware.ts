import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckerTechnicianMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // set ID param in constant
    const idTec = req.params.id_tec;

    // execute function to check if the technician exists
    const checker = await this.checkTechnicianExist(idTec);
    if (!checker) return;

    // if exist continue process
    return next(false);
  }

  async getTechnicianByID(id: string) {
    const technician = await this.prisma.technician.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return technician;
  }

  async checkTechnicianExist(idTec: string) {
    const existTechnician = await this.getTechnicianByID(idTec);

    if (!existTechnician) throw new ForbiddenException('Invalid technician ID ');

    return true;
  }
}
