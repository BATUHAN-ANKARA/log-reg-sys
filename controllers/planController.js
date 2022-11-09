import Plan from "../models/planModel.js"

const createPlan = async (req, res) => {
    try {
        const plan = await Plan.create(req.body)
        res.status(201).json({
            succeded: true,
            message: "plan created"
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}

export { createPlan }
