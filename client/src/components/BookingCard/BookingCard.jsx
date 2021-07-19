import React, { useState } from "react";

import { currencyFormatter } from "../../store/actions/stripe";
import { getDataDifference } from "../../store/actions/hotel";

import OrderModal from "../Modals/OrderModal";

const BookingCard = ({ hotel, session, orderedBy }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          {hotel.image && hotel.contentType ? (
            <img
              className="card-image img img-fluid"
              src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
              alt="hotel img"
            />
          ) : (
            <img
              className="card-image img img-fluid"
              src="https://via.placeholder.com/900x500.png?text=Booking"
              alt="default hotel img"
            />
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">
              {hotel.title}{" "}
              <span className="float-end text-primary">
                {currencyFormatter({
                  amount: hotel.price * 100,
                  currency: "usd",
                })}
              </span>{" "}
            </h3>
            <p className="alert alert-info">{hotel.location}</p>
            <p className="card-text">{`${hotel.content.substring(
              1,
              200
            )}...`}</p>
            <p className="card-text">
              <span className="float-end text-primary">
                For {getDataDifference(hotel.from, hotel.to)}{" "}
                {getDataDifference(hotel.from, hotel.to) <= 1
                  ? " day"
                  : " days"}
              </span>
            </p>
            <p className="card-text">
              {hotel.bed} {hotel.bed <= 1 ? " bed" : " beds"}
            </p>
            <p className="card-text">
              Available from {new Date(hotel.from).toLocaleString()}{" "}
            </p>

            {showModal && (
              <OrderModal
                session={session}
                orderedBy={orderedBy}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            )}

            <div className="d-flex justify-content-between h4">
              <button
                onClick={() => setShowModal(!showModal)}
                className="btn btn-primary"
              >
                Show Payment Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
