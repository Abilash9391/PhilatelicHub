import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        user:{ type: String,required: true},
        content:{ type: String,required: true},
        image:{type: String,default: "null"},
        likes:{type: Number,default: 0}
    }
);
const postModel = mongoose.models.post || mongoose.model("post", postSchema);
export default postModel;
