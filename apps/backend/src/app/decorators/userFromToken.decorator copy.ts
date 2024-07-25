import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtendedRequest } from '../interface/user.interface';

export const UserFromToken = createParamDecorator(
  (data: void, ctx: ExecutionContext) => {
    const req: ExtendedRequest = ctx.switchToHttp().getRequest();
    const decodedUser = req.firebasePayload;
    return decodedUser;
  }
);
