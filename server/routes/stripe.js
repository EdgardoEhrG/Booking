import express from "express";

import { requireSignin } from "../middleware";

import {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
  getPayoutSettings,
  getSessionId,
  stripeSuccess,
} from "../controllers/stripe";

const router = express.Router();

router.post("/create-connect-account", requireSignin, createConnectAccount);
router.post("/account-status", requireSignin, getAccountStatus);
router.post("/account-balance", requireSignin, getAccountBalance);
router.post("/payout-settings", requireSignin, getPayoutSettings);
router.post("/stripe-session-id/:hotelId", requireSignin, getSessionId);
router.post("/stripe-success", requireSignin, stripeSuccess);

module.exports = router;
