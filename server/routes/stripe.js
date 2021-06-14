import express from "express";

import { requireSignin } from "../middleware";

import {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
  payoutSettings,
} from "../controllers/stripe";

const router = express.Router();

router.post("/create-connect-account", requireSignin, createConnectAccount);
router.post("/account-status", requireSignin, getAccountStatus);
router.post("/account-balance", requireSignin, getAccountBalance);
router.post("/payout-settings", requireSignin, payoutSettings);

module.exports = router;
