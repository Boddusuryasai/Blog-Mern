const mongoose=require("mongoose")
const postSchema= new mongoose.Schema({
  title:String,
  summary:String,
  content:String,
  cover:String,
  author:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
}, {
  timestamps: true,
});


module.exports=mongoose.model("Post",postSchema)