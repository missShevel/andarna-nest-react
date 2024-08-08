import { Link, useNavigate } from 'react-router-dom';
import SignInForm from './SignIn';
import { Button, Divider } from 'antd';
import GoogleIcon from '../../assets/GoogleIcon';
import { useContext } from 'react';
import { AuthContext } from '../../firebase/AuthProvider';

export default function SignInPage() {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogleButtonClick = async () => {
    signInWithGoogle().then(() => {
      navigate('/profile');
    });
  };
  return (
    <div>
      <h1>Sign in</h1>
      <SignInForm />
      <Divider plain>or</Divider>
      <Button
        type="default"
        icon={<GoogleIcon />}
        onClick={handleGoogleButtonClick}
      >
        Sign in with Google
      </Button>
      <div style={{ marginTop: '10px' }}>
        Don't have an account? <Link to="/sign-up">Sign up</Link> here
      </div>
      <div style={{ margin: 'auto' }}>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
    </div>
  );
}
