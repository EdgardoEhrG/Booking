import fs from "fs";

import Hotel from "../models/hotel";

export const createHotel = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let hotel = new Hotel(fields);
    hotel.postedBy = req.user._id;

    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }

    hotel.save((err, result) => {
      if (err) {
        console.log("Saving hotel error", err);
        res.status(400).send("Error saving");
      }
      res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateHotel = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;

      data.image = image;
    }

    let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
      new: true,
    }).select("-image-data");

    res.json(updated);
  } catch (error) {
    console.log("Updating hotel error", error);
    res.status(400).send("Hotel update failed. Try again");
  }
};

export const getAllHotels = async (req, res) => {
  let hotels = await Hotel.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  res.json(hotels);
};

export const getHotel = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId)
    .populate("postedBy", "_id name")
    .select("-image.data")
    .exec();
  res.json(hotel);
};

export const getHotelImage = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();

  if (hotel && hotel.image && hotel.image.data !== null) {
    res.set("Content-Type", hotel.image.contentType);
    return res.send(hotel.image.data);
  }
};

export const getSellerHotels = async (req, res) => {
  let sellerHotels = await Hotel.find({ postedBy: req.user._id })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();

  res.send(sellerHotels);
};

export const removeHotel = async (req, res) => {
  let removedRes = await Hotel.findByIdAndDelete(req.params.hotelId)
    .select("-image.data")
    .exec();
  res.json(removedRes);
};
