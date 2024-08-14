import { Link, useNavigate } from 'react-router-dom';
import SignInForm from './SignIn';
import { Button, Divider, Space } from 'antd';
import GoogleIcon from '../../assets/GoogleIcon';
import { useContext } from 'react';
import { AuthContext } from '../../firebase/AuthProvider';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function SignInPage() {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogleButtonClick = async () => {
    signInWithGoogle().then(() => {
      navigate('/profile');
    });
  };
  return (
    <PageWrapper>
      <h1>Sign in</h1>
      <Space direction="vertical" align="center">
        <SignInForm />
        <div>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <Divider plain>or</Divider>
        <Button
          type="default"
          icon={<GoogleIcon />}
          onClick={handleGoogleButtonClick}
        >
          Sign in with Google
        </Button>
        <div>
          Don't have an account? <Link to="/sign-up">Sign up</Link> here
        </div>
      </Space>
    </PageWrapper>
  );
}
