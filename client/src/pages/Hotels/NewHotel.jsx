import React, { useState } from "react";

import { useSelector } from "react-redux";
import { createHotel } from "../../store/actions/hotel";

import { toast } from "react-toastify";

import HotelForm from "../../components/HotelForm/HotelForm";

const NewHotel = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [values, setValues] = useState({
    title: "",
    content: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const { title, content, price, from, to, bed } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    image && hotelData.append("image", image);
    hotelData.append("price", price);
    hotelData.append("location", location);
    hotelData.append("bed", bed);
    hotelData.append("from", from);
    hotelData.append("to", to);

    try {
      let res = await createHotel(token, hotelData);

      if (res.status === 200) {
        toast("New hotel is added");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({
      ...values,
    });
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              location={location}
              setLocation={setLocation}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2 mt-4"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
