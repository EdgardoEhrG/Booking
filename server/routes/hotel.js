import express from "express";
import formidable from "express-formidable";

import { requireSignin, hotelOwner } from "../middleware";

import {
  getAllHotels,
  getHotel,
  createHotel,
  updateHotel,
  getHotelImage,
  getSellerHotels,
  removeHotel,
} from "../controllers/hotel";

const router = express.Router();

router.get("/hotels", getAllHotels);
router.get("/hotel/:hotelId", getHotel);
router.get("/hotel/image/:hotelId", getHotelImage);
router.get("/seller-hotels", requireSignin, getSellerHotels);
router.post("/create-hotel", requireSignin, formidable(), createHotel);
router.put(
  "/update-hotel/:hotelId",
  requireSignin,
  hotelOwner,
  formidable(),
  updateHotel
);
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, removeHotel);

module.exports = router;
