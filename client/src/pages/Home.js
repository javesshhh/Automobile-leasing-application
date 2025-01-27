import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import { Col, DatePicker, Row, Card, Button } from "antd";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const { Meta } = Card;

function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  function setFilter(values) {
    // Implement filtering logic here if needed
  }

  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-flex">
          <RangePicker onChange={setFilter} />
        </Col>
      </Row>

      {loading && <Spinner />}

      <Row justify="center">
        {totalCars.map((car) => (
          <Col
            lg={5}
            sm={24}
            xs={24}
            style={{
              padding: 5,
              margin: 5,
            }}
            key={car._id} // Ensure each item has a unique key
          >
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={car.image} className="card-img" />}
            >
              <Meta
                title={car.name}
                description={`Rent per hour: ${car.rentPerHour}`}
              />
              <div
                style={{
                  padding: 5,
                  marginTop: 10,
                }}
              >
                <Button type="primary">
                  <Link to={`/booking/${car._id}`}>Book now</Link>
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
}

export default Home;
