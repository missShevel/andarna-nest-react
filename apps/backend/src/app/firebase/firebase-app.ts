import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import firebaseConfig from '../../firebase.config';
import firebaseService from '../../../andarna-3049f-firebase-adminsdk-mmopr-b07de8765e.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseApp {
  private firebaseApp: firebase.app.App;

  constructor(private configService: ConfigService) {
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert({
        clientEmail: configService.get('FIREBASE_EMAIL_CLIENT'),
        projectId: configService.get('FIREBASE_PROJECT_ID'),
        privateKey: configService.get('FIREBASE_PRIVATE_KEY'),
      }),
    });
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth();
  };
}
