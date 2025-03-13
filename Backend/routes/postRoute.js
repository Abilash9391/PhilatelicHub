import { getPosts,addPost,deletePost,likePost } from "../controller/postController.js";
import express from "express";


const router=express.Router();

router.get("/getpost",getPosts);
router.put("/likepost/:id",likePost);
router.post("/addpost",addPost);
router.delete("/deletepost",deletePost);

export default router;