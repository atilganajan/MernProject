 import express from "express"
 import * as resCommentControllers from "../controllers/resCommentController.js"


 const router=express.Router();


  router.post("/:id",resCommentControllers.createResComments);
// // router.get("/:id",resCommentControllers.getResComments);



 export default router;