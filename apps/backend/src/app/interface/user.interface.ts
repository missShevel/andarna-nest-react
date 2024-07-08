import { Request } from 'express';
import { User } from '../user/user.entity';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

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
