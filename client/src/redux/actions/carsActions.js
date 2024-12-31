import { message } from "antd";
import axios from "axios";

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:5000/api/cars/getallcars",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_ALL_CARS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Failed to fetch cars");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/cars/addcar", reqObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: "LOADING", payload: false });
    message.success("New car added successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 200);
  } catch (error) {
    console.log(error);
    message.error("Failed to add car");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/cars/editcar", reqObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: "LOADING", payload: false });
    message.success("Car details updated successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 200);
  } catch (error) {
    console.log(error);
    message.error("Failed to update car");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/cars/deletecar", reqObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: "LOADING", payload: false });
    message.success("Car deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 200);
  } catch (error) {
    console.log(error);
    message.error("Failed to delete car");
    dispatch({ type: "LOADING", payload: false });
  }
};
