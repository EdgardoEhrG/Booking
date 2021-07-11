import axios from "axios";

export const createHotel = async (token, data) => {
  return await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateHotel = async (token, data, hotelId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/update-hotel/${hotelId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllHotels = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/hotels`);
};

export const getHotel = async (hotelId) => {
  return await axios.get(`${process.env.REACT_APP_API}/hotels/${hotelId}`);
};

export const getSellerHotels = async (token) => {
  return await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteHotel = async (token, hotelId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/delete-hotel/${hotelId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getDataDifference = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const startDate = new Date(from);
  const endDate = new Date(to);
  const difference = Math.round(Math.abs((startDate - endDate) / day));
  return difference;
};
