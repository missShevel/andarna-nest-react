import { Link, useNavigate } from 'react-router-dom';
import SignUpForm from './SignUp';
import { AuthContext } from '../../firebase/AuthProvider';
import { useContext } from 'react';
import { Button, Divider } from 'antd';
import GoogleIcon from '../../assets/GoogleIcon';

export default function SignUpPage() {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogleButtonClick = async () => {
    signInWithGoogle().then(() => {
      navigate('/profile');
    });
  };
  return (
    <div>
      <h1>Sign up</h1>
      <SignUpForm />
      <Divider plain>or</Divider>
      <Button
        type="default"
        icon={<GoogleIcon />}
        onClick={handleGoogleButtonClick}
      >
        Sign in with Google
      </Button>
      <div style={{ marginTop: '10px' }}>
        Already have an account? <Link to="/sign-in">Sign in</Link> here
      </div>
    </div>
  );
}
