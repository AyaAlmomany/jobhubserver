const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    uid:{type:String,required:true},
    id:{type:String,required:false},   //////
    location:{type:String,required:false}, //
    phone:{type:String,required:false}, //
    updated:{type:Boolean, default:false}, 
    isAdmin:{type:Boolean, default:false}, 
    isAgent:{type:Boolean, default:false}, 
    skills:{type:Array, default:false,required:false},
    profile:{type:String,required:true,default:'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',}

},{timestamps:true});
module.exports=mongoose.model("User",UserSchema);