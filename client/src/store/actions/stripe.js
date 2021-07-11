import axios from "axios";

export const createConnectAccount = async (token) => {
  await axios.post(
    `${process.env.REACT_APP_API}/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAccountStatus = async (token) => {
  axios.post(
    `${process.env.REACT_APP_API}/account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAccountBalance = async (token) => {
  return axios.post(
    `${process.env.REACT_APP_API}/account-balance`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const currencyFormatter = (data) => {
  return data.amount.toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

export const payoutSettings = async (token) => {
  axios.post(
    `${process.env.REACT_APP_API}/payout-settings`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSessionId = async (token, hotelId) => {
  axios.post(
    `${process.env.REACT_APP_API}/stripe-session-id`,
    { hotelId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
