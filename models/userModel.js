import mongoose from "mongoose"
import bcyrpt from "bcrypt"
import validator from "validator"

const { Schema } = mongoose

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: [true, "Username Area Is Required"],
            unique: true,
            validate: [validator.isAlphanumeric, "Only Alphanumeric Characters"]
        },
        email:{
            type: String,
            required: [true, "Email Area Is Required"],
            unique: true,
            validate: [validator.isEmail, "Valid Email Is Required"]
        },
        password:{
            type: String,
            required: [true, "Password Area Is Required"],
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