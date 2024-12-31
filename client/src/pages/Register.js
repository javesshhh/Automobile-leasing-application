import React from "react";
import { Row, Col, Form, Input, Button, Anchor, message } from "antd";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/userActions";

function Register() {
  const dispatch = useDispatch();

  function onFinish(values) {
    if (values.password !== values.cpassword) {
      message.error("Passwords do not match!");
      return;
    }

    dispatch(userRegister(values))
      .then((response) => {
        if (response.success) {
          message.success("Registration successful");
          // Redirect to login page
        } else {
          message.error("Registration failed");
        }
      })
      .catch(() => message.error("Registration failed"));
  }

  return (
    <div>
      <Row gutter={16} style={{ marginTop: 100 }}>
        <Col lg={8}></Col>
        <Col lg={8} className="login">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confirm password"
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginBottom: 4 }}
            >
              Register
            </Button>
            <br />
            <Anchor
              items={[
                {
                  key: "login",
                  href: "/login",
                  title: "Click here to login",
                },
              ]}
            />
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
