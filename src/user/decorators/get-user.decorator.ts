import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request: Express.Request = ctx.switchToHttp().getRequest();
  if (data) {
    return request.user[data];
  }
  return request.user;
});

// MIGRATION TO MONGOOSE
// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { User } from './user.model';

// export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
//   const request: Express.Request = ctx.switchToHttp().getRequest();
//   const user: User = request.user; // Suponiendo que la propiedad `user` contiene el usuario en el request.

//   if (data) {
//     return user[data];
//   }

//   return user;
// });
