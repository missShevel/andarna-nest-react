import { Link } from 'react-router-dom';
import SignInForm from './SignIn';

export default function SignInPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Sign in</h1>
      <SignInForm />
      <div style={{ margin: 'auto' }}>
        Don't have an account? <Link to="/sign-up">Sign up</Link> here
      </div>
      <div style={{ margin: 'auto' }}>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
    </div>
  );
}
