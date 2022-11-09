import express from "express"
import * as planController from "../controllers/planController.js"

const router = express.Router()

router.route('/create').post(planController.createPlan)

export default router