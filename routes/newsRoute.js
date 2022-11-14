import express from "express"
import * as newsController from "../controllers/newsController.js"
const router = express.Router()

router.route('/add').post(newsController.addNew)

export default router