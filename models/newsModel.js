import mongoose from "mongoose"

const { Schema } = mongoose

const newsSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        name:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        img_url:{
            type: String,
            required: false
        },
    },
    {
        timestamps: true
    }
)

const News = mongoose.model("News", newsSchema)

export default News