const mongoose=require("mongoose");
const JobSchema=new mongoose.Schema({
    title:{type:String,required:true},
    location:{type:String,required:true},
    description:{type:String,required:true},
    agentName:{type:String,required:true},
    salary:{type:String,required:true},
    period:{type:String,required:true},
    contract:{type:String,required:true},
    hiring:{type:Boolean,required:true,default:true},
    requirements:{type:Array,required:true},
    imageUrl:{type:String,required:true},
    agentID:{type:String,required:true},

},{timestamps:true});
// optionl. Enabling timestamps adds two fields, createdAt and updatedAt, which automatically store the creation and update timestamps when we create or modify a document,this is a convenient way to track when data was added or last updated.
// Mongoose schema blueprint that defines the structure and constraints for MongoDB documents(jobs)
module.exports=mongoose.model("Job",JobSchema);
// Mongoose model named "Job" using the mongoose.model() method. The mongoose.model() method takes two arguments 1. the name of the model (jobs)
// 2. the schema  the model  can use it to perform various database operations on user data.