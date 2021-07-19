import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { getUserHotelBookings } from "../store/actions/hotel";

import DashboardNav from "../components/DashboardNav/DashboardNav";
import ConnectNav from "../components/ConnectNav/ConnectNav";
import BookingCard from "../components/BookingCard/BookingCard";

const Dashboard = () => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
    const res = await getUserHotelBookings(token);
    setBookings(res.data);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Booking</h2>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/hotels">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            hotel={booking.hotel}
            session={booking.session}
            orderedBy={booking.orderedBy}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
