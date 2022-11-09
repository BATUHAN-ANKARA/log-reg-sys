import mongoose from "mongoose"

const { Schema } = mongoose

const userplanSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true
        },
        planname:{
            type: String,
            required: true,
            unique: true
        },
        planstart:{
            type: Date,
            required: false
        },
        planend:{
            type: Date,
            required: false
        },
    },
    {
        timestamps: true
    }
)

const UserPlan = mongoose.model("UserPlan", userplanSchema)

export default UserPlan