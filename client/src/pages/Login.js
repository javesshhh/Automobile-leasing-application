import React from "react";
import { Row, Col, Form, Input, Button, Anchor, message } from "antd";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";

function Login() {
  const dispatch = useDispatch();

  function onFinish(values) {
    dispatch(userLogin(values))
      .then((response) => {
        if (response.success) {
          localStorage.setItem("token", response.data.token);
          message.success("Login successful");
          // Redirect to home or dashboard
        } else {
          message.error("Login failed");
        }
      })
      .catch(() => message.error("Login failed"));
  }

  return (
    <div>
      <Row
        gutter={16}
        style={{
          marginTop: 100,
        }}
      >
        <Col lg={8}></Col>
        <Col lg={8} className="login">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Login</h1>
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
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <br />
            <Anchor
              items={[
                {
                  key: "register",
                  href: "/register",
                  title: "Click here to register",
                },
              ]}
            />
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
