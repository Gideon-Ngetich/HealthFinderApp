import React from "react";
import { Button, Checkbox, Form, Input, Typography, Card } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { message } from "antd";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate(); // Ensure it's inside the component

  const onFinish = async (values) => {
    console.log(values);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_ENDPOINT}/api/login`,
        values
      );

      if (response.status === 200) {
        message.success("Login successful");
        navigate(`/dashboard/${response.data.facility._id}`);
        console.log("Success:", response.data);
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      message.error("Login failed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg bg-white">
        <Title level={3} className="text-center mb-4">
          Login
        </Title>
        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <span className="my-2">
              Register your medical facility{" "}
              <Link to={"/register"}>Register</Link>
            </span>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
