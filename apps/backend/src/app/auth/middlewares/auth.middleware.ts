import { Injectable, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { FirebaseApp } from '../../firebase/firebase-app';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';
import { Repository } from 'typeorm';
import { ExtendedRequest } from '../../interface/user.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private auth: firebase.auth.Auth;

  constructor(
    private firebaseApp: FirebaseApp,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    this.auth = firebaseApp.getAuth();
  }

  use(req: ExtendedRequest, res: Response, next: () => void) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.auth
        .verifyIdToken(token.split(' ')[1])
        .then(async (decodedToken) => {
          const userFromDb = await this.userRepository.findOneBy({
            firebaseId: decodedToken.uid,
          });
          req.user = userFromDb;
          req.firebasePayload = decodedToken;
          next();
        })
        .catch(() => {
          next();
        });
    } else {
      next();
    }
  }
}
