import UserPlan from "../models/userplanModel.js"
import News from "../models/newsModel.js"

const addNew = async (req, res) => {
    try {
        const userplan = await UserPlan.findOne({ user: res.locals.user._id })
        var current_time = Date.now()
        if(current_time > userplan.planend){
            res.render('news', {
                link: 'news',
                substatus: 'pasif',
                userplan
              })
        }else{
            const news = await News.create({
                name: req.body.name,
                description: req.body.description,
                user: res.locals.user._id
            })
            res.redirect("/users/news")
        }
        
        }
    catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}

export { addNew }  