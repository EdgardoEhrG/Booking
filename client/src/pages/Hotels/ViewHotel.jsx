import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import {
  getHotel,
  getDataDifference,
  isAlreadyBooked,
} from "../../store/actions/hotel";
import { getSessionId } from "../../store/actions/stripe";

import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";

const ViewHotel = ({ match, history }) => {
  const { hotelId } = match.params;
  const { auth } = useSelector((state) => ({ ...state }));

  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    loadSellerHotel();
  }, []);

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, hotelId).then((res) => {
        if (res.data.ok) setIsBooked(true);
      });
    }
  }, []);

  const loadSellerHotel = async () => {
    let res = await getHotel(hotelId);
    setHotel(...res.data);
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!auth || !auth.token) {
      history.push("/login");
      return;
    }

    setLoading(true);
    if (!auth) history.pushState("/login");
    let res = await getSessionId(auth.token, hotelId);
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => setLoading(false));
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>{hotel.title}</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img src={image} alt={hotel.title} className="img img-fluid m-2" />
          </div>
          <div className="col-md-6">
            <br />
            <b>{hotel.content}</b>
            <p className="alert alert-info mt-3">{hotel.price}</p>
            <p className="card-text">
              <span className="float-end text-primary">
                For {getDataDifference(hotel.from, hotel.to)}{" "}
                {getDataDifference(hotel.from, hotel.to) <= 1
                  ? " day"
                  : " days"}
              </span>
            </p>
            <p>
              From <br />{" "}
              {moment(new Date(hotel.from)).format("MMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(hotel.to)).format("MMM Do YYYY, h:mm:ss a")}
            </p>
            <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
            <br />
            <button
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary mt-3"
              disabled={isLoading || isBooked}
            >
              {isLoading
                ? "Loading..."
                : isBooked
                ? "Already booked"
                : auth && auth.token
                ? "Book now"
                : "Login to book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;
