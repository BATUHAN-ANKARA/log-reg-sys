import express from "express"
import * as paymentController from "../controllers/paymentController.js"
const router = express.Router()

router.route('/plan').post(paymentController.purchaseplan)

export default router