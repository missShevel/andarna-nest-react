import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtendedRequest } from '../interface/user.interface';

export const UserFromToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req: ExtendedRequest = ctx.switchToHttp().getRequest();
    const user = req.user;
    const decodedUser = req.firebasePayload;
    return data ? (user as any)[data] : user;
  }
);
