import express from "express"
import * as commentController from "../controllers/commentController.js"

const router=express.Router();




router.post("/:id", commentController.createComment);
router.get("/:id", commentController.getAllComments);





export default router