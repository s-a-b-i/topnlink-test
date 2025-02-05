import express from "express";
import {
  createInvoiceAccount,
  getInvoiceAccounts,
  getInvoiceAccount,
  updateInvoiceAccount,
  deleteInvoiceAccount,
} from "../controllers/invoiceAccount.controller.js";

const router = express.Router();

// Invoice account routes
router.post("/create", createInvoiceAccount);
router.post("/get-all", getInvoiceAccounts);
router.get("/get/:id", getInvoiceAccount);
router.put("/update/:id", updateInvoiceAccount);
router.delete("/delete/:id", deleteInvoiceAccount);

export default router;
