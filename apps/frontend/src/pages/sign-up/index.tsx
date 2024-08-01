import { Link } from 'react-router-dom';
import SignUpForm from './SignUp';

export default function SignUpPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Sign up</h1>
      <SignUpForm />
      <div style={{ margin: 'auto' }}>
        Already have an account? <Link to="/sign-in">Sign in</Link> here
      </div>
    </div>
  );
}
