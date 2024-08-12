import { Button, Form, Input, message, Space } from 'antd';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const emailSentSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Password reset link was sent ot your email',
    });
  };

  const emailSentFail = (errorMessage: string) => {
    messageApi.open({
      type: 'error',
      content: errorMessage,
    });
  };

  const handleSubmit = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('password reset for ', email);

      emailSentSuccess();
    } catch (e: any) {
      emailSentFail(e.message);
    }
  };

  return (
    <div>
      {contextHolder}
      <h2>Forgot Password</h2>
      <Form
        name="resetPassword"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        // onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input your email for password reset',
            },
          ]}
        >
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="default" onClick={() => navigate('/login')}>
              Back to login
            </Button>
            <Button type="primary" htmlType="submit">
              Reset password
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
