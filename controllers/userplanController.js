import { Model } from "mongoose"
import User from "../models/userModel.js"
import UserPlan from "../models/userplanModel.js"

// const trialplan = async (req, res) => {
//     try {
//         await UserPlan.create({
//             name: "Deneme Sürümü",
//             planstart: Date.now(),
//             planend: new Date(Date.now() + 12096e5),
//             user: res.locals.user._id
//         })
//         res.status(201).redirect('/users/dashboard')
        
//     } catch (error) {
//         res.status(500).json({
//             succeded: false,
//             error
//         })
//     }
// }

const monthlyplan = async (req, res) => {
    try {
            const filter = {user: req.body}
            const update = {
            planname: "Aylık Abonelik", 
            planstart:Date.now(),
            planend: new Date(Date.now() + 2592000000)
        }
        
        
    } catch (error) {
        
    }
}

const yearlyplan = async (req, res) => {
    try {
        req.body.planstart = Date.now() 
        req.body.planend = new Date(Date.now() + 31536000000)
        const user_plan = await UserPlan.create(req.body)
        res.redirect("/")
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}

export {  monthlyplan, yearlyplan }
