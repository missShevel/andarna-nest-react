import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtendedRequest } from '../interface/user.interface';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req: ExtendedRequest = ctx.switchToHttp().getRequest();
    const user = req.user;

    return data ? (user as any)[data] : user;
  }
);
