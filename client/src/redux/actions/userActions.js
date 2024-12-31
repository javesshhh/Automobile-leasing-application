import { message } from "antd";
import axios from "axios";

export const userLogin = (reqobj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      reqobj
    );
    localStorage.setItem("token", response.data.token); // Store JWT token instead of user object

    dispatch({ type: "LOADING", payload: false });
    message.success("Login successful");
    setTimeout(() => {
      window.location.href = "/";
    }, 50);
  } catch (error) {
    console.log(error);
    message.error("Login failed: " + error.response.data.message);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqobj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post(
      "http://localhost:5000/api/users/register",
      reqobj
    );
    dispatch({ type: "LOADING", payload: false });
    message.success("Registration successful");
    setTimeout(() => {
      window.location.href = "/login";
    }, 50);
  } catch (error) {
    console.log(error);
    message.error("Registration failed: " + error.response.data.message);
    dispatch({ type: "LOADING", payload: false });
  }
};