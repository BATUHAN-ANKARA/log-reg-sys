import User from "../models/userModel.js"
import UserPlan from "../models/userplanModel.js"
import Orders from "../models/ordersModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        // res.status(201).json({ user: user._id });
        const trial = await UserPlan.create({
            planname: "Deneme Sürümü",
            planstart: Date.now(),
            planend: new Date(Date.now() + 12096e5),
            planstatus: "İlk Abonelik",
            user: user._id
        })

        const order_trial = await Orders.create({
            planname: "Deneme Sürümü",
            planstart: Date.now(),
            planend: new Date(Date.now() + 12096e5),
            planstatus: "İlk Abonelik",
            user: user._id
        })


        res.redirect("/login")
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}

const updateUserPlanMonthly = async (req, res) => {
    try {
        const userplan = await UserPlan.findOneAndRemove({ user: res.locals.user._id })
        await UserPlan.create({
            planname : "Aylık Abonelik",
            planstart : Date.now(),
            planend : new Date(Date.now() + 2592000000),
            planstatus : "Aktif",
            user : res.locals.user._id
        })

        await Orders.create({
            planname : "Aylık Abonelik",
            planstart : Date.now(),
            planend : new Date(Date.now() + 2592000000),
            planstatus : "Aktif",
            user : res.locals.user._id
        })
        
        res.redirect("/users/dashboard")

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}

const loginUser = async (req, res) => {
    try {
        
        const {username, password} = req.body

        const user = await User.findOne({username})

        let same = false

        if(user){
            same = await bcrypt.compare(password, user.password)
        }else{
            return res.status(401).json({
                succeded: false,
                error,
            })
        }

        if(same){
            
            const token = createToken(user._id)
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 1000*60*60*24
            })

            res.redirect("/users/dashboard")
        }else{
            res.status(401).json({
                succeded: false,
                error,
            })
        }

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}

const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d',})
}

const getDashboardPage = async (req, res) => {
    const userplan = await UserPlan.findOne({ user: res.locals.user._id })
    var current_time = Date.now()
    if(current_time >= userplan.planend){
        res.render('dashboard', {
            link: 'dashboard',
            substatus: 'pasif',
            userplan
          })
    }
    else{
        res.render('dashboard', {
            link: 'dashboard',
            substatus: 'aktif',
            userplan
          })
    }
  }

export { createUser, loginUser, getDashboardPage, updateUserPlanMonthly }
