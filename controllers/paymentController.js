import UserPlan from "../models/userplanModel.js"
import Orders from "../models/ordersModel.js"

const purchaseplan = async (req, res) => {
    const plan = req.body.plan
    console.log(plan)
    if(plan == "deluxe30"){
        const userplan = await UserPlan.findOneAndRemove({ user: res.locals.user._id })
            await UserPlan.create({
                planname : "Deluxe Plan",
                planstart : Date.now(),
                planend : new Date(Date.now() + 2592000000),
                planstatus : "Aktif",
                payment: "Başarılı",
                user : res.locals.user._id
            })

            await Orders.create({
                planname : "Deluxe Plan",
                planstart : Date.now(),
                planend : new Date(Date.now() + 2592000000),
                planstatus : "Aktif",
                user : res.locals.user._id
            })
            res.redirect("/users/dashboard")
    }

    else if(plan == "deluxe365"){
        const userplan = await UserPlan.findOneAndRemove({ user: res.locals.user._id })
            await UserPlan.create({
                planname : "Deluxe Plan",
                planstart : Date.now(),
                planend : new Date(Date.now() + 31536000000),
                planstatus : "Aktif",
                user : res.locals.user._id
            })

            await Orders.create({
                planname : "Deluxe Plan",
                planstart : Date.now(),
                planend : new Date(Date.now() + 31536000000),
                planstatus : "Aktif",
                user : res.locals.user._id
            })
            
            res.redirect("/users/dashboard")
    }

    else if(plan == "platinum30"){
        const userplan = await UserPlan.findOneAndRemove({ user: res.locals.user._id })
            await UserPlan.create({
                planname : "Platinum Plan",
                planstart : Date.now(),
                planend : new Date(Date.now() + 2592000000),
                planstatus : "Aktif",
                user : res.locals.user._id
            })

            await Orders.create({
                planname : "Platinum Plan",
                planstart : Date.now(),
                planend : new Date(Date.now() + 2592000000),
                planstatus : "Aktif",
                user : res.locals.user._id
            })
            
            res.redirect("/users/dashboard")
    }

    else if(plan == "platinum365"){
        const userplan = await UserPlan.findOneAndRemove({ user: res.locals.user._id })
            await UserPlan.create({
                planname : "Platinum Plan",
                planstart : Date.now(),
                planend : new Date(Date.now() + 31536000000),
                planstatus : "Aktif",
                user : res.locals.user._id
            })

            await Orders.create({
                planname : "Platinum Plan",
                planstart : Date.now(),
                planend : new Date(Date.now() + 31536000000),
                planstatus : "Aktif",
                user : res.locals.user._id
            })
    }

    else{
        res.redirect("/users/dashboard")
    }
}

export { purchaseplan }