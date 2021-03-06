import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { createConnectAccount } from "../store/actions/stripe";
import { getSellerHotels, deleteHotel } from "../store/actions/hotel";

import DashboardNav from "../components/DashboardNav/DashboardNav";
import ConnectNav from "../components/ConnectNav/ConnectNav";
import SmallCard from "../components/SmallCard/SmallCard";
import { HomeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Seller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [hotels, setHotels] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    loadSellerHotels();
  }, []);

  const loadSellerHotels = async () => {
    let { data } = await getSellerHotels(auth.token);
    setHotels(data);
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res);
      window.location.href = res.data;
    } catch (error) {
      console.log(error);
      toast.error("Stripe connect falied, try again.");
      setLoading(false);
    }
  };

  const handleHotelDelete = async (hotelId) => {
    if (!window.confirm("Are u sure?")) return;
    deleteHotel(auth.token, hotelId).then((res) => {
      toast.success("Hotel deleted");
      loadSellerHotels();
    });
  };

  const connected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Hotels</h2>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/hotels/new">
              + Add New
            </Link>
          </div>
        </div>
        <div className="row">
          {hotels.map((hotel) => (
            <SmallCard
              key={hotel._id}
              hotel={hotel}
              showViewMoreButton={false}
              owner={true}
              handleHotelDelete={handleHotelDelete}
            />
          ))}
        </div>
      </div>
    );
  };

  const notConnected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="p-5 payout">
              <HomeOutlined className="h1" />
              <h4>Setup payouts to post hotel rooms</h4>
              <p className="lead">MERN partners with stripe</p>
              <button
                className="btn btn-primary mb-3"
                onClick={handleClick}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Setup Payouts"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}
    </>
  );
};

export default Seller;
