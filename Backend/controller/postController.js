import postModel from "../models/post.js";

export const getPosts=async (req,res)=>{
    try{
        const posts=await postModel.find().sort({createdAt:-1});
        res.json(posts);
    }
    catch(err){
        res.status(500).json({message:err});
    }
}

export const addPost= async (req,res)=>{
    try{
        const {user,content,image,likes}=req.body;
        const newPost=new postModel({
            user,content,image,likes
        });
        await newPost.save();
        res.json({success:true,message:"Posted successfully"});
    }
    catch(err){
        res.status(500).json({message:err});
    }
}

export const deletePost=async (req,res)=>{
    try{
        await postModel.findByIdAndDelete(req.params.id);
        res.json({message:"Post deleted successfully"});
    }
    catch(err){
        res.status(500).json({message:err});
    }
}

export const likePost=async (req,res)=>{
    try{
        const {id}=req.params;
        const post = await postModel.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
        if(post){
            res.json({success:true,message:"Post liked successfully"});
        }
        else{
            res.status(404).json({message:"Post not found"});
        }
    }
    catch(err){
        res.status(500).json({message:err});
    }
}
