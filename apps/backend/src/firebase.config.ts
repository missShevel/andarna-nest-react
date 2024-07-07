const firebaseConfig = {
  clientEmail: process.env.FIREBASE_EMAIL_CLIENT,
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  // databaseUrl: <DATABASE_URL>,
};

export default firebaseConfig;
