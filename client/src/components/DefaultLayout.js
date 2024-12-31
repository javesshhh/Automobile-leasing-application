import React from "react";
import { Button, Dropdown, Space } from "antd";
import jwt_decode from "jwt-decode";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Profile
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        My bookings
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </a>
    ),
  },
];

const token = localStorage.getItem("token");
const user = token ? jwt_decode(token) : null;

function DefaultLayout(props) {
  return (
    <div>
      <div className="header">
        <div
          className="d-flex justify-content-between border"
          style={{ padding: 10 }}
        >
          <h1>Rent car</h1>
          <Space direction="vertical" style={{ marginRight: 30 }}>
            <Space wrap>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottom"
              >
                <Button>{user ? user.username : "Guest"}</Button>
              </Dropdown>
            </Space>
          </Space>
        </div>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
