import UserPlan from "../models/userplanModel.js"

const trialplan = async (req, res) => {
    try {
        req.body.planstart = Date.now() 
        req.body.planend = new Date(Date.now() + 12096e5)
        const user_plan = await UserPlan.create(req.body)
        res.redirect("/")
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}

const monthlyplan = async (req, res) => {
    try {
        req.body.planstart = Date.now() 
        req.body.planend = new Date(Date.now() + 2592000000)
        const user_plan = await UserPlan.create(req.body)
        res.redirect("/")
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
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

export { trialplan, monthlyplan, yearlyplan }
