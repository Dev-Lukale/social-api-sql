import express from "express";
import {
  getPosts,
  addPost,
  deletePost,
  updatePost
} from "../controllers/posts-controller.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.delete("/:postId", deletePost);
router.put("/:postId", updatePost);

export default router;
