import { Button, Form, Input } from 'antd';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import { signIn as storeSignIn } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import mapFirebaseUser from '../../utils/firebaseMapper';
import { useAppDispatch } from '../../app/hooks';
import { AuthContext } from '../../firebase/AuthProvider';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  if (user) {
    navigate('/profile');
  }
  const dispatch = useAppDispatch();
  const signIn = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const serializedUser = mapFirebaseUser(userCredentials.user);
      dispatch(storeSignIn(serializedUser));
      navigate('/profile');
    } catch (e: any) {
      // TODO error handling on the screen
      console.log(e.message);
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={signIn}
      // onFinishFailed={onFinishFailed}
      autoComplete="on"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Enter your email' }]}
      >
        <Input onChange={(e) => setEmail(e.target.value)} value={email} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Enter password' }]}
      >
        <Input.Password
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
}
