import express from "express"
import * as userController from "../controllers/userController.js"
// import * as newsController from "../controllers/newsController.js"
import * as authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()

router.route('/register').post(userController.createUser)
router.route('/login').post(userController.loginUser)
router.route('/dashboard').get(authMiddleware.authenticateToken, userController.getDashboardPage)
router.route('/news').get(authMiddleware.authenticateToken, userController.getNewsPage)
router.route('/purchase/payment').get(userController.getPaymentPage)

export default router
