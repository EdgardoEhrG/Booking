import React from "react";
import { useHistory, Link } from "react-router-dom";

import { currencyFormatter } from "../../store/actions/stripe";
import { getDataDifference } from "../../store/actions/hotel";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
  hotel,
  handleHotelDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();
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
            <div className="d-flex justify-content-between h4">
              {showViewMoreButton && (
                <button
                  onClick={() => history.push(`/hotel/${hotel._id}`)}
                  className="btn btn-primary"
                >
                  Show more
                </button>
              )}
              {owner && (
                <>
                  <Link to={`/hotel/edit/${hotel._id}`}>
                    <EditOutlined className="text-warning" />
                  </Link>
                  <DeleteOutlined
                    className="text-danger"
                    onClick={handleHotelDelete(hotel._id)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
