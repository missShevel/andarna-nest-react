import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExtendedRequest } from '../../interface/user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: ExtendedRequest = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }
    return true;
  }
}
