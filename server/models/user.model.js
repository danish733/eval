import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {type:String, required:true},
    email:{ type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String, enum:["user", "admin"], default:"user", required:true}
})

const UserModel = mongoose.model("User", userSchema)

export default UserModel