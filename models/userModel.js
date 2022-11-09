import mongoose from "mongoose"
import bcyrpt from "bcrypt"

const { Schema } = mongoose

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", function(next){
    const user = this
    bcyrpt.hash(user.password, 10, (err, hash)=>{
        user.password = hash
        next()
    })
})


const User = mongoose.model("User", userSchema)

export default User