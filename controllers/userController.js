import User from "../models/userModel.js"
import UserPlan from "../models/userplanModel.js"
import Orders from "../models/ordersModel.js"
import News from "../models/newsModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//Create a user with trial elite plan
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        const trial = await UserPlan.create({
            planname: "Elite Plan",
            planstart: Date.now(),
            planend: new Date(Date.now() + 12096e5),
            planstatus: "İlk Abonelik",
            user: user._id
        })

        const order_trial = await Orders.create({
            planname: "Elite Plan",
            planstart: Date.now(),
            planend: new Date(Date.now() + 12096e5),
            planstatus: "İlk Abonelik",
            user: user._id
        })
        res.status(201).json({user: user._id})
    } catch (error) {
    
            console.log('ERROR', error);

            let errors2 = {};

            if (error.code === 11000) {
            errors2.email = 'The Email or Username is already registered';
            }

            if (error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                errors2[key] = error.errors[key].message;
            });
            }

            res.status(400).json(errors2);
        
            }
}

//get the payment page
const getPaymentPage = (req, res) => {
    res.render("payment")
}

//user login
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
        console.log('ERROR', error);

        let errors2 = {};
    
        if (error.code === 11000) {
          errors2.email = 'The Email or Username is already registered';
        }
    
        if (error.name === 'ValidationError') {
          Object.keys(error.errors).forEach((key) => {
            errors2[key] = error.errors[key].message;
          });
        }
        res.status(400).json(errors2);
    }
}

//create token for user
const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d',})
}

//get the user dashboard page
const getDashboardPage = async (req, res) => {
    const userplan = await UserPlan.findOne({ user: res.locals.user._id })
    var current_time = Date.now()
    if(current_time > userplan.planend){
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

//get the news page for posting news
const getNewsPage = async (req, res) => {
    const userplan = await UserPlan.findOne({ user: res.locals.user._id })
    const news = await News.findOne({ user: res.locals.user._id })
    var current_time = Date.now()
    if(current_time > userplan.planend){//yeni bir if bloğunda veya and operatörü ile news tablosunu kontrol ederek renderla => !!!!!!!!!!!!!!!!!!!!!!!!Yapıldı OK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        res.render('news', {
            link: 'news',
            substatus: 'aktif',
            userplan,
            news
          })
    }
    else{
        res.render('news', {
            link: 'news',
            substatus: 'aktif',
            userplan,
            news
          })
    }
  }

//exports all the functions for using
export { createUser, loginUser, getDashboardPage, getNewsPage, getPaymentPage, }