import {
  Col,
  Divider,
  Row,
  DatePicker,
  Space,
  Checkbox,
  Button,
  Modal,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import jwt_decode from "jwt-decode";

const stripePromise = loadStripe(
  "pk_test_51MbqChKLf3MTi9NRWBNbfShYMWMWaUQXvPoqzJdpSTIlr3ixy1vQHKuPTPGMvjRC1wZNIh28dInkmTaYipsljjOt00ZmHCYAcd"
);

function BookingCar() {
  const { carid } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id === carid));
    }
  }, [cars, carid, dispatch]);

  useEffect(() => {
    let amount = totalHours * car.rentPerHour;
    if (driver) {
      amount += 30 * totalHours;
    }
    setTotalAmount(amount);
  }, [driver, totalHours, car.rentPerHour]);

  function selectedTimeSlots(values) {
    setFrom(moment(values[0]).format("YYYY-MM-DD"));
    setTo(moment(values[1]).format("YYYY-MM-DD"));
    setTotalHours(values[1].diff(values[0], "days"));
  }

  function bookNow() {
    const token = localStorage.getItem("token");
    const user = jwt_decode(token);

    const reqObj = {
      user: user._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(bookCar(reqObj))
      .then(() => message.success("Booking successful"))
      .catch(() => message.error("Booking failed"));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img
            src={car.image}
            style={{
              height: 450,
              width: 750,
            }}
            alt="Car"
          />
        </Col>
        <Col lg={10} sm={24} xs={24}>
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div className="text-right">
            <p>{car.name}</p>
            <p>Fuel Type: {car.fuelType}</p>
            <p>Max Persons: {car.capacity}</p>
          </div>
          <Divider type="horizontal" dashed>
            Time slots
          </Divider>
          <Space direction="vertical" size={12}>
            <RangePicker format="YYYY-MM-DD" onChange={selectedTimeSlots} />
          </Space>
          <br />
          <Button className="mt-3" onClick={() => setShowModal(true)}>
            Show booked slots
          </Button>
          <br />
          <Checkbox
            className="mt-3 mb-3"
            onChange={(e) => setDriver(e.target.checked)}
          >
            Driver required
          </Checkbox>
          <br />
          {from && to && (
            <div>
              <p>
                Total hours: <b>{totalHours}</b>
              </p>
              <p>
                Rent per hour: <b>{car.rentPerHour}</b>
              </p>
              <p>Total amount: {totalAmount}</p>
            </div>
          )}

          {car.name && (
            <Modal
              title="Booked time slots"
              open={showModal}
              closable={false}
              footer={false}
            >
              {car.bookedTimeSlots.map((slot) => (
                <Button
                  type="primary"
                  size="large"
                  className="mt-3"
                  key={slot.from}
                >
                  {slot.from} - {slot.to}
                </Button>
              ))}
              <div className="text-right">
                <Button
                  type="primary"
                  className="mt-3"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
              </div>
            </Modal>
          )}

          <Button type="dashed" size="large" className="mt-3" onClick={bookNow}>
            Book now
          </Button>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;
