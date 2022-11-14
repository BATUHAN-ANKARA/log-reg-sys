import { Int32 } from "mongodb"
import mongoose from "mongoose"

const { Schema } = mongoose

const planSchema = new Schema(
    {
        planname:{
            type: String,
            required: true,
        },
        howmanydays:{
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const Plan = mongoose.model("Plan", planSchema)

export default Plan
