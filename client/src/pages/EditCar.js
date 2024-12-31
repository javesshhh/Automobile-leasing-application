import { Button, Col, Form, Input, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { editCar, getAllCars } from "../redux/actions/carsActions";
import jwt_decode from "jwt-decode";

function EditCar() {
  const { carid } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      const selectedCar = cars.find((c) => c._id === carid);
      setCar(selectedCar);
    }
  }, [cars, carid, dispatch]);

  const onFinish = (values) => {
    const token = localStorage.getItem("token");

    if (!token) {
      message.error("Authentication required");
      return;
    }

    const user = jwt_decode(token);
    if (user.role !== "admin") {
      message.error("You are not authorized to edit cars.");
      return;
    }

    const updatedCar = { ...car, ...values, _id: car._id };

    dispatch(editCar(updatedCar))
      .then(() => message.success("Car updated successfully"))
      .catch(() => message.error("Failed to update car"));
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24}>
          {car && (
            <Form
              initialValues={car}
              className="p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h1>Edit car</h1>
              <Form.Item
                label="Car name"
                name="name"
                rules={[
                  { required: true, message: "Please input the car name!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Image URL"
                name="image"
                rules={[
                  { required: true, message: "Please input the image URL!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Rent Per Hour"
                name="rentPerHour"
                rules={[
                  {
                    required: true,
                    message: "Please input the rent per hour!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Capacity"
                name="capacity"
                rules={[
                  { required: true, message: "Please input the capacity!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Fuel Type"
                name="fuelType"
                rules={[
                  { required: true, message: "Please input the fuel type!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <div className="text-right">
                  <Button type="primary" htmlType="submit">
                    Edit car
                  </Button>
                </div>
              </Form.Item>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditCar;
