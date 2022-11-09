import express from "express"
import * as userplanController from "../controllers/userplanController.js"

const router = express.Router()

router.route('/monthlyplan').post(userplanController.monthlyplan)
router.route('/yearlyplan').post(userplanController.yearlyplan)

export default router