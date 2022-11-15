import mongoose from "mongoose"

const { Schema } = mongoose

const userplanSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        planname:{
            type: String,
            required: true
        },
        planstart:{
            type: Date,
            required: false
        },
        planend:{
            type: Date,
            required: false
        },
        planstatus:{
            type: String,
        },
        payment:{
            type: String,
        },
    },
    {
        timestamps: true
    }
)

const UserPlan = mongoose.model("UserPlan", userplanSchema)

export default UserPlan