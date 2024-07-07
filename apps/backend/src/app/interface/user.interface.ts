import { Request } from 'express';
import { User } from '../user/user.entity';

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  firebaseId: string;
}

export interface ExtendedRequest extends Request {
  user: User | null;
  firebasePayload: any;
}
