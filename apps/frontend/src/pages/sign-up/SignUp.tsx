import { Button, Form, Input } from 'antd';
import { useContext, useState } from 'react';
import { AuthContext } from '../../firebase/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

export default function SignUpForm() {
  const { isLoading: isUserLoading, user } = useAppSelector(({ user }) => user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const authorize = async () => {
    signUp(email, password, firstname, lastname).then((result) => {
      navigate('/profile');
    });
  };

  if (isUserLoading) {
    return <div>Loading...</div>;
  }
  if (user) {
    navigate('/profile');
  }
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={authorize}
      // onFinishFailed={onFinishFailed}
      autoComplete="on"
    >
      <Form.Item
        label="Firstname"
        name="firstname"
        rules={[
          { required: true, type: 'string', message: 'Set your firstname' },
        ]}
      >
        <Input
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
        />
      </Form.Item>
      <Form.Item
        label="Lastname"
        name="lastname"
        rules={[
          { required: true, type: 'string', message: 'Set your firstname' },
        ]}
      >
        <Input onChange={(e) => setLastname(e.target.value)} value={lastname} />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Set your email' }]}
      >
        <Input onChange={(e) => setEmail(e.target.value)} value={email} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Set password' },
          { min: 6, message: 'Minimum length must be 6 symbols' },
        ]}
      >
        <Input.Password
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </Form.Item>
      <Form.Item
        label="Confirm password"
        name="confirmPass"
        rules={[
          { required: true, message: 'Confirm password' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The new password that you entered do not match!')
              );
            },
          }),
        ]}
      >
        <Input.Password
          onChange={(e) => setConfirmPass(e.target.value)}
          value={confirmPass}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
