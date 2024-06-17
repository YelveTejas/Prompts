const { model, models } = require("mongoose")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:[true,'Email Already Exist!'],
        required:[true,'Email is required']
    },
    username:{
        type:String,
        required:[true,'Username is required'],
        match:[/[a-zA-Z0-9]/,'Username must be alphanumeric'],
    },
    image:{
        type:String,
    }
})

const Client  = models.Client || model('Client',userSchema)
export default Client