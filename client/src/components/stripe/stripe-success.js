import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../../store/actions/stripe";

const StripeSuccess = ({ match, history }) => {
  const { hotelId } = match.params;

  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    stripeSuccessRequest(token, hotelId).then((res) => {
      if (res.data.success) {
        history.push("/dashboard");
      } else {
        history.push("/stripe/cancel");
      }
    });
  }, [hotelId, token, history]);

  return (
    <div className="container">
      <div className="col">
        <h2 className="text-center p-5">Payment success. {hotelId}</h2>
      </div>
    </div>
  );
};

export default StripeSuccess;
