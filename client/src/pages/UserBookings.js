import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Row, Col, Card, message } from "antd";
import moment from "moment";

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Authentication required");
      return;
    }
    dispatch(getAllBookings({ token }))
      .catch(() => {
        message.error("Failed to fetch bookings");
      });
  }, [dispatch]);

  return (
    <DefaultLayout>
      <h1>My bookings</h1>
      <Row justify="center">
        <Col lg={20} sm={24}>
          {bookings.map((booking) => {
            const transaction = `Transaction id : ${booking.transactionId}`;
            return (
              <Card
                type="inner"
                className="w-100 mt-3 mb-3"
                title={transaction}
                key={booking._id}
              >
                <Row className="m-2">
                  <Col lg={7} sm={24}>
                    <p>
                      Total days : <b>{booking.totalHours}</b>
                    </p>
                    <p>
                      Rent per day : <b>{booking.car.rentPerHour}</b>
                    </p>
                    <p>
                      Total Amount : <b>{booking.totalAmount}</b>
                    </p>
                  </Col>
                  <Col lg={10} sm={24}>
                    <p>
                      Name : <b>{booking.car.name}</b>
                    </p>
                    <p>
                      From : <b>{booking.bookedTimeSlots.from}</b>
                    </p>
                    <p>
                      To : <b>{booking.bookedTimeSlots.to}</b>
                    </p>
                    <p>
                      Date of booking :{" "}
                      <b>{moment(booking.createdAt).format("MMM DD yyyy")}</b>
                    </p>
                  </Col>
                  <Col lg={7} sm={24}>
                    <img src={booking.car.image} alt={booking.car.name} height="150" />
                  </Col>
                </Row>
              </Card>
            );
          })}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;