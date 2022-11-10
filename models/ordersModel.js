import mongoose from "mongoose"

const { Schema } = mongoose

const ordersSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        planname:{
            type: Schema.Types.String,
            ref: 'UserPlan',
        },
        planstart:{
            type: Schema.Types.Date,
            ref: 'UserPlan',
        },
        planend:{
            type: Schema.Types.Date,
            ref: 'UserPlan',
        },
        planstatus:{
            type: Schema.Types.String,
            ref: 'UserPlan',
        },
    },
    {
        timestamps: true
    }
)

const Orders = mongoose.model("Orders", ordersSchema)

export default Orders