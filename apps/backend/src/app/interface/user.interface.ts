import { Request } from 'express';
import { User } from '../user/user.entity';
import { DecodedIdToken } from '../auth/types/decoded-id-token';

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  firebaseId: string;
}

export interface ExtendedRequest extends Request {
  user: User | null;
  firebasePayload: DecodedIdToken;
}
